# Dummy openapi web search

in order to start scraping then just uncomment the 
`startCronJob(client)` code snippet at 
`openapi-web-search/Dummy App/server/index.js` path.

### client setup:

Run local server:-

```
yarn run dev
```

```
Create a new file in the root directory of 
your project and name it .env. Open the .env file 
and add the server endpoint with either the name 
VITE_SERVER_URL_LOCAL for a local server or 
VITE_SERVER_URL_CLOUD for a cloud server. 
```

### server setup

Run local server:-
```
yarn run dev
```

Envrioment variable configuration - 
```
ELASTIC_CLOUD=<Cloud ID>
ELASTIC_USERNAME=username
ELASTIC_PASSWORD=password
```
