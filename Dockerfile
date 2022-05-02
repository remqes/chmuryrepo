FROM node:alpine
LABEL maintainer="Michal Nurzynski"
LABEL org.opencontainers.image.source="https://github.com/remqes/cloudstech-test-app"

WORKDIR /app
COPY ./ ./

RUN npm install

EXPOSE 8080

CMD ["npm", "start"]
