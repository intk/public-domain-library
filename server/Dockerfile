FROM node:20-alpine

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install node modules
COPY package*.json /app/
RUN cd /app && \
  if [ "$NODE_ENV" = "production" ]; then npm ci; \
  else npm install; \
  fi

# Install application
COPY . /app
RUN chmod +x ./start.sh

# Mount persistent storage
VOLUME /app/data
VOLUME /app/public

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait

CMD /wait && ./start.sh

