FROM node:12.18.2 as build
LABEL maintainer = "Chakshu Gautam"
LABEL maintainer_email = "chakshu@samagragovernance.in"
USER root
COPY src /opt/uci
WORKDIR /opt/uci
RUN npm install -g yarn --force
RUN yarn -i
RUN yarn cache clean
RUN npm install -g hasura-cli@1.3.3
lifecycle:
  postStart:
    exec:
      command: ["/bin/sh", "-c", "hasura migrate apply --endpoint http://{{hasura_base_url}}"]
CMD ["node", "app.js", "&"]