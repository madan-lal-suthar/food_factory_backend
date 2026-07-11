FROM node:24-alpine

WORKDIR /food_factory_backend

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/server.js"]