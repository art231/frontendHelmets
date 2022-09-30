#Иснтрукция по докеру
#https://docs.docker.com/get-started/part2/

#package.json ,
#    "start": "webpack-dev-server --mode development --open --hot --env.API_HOST=http://api-url",
#    "build": "webpack --mode production"

npm start
docker build . -f nginxtest.Dockerfile -t test/web.tiona.nginx:test
docker run --env API_HOST="http://10.9.0.15" --env API_HOST_AUTH="http://10.9.0.5" -p 8001:80 test/web.tiona.nginx:test
http://localhost:8001

docker build . -t test/web.helmets:test
docker run --env API_HOST="http://10.9.0.2/helmet-saver" --env API_HOST_AUTH="http://10.9.0.5" -p 8000:80 test/web.helmets:test
http://localhost:8000

#Выключить докер
docker container rm --force bb