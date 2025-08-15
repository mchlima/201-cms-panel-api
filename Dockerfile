FROM node:22

WORKDIR /usr/src/app
COPY ../package*.json .
RUN npm i
COPY ../ .
RUN npm run build

RUN groupadd -r docker && useradd -m -g docker docker
RUN chown -R docker:docker /usr/src/app

EXPOSE 9006

USER docker

CMD [ "npm", "run", "start" ]