FROM node:24-alpine

WORKDIR /food_factory_backend

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 5050

CMD ["node", "dist/server.js"]