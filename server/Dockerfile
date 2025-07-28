FROM node:18

WORKDIR /app
COPY . .
RUN npm install

EXPOSE 5000
CMD ["npx", "nodemon", "src/index.js"]
