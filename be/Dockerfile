FROM node:16-alpine AS base

WORKDIR /app

COPY package*.json ./

RUN npm install


FROM base AS builder

COPY . .

RUN npm run build


FROM base AS development

WORKDIR /app

COPY . . 

CMD ["npm", "run", "start:dev"]


FROM node:16-alpine AS production

ARG NODE_ENV=production

ARG APP_VERSION

ENV APP_VERSION=${APP_VERSION}

ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json ./

# ci or install 
RUN npm ci --only=production

COPY --from=builder /app/build ./build 

CMD [ "node", "build/server.js" ]