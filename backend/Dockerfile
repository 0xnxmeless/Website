FROM node:alpine AS deps
WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production
RUN npm i typescript

COPY . .

RUN npx prisma generate
RUN npm run build
RUN npm remove typescript

FROM node:alpine AS app
WORKDIR /app

COPY --from=deps /app/dist ./dist
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/.env ./.env

EXPOSE 3000

CMD [ "npm", "start" ]