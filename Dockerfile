FROM node:20-alpine3.19 as minimal

RUN npm install -g nodemon

WORKDIR /extension_api

ENV DIR /extension_api

COPY ./dist $DIR/src
COPY .env $DIR
COPY package*.json $DIR

RUN npm prune --production

CMD ["npm" , "run" , "dev"]

FROM node:20 as dev


WORKDIR /extension_api

COPY ./dist /extension_api/src
COPY .env /extension_api
COPY package*.json /extension_api

RUN npm prune --production

CMD ["npm" , "run" , "dev"]
