FROM nginx:alpine

ARG BUILD_VERSION=dev

# Remove default nginx static content
RUN rm -rf /usr/share/nginx/html/*

# Copy static site files
COPY index.html /usr/share/nginx/html/
COPY css/       /usr/share/nginx/html/css/
COPY js/        /usr/share/nginx/html/js/
COPY data/      /usr/share/nginx/html/data/
COPY assets/    /usr/share/nginx/html/assets/

# Stamp the build version into asset URLs for cache busting
RUN sed -i "s/__BUILD__/${BUILD_VERSION}/g" /usr/share/nginx/html/index.html

# Copy nginx config (overridden at runtime by the volume mount in docker-compose)
COPY server/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]
