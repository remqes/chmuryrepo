FROM node:alpine
LABEL maintainer="Michal Nurzynski"

WORKDIR /app
COPY ./ ./

RUN npm install

EXPOSE 8080

CMD ["npm", "start"]