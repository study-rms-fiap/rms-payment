from node:18-alpine

# USER node

WORKDIR /home/node/app

COPY package*.json ./

COPY . .

RUN npm install

CMD ["npm", "run", "start"]