FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
#RUN npm run build:odds-getter
EXPOSE 3000
CMD ["npm", "run", "prod:odds-getter"]
