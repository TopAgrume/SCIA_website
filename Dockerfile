FROM node:18

WORKDIR /app

RUN npm install prisma --save-dev

CMD ["npx", "prisma", "migrate", "deploy"]
