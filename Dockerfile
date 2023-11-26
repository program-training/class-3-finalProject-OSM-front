FROM nginx:lts-slim 

RUN apt-get update \
    && apt-get install -y build-essential

WORKDIR /app


COPY package*.json tsconfig.json ./


RUN npm install

RUN npm install -g typescript

COPY ./src ./src

RUN tsc

ENV PORT=8181

EXPOSE 8181

COPY ./src/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf

CMD [ "node", "./dist/server.js" ]
