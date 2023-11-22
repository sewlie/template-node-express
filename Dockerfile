FROM node as builder

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

FROM node:slim

ENV NODE_ENV production
USER node

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --production --frozen-lockfile

COPY --from=builder /usr/src/app/dist ./dist

ENV PORT 3000
EXPOSE $PORT

CMD [ "node", "app.js" ]
