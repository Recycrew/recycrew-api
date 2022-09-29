FROM node:latest

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3300

CMD ["yarn", "dev"]