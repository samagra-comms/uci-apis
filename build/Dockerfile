FROM node:12.18.2 as build
LABEL maintainer = "Chakshu Gautam"
LABEL maintainer_email = "chakshu@samagragovernance.in"
USER root
COPY ../src /opt/uci
WORKDIR /opt/uci
RUN npm install -g yarn --force
RUN yarn -i
RUN yarn cache clean
CMD ["node", "app.js", "&"]