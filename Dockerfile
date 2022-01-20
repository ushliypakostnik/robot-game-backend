FROM node:16-alpine

WORKDIR /opt/app

COPY package*.json ./

# install dependencies
RUN npm install

COPY . .

# for development
# CMD ["npm", "start"]

# for production
RUN npm run build
CMD ["npm", "run", "prod"]

# Сборка образа
# sudo docker build -t robot-game-backend .

# Запуск образа
# sudo docker run -p 8082:8082 robot-game-backend
