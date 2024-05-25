
FROM node:16-slim

WORKDIR /app

COPY package*.json ./
RUN npm install 
RUN npx vite --version

COPY . ./
RUN npx vite build

EXPOSE 5173


CMD ["npm", "run-script", "dev" ,"--", "--host"]
