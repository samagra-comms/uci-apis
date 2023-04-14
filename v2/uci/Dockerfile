FROM node:16 AS builder

# Create app directory
WORKDIR /app

# copy dependency files
COPY package.json ./
COPY .npmrc .
COPY yarn.lock ./
COPY prisma ./prisma/

# Install app dependencies
RUN yarn install
# Required if not done in postinstall
RUN npx prisma generate
RUN ls prisma
RUN ls prisma/generated

COPY . .
EXPOSE 3002
CMD [ "npm", "run", "start" ]