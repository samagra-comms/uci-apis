FROM node:16 AS install
WORKDIR /app
COPY package.json ./
RUN yarn install

FROM node:16 as build
WORKDIR /app
COPY prisma ./prisma/
RUN npx prisma generate
RUN ls prisma
RUN ls prisma/generated
COPY --from=install /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:16
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/node_modules ./node_modules
EXPOSE 3002
CMD [ "npm", "run", "start:migrate:prod" ]