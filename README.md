# shorturl-be

-------Build docker image and run locally

docker build . -t shorturl_be
docker run -p 3000:3000 -e "shorturl_mongoDbConnString=<Your mongo db connection string>" -e "shorturl_baseurl=http://localhost:3000" -e "shorturl_port=80" -d shorturl_be

-------Push to github registry
export CR_PAT=<Github tocken>

echo $CR_PAT | docker login ghcr.io -u <USERNAME> --password-stdin

docker tag shorturl_be ghcr.io/<USERNAME>/shorturl_be:v1

docker push ghcr.io/<USERNAME>/shorturl_be:v1

// Pull and run from reistry, do not forget to set env variables