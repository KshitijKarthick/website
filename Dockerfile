FROM ubuntu:latest

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
    && apt-get install -y curl python2 build-essential nginx \
    && curl -sL https://deb.nodesource.com/setup_10.x | bash - \
    && apt-get install -y nodejs

COPY package.json gulpfile.babel.js .babelrc grommet-toolbox.config.js customEslintrc.json /website/

WORKDIR /website

RUN npm install -g gulp-cli \
    && npm install

COPY src /website/src

RUN gulp dist

EXPOSE 80

STOPSIGNAL SIGTERM

RUN rm -r /usr/share/nginx/html \
    && ln -s /website/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
