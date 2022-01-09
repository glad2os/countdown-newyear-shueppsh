FROM node:16.13.1

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=${PORT}

EXPOSE ${PORT}
CMD [ "npm", "start" ]