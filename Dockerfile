FROM node:18

WORKDIR /app
COPY . .

RUN npm install -g pnpm
RUN pnpm install

EXPOSE 3000

ENTRYPOINT ["pnpm", "run", "dev"]
