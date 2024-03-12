# syntax=docker/dockerfile:1
FROM varnish:7.4

LABEL maintainer="INTK <collective@plone.org>" \
      org.label-schema.name="public-domain-library-varnish" \
      org.label-schema.description="public-domain-library Varnish image." \
      org.label-schema.vendor="INTK"

COPY etc/varnish.vcl /etc/varnish/default.vcl
