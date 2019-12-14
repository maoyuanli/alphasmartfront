FROM node:8.16.2-alpine3.10

RUN mkdir /app
WORKDIR /app
COPY . .
COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production --silent && mv node_modules ../

EXPOSE 3000
