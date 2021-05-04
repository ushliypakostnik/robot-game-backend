FROM node:lts-alpine

WORKDIR /opt/app

COPY package*.json ./

# install dependencies
RUN npm install

COPY . .

# for development
# CMD ["npm", "start"]
# for production
CMD ["npm", "run", "prod"]

# Сборка образа
# sudo docker build -t robot-game-backend .

# Запуск образа
# sudo lf
