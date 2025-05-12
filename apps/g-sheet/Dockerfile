FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:g-sheet
EXPOSE 3000
CMD ["npm", "run", "prod:g-sheet"]
