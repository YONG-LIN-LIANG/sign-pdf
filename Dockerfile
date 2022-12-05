# stage 1
FROM node:16-bullseye as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
# stage 2
FROM nginx:alpine as production-build
COPY ./nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*

# 將打包完的靜態資源(dist資料夾中)
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
