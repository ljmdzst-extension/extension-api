FROM node:20-alpine3.19

RUN npm install -g nodemon

WORKDIR /extension_api

ENV DIR /extension_api

COPY ./dist $DIR
COPY .env $DIR
COPY package*.json $DIR

RUN npm prune --production

CMD ["npm" , "run" , "dev"]


