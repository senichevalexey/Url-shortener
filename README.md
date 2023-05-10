# URL shortener

This service is a naive implementation of URL shortener.

## How to use

1. Clone the repository by `git clone `
2. Build application: `docker compose build`
3. Up docker containers (_it will take some time_): `docker compose up`
4. Send POST request to **_localhost:3000/shorten_**

   `curl -X POST localhost:3000/shorten \`

   `-H 'Content-Type: application/json' \`

   `-d '{"url": "https://google.com"}'`

   You will get a response which looks like:
   `{"id":"atJVzR2bi"}`

5. Send GET request to **_localhost:3000/SHORT_URL_ID_**

   `curl localhost:3000/atJVzR2bi`

   You will get back an original URL `https://google.com`

## Run tests

1. Clone the repository by `git clone `
2. Install all dependencies `npm ci`
3. Run tests `npm run test`
