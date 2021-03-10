FROM circleci/node:8.11.2-stretch as build
LABEL maintainer = "Chakshu Gautam"
LABEL maintainer_email = "chakshu@samagragovernance.in"
USER root
COPY src /opt/program-service/
WORKDIR /opt/program-service/
RUN npm install
CMD ["node", "app.js", "&"]