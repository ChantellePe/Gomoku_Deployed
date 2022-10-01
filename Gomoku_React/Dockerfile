FROM node:16-alpine

WORKDIR /Gomoku_React

ADD ./package.json ./
ADD ./package-lock.json ./
ADD ./tsconfig.json ./
RUN npm install

CMD npm start