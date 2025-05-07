#!/bin/bash

reload_nginx() {
  docker exec pdl-reverse-proxy /usr/sbin/nginx -s reload
}

zero_downtime_deploy() {
  service_name=pdl-server
  old_container_id=$(docker ps -f name=$service_name -q | tail -n1)

  # bring a new container online, running new code
  # (nginx continues routing to the old container only)
  docker compose up -d --no-deps --scale $service_name=2 --no-recreate $service_name

  # wait for new container to be available
  new_container_id=$(docker ps -f name=$service_name -q | head -n1)
  new_container_ip=$(docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $new_container_id)
  curl --silent --include --retry-connrefused --retry 30 --retry-delay 1 --fail http://$new_container_ip:3000/ || exit 1
  NODE_ENV=production docker compose -p library --compatibility build

  # start routing requests to the new container (as well as the old)
  reload_nginx

  # take the old container offline
  docker stop $old_container_id
  docker rm $old_container_id

  docker compose up -d --no-deps --scale $service_name=1 --no-recreate $service_name
  docker exec $new_container_id sh -c "./scripts/release-task.sh"

  # stop routing requests to the old container
  reload_nginx
}

zero_downtime_deploy
