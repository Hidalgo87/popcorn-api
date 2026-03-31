# Stage 1
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

#DUMMY DB FOR BUILD
ENV DATABASE_URL="postgresql://user:password@localhost:5432/db"

RUN npx prisma generate

RUN npm run build

CMD ["./entrypoint.sh"]