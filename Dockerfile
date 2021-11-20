FROM node:14
RUN apt-get update
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 80
# CMD [ "node", "index.js" ]
CMD [ "npm", "run" , "start-custom"]