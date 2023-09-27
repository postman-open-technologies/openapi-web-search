<div align='center'>
<img src='https://cdn.worldvectorlogo.com/logos/openapi-1.svg' height='20%' width='20%'/>
<h1>Open API Web Search</h1>
</div>

## Background
The [Postman Open Technologies](https://blog.postman.com/announcing-postman-open-technologies/) team maintains a [project](https://github.com/postman-open-technologies/knowledge-base) dedicated to mining and extracting knowledge from the API universe. There is a wealth of knowledge present in the OpenAPI, Swagger, Postman Collections, Spectral, and other API artifacts available on GitHub, but also on the open web. 

To expand the current [knowledge base](https://github.com/postman-open-technologies/knowledge-base), we want to develop an open-source approach for finding Swagger and OpenAPI definitions on the open web, crawling web pages looking for API definitions, validating them, and then consuming and indexing them as part of an ongoing search. 

There are already known sources like [GitHub](https://github.com/), [SwaggerHub](https://swagger.io/tools/swaggerhub/), and [APIs.guru](https://apis.guru/) to find OpenAPI/Swagger specifications but we want to focus on **extracting API definitions from lesser-known sources and presenting them to the world**. The dataset can later be used to [analyze the specifications to obtain insights](https://www.wittern.net/blog/analyzing-api-specs) into some of the practices common among APIs.

## What’s Open API Web Search?

Open API Web Search project is all about providing a simple way for developers to find existing Swagger and OpenAPI definitions on the open web—mostly from lesser-known sources. The ultimate goal of this project is to build a search engine for APIs where API consumers and producers can discover APIs using keywords that abstract away the complexity of searching the web for specific terms, helping identify APIs in a sea of web pages. Learn how Open API Web Search can help [unleash the power of open APIs](https://vinitshahdeo.dev/open-api-web-search).

The goal of this project can be achieved with the following milestones:

1. **Crawling**: Crawl webpages looking for **valid** API Definitions—mostly from lesser-known sources.
2. **Indexing**: Validate & store indexed crawl results.
3. **Implementing a search algorithm**: Using this large dataset of OpenAPI/Swagger specifications, expose an API that abstracts away the complexity of searching the web for specific terms for finding APIs
4. **Providing an interface**: Design a UI for API consumers and producers to initiate a search looking for APIs. Initially, the search can be done using metadata—the info object of the [OpenAPI document](https://spec.openapis.org/oas/latest.html#info-object).
5. **Updating dataset**: Regularly update the crawl results and re-index them for better search results.


# Running the Server

> Fork and/or clone the OpenAPI Web Search repo and change directory into it:

```js

git clone https://github.com/<username>/openapi-web-search.git
cd openapi-web-search/src/server

```

> Install dependencies via yarn: 

```js

yarn install

```

> Start local server:

```js

yarn run dev

```

> After launching the local server, we can use Postman to begin sending http requests to the specified endpoints. I've included a postman collection below to get you started:



> Run the following endpoints in the specified order after configuring Postman with the collection above:

```js

1. http://localhost:1337/api/v1/run/crawler?latest=true
2. http://localhost:1337/api/v1/process/index-files?skip=0&limit=20&sort=aes
3. http://localhost:1337/api/v1/indexing
4. http://localhost:1337/api/v1/search?q=<query>

```

> Explanation:

1. The first endpoint will crawl the common-crawl website to get some files which include the paths to index files that are converted into the appropriate endpoints. 
2. The second endpoint initiates the background process of downloading index files, processing them, and storing the results, which are validated openapi definitions, in mongodb. 
3. Third endpoint begins indexing the previously gathered MongoDB results into Elasticsearch..
4. The last endpoint is utilised to create a search query for optimum retrival.










