FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Cài đặt dependencies
RUN npm ci

COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build TypeScript
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
