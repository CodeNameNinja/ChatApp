FROM node:20.2-alpine3.17

WORKDIR /app

COPY package.json yarn.lock ./

COPY apps/api/socket-server apps/api/socket-server

RUN yarn install --frozen-lockfile

RUN yarn workspace socket-server build

WORKDIR /app/apps/api/socket-server

CMD ["node", "dist/index.js"]