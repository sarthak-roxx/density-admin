FROM node:18.15.0-alpine as build
ARG BUILD_TYPE
WORKDIR /app
#ENV NODE_ENV production
ENV VITE_BUILD_TYPE ${BUILD_TYPE}
RUN echo "vite_host=${BUILD_TYPE}}"
COPY package.json ./
COPY package-lock.json ./

RUN npm ci

COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
#nginx.conf will need to be adapted for non-root user for running container as non-root.
#RUN addgroup -g 1001 density && adduser -D -G density -u 1001 density
#USER 1001
CMD ["nginx", "-g", "daemon off;"]