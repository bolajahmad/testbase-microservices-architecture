FROM node:14
LABEL author="Okonkwo Emmanuel"

ENV NODE_ENV=production
ENV PORT=3001

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm install

COPY . .

EXPOSE $PORT

CMD ["npm","start" ]