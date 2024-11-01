FROM node:18

WORKDIR /app

RUN npm install prisma --save-dev

COPY prisma .

CMD ["npx", "prisma", "migrate", "deploy"]
