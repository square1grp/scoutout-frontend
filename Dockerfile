FROM node:lts-alpine as build-stage
ARG VUE_APP_API_ENDPOINT
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8080
CMD ["npm", "run", "serve"]