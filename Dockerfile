# Stage 1 - build application
#FROM node:12.18.2 as build
FROM node:latest as build

WORKDIR /app
COPY . ./

#RUN rm -rf package-lock.json
RUN npm i
RUN npm run build

# Stage 2 - the production environment
FROM nginx:alpine
ENV API_HOST ${API_HOST}
COPY --from=build /app/dist /usr/share/nginx/html
RUN rm -rf /etc/nginx/conf.d/default.conf
RUN rm -rf /etc/nginx/nginx.conf
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./nginx.conf ./nginx.conf
EXPOSE 80

RUN cat /etc/nginx/nginx.conf
RUN nginx -V

# replace all vars in nginx.conf with environment vars
CMD ["/bin/sh" , "-c" , "envsubst < ./nginx.conf > /etc/nginx/nginx.conf && exec nginx -g 'daemon off;'"]