FROM node:18-alpine as base

# USER node

WORKDIR /home/node/app

COPY package*.json ./

COPY . .

RUN rm -f .env
RUN npm install

FROM base as runtime

CMD ["npm", "run", "start"]