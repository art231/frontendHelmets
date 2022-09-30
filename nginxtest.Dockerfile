# Stage 2 - the production environment
FROM nginx:alpine
ENV API_HOST ${API_HOST}
ENV API_HOST_AUTH ${API_HOST_AUTH}
COPY ./nginxtest /usr/share/nginx/html
RUN rm -rf /etc/nginx/conf.d/default.conf
RUN rm -rf /etc/nginx/nginx.conf
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./nginx.conf ./nginx.conf
EXPOSE 80

RUN cat /etc/nginx/nginx.conf
RUN nginx -V

# replace all vars in nginx.conf with environment vars
CMD ["/bin/sh" , "-c" , "envsubst < ./nginx.conf > /etc/nginx/nginx.conf && exec nginx -g 'daemon off;'"]