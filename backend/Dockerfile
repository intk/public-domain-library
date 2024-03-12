# syntax=docker/dockerfile:1
ARG PLONE_VERSION=6.0.10
FROM plone/server-builder:${PLONE_VERSION} as builder

WORKDIR /app

# Add local code
COPY . .

# Install local requirements and pre-compile mo files
RUN <<EOT
    set -e
    bin/pip install mxdev
    mv requirements-docker.txt requirements.txt
    sed -i 's/-e src\/public_domain_library\[test\]/src\/public_domain_library/g' mx.ini
    bin/mxdev -c mx.ini
    bin/pip install -r requirements-mxdev.txt
    bin/python /compile_mo.py
    rm -Rf src/
EOT

FROM plone/server-prod-config:${PLONE_VERSION}

LABEL maintainer="INTK <collective@plone.org>" \
      org.label-schema.name="public-domain-library-backend" \
      org.label-schema.description="public-domain-library backend image." \
      org.label-schema.vendor="INTK"

# Copy /app from builder
COPY --from=builder /app /app

RUN <<EOT
    set -e
    ln -s /data /app/var
EOT
