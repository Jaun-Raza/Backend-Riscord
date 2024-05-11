FROM node:21

WORKDIR /usr/app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 1024

CMD [ "node", "./index.js"]