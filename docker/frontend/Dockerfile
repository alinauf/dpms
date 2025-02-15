FROM node:18.20.5-alpine

WORKDIR /app

# Install system dependencies
RUN apk add --no-cache git python3 make g++

# Copy package files
COPY ./dpms-frontend/package*.json ./
COPY ./dpms-frontend/yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile --production

# Copy application files
COPY ./dpms-frontend .

# Build with production settings
ENV NODE_ENV=production
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]