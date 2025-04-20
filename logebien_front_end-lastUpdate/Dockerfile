#Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

#Cache node_modules layer
COPY package.json package-lock.json ./
RUN npm ci

#Copy all files
COPY . .

#Build with production configuration
RUN npm run build -- --configuration=production

#Stage 2: Runtime
FROM nginx:alpine

#Remove default config
RUN rm -rf /etc/nginx/conf.d/default.conf

#Copy built assets (note the output path matches angular.json)
COPY --from=builder /app/dist/loge-bien /usr/share/nginx/html

#Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d

#Copy additional assets (if needed)
COPY --from=builder /app/src/assets /usr/share/nginx/html/assets

#Expose ports
EXPOSE 80 443

#Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]