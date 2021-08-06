FROM node:12.18.2 as build
LABEL maintainer = "Chakshu Gautam"
LABEL maintainer_email = "chakshu@samagragovernance.in"
USER root
COPY src/package.json src/yarn.lock /opt/uci/
RUN npm install -g yarn --force
RUN yarn -i
COPY src /opt/uci
WORKDIR /opt/uci
RUN yarn cache clean
CMD ["node", "app.js", "&"]