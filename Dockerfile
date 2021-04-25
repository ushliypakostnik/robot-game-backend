FROM node:lts-alpine

WORKDIR /projects/github/robot-game-backend

COPY package*.json ./

# install dependencies
RUN npm install
RUN npm postinstall

COPY . .

EXPOSE 8082

# for development
# CMD ["npm", "start"]
# for production
CMD ["npm", "run", "prod"]

# Сборка образа
# sudo docker build -t robot-game-backend .

# Запуск образа
# sudo docker run -p 8082:8082 robot-game-backend
