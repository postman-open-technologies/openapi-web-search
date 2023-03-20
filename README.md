<div align='center'>
<img src='https://cdn.worldvectorlogo.com/logos/openapi-1.svg' height='20%' width='20%'/>
<h1>Open API Web Search</h1>
</div>

## Background
The [Postman Open Technologies](https://blog.postman.com/announcing-postman-open-technologies/) team maintains a [project](https://github.com/postman-open-technologies/knowledge-base) dedicated to mining and extracting knowledge from the API universe. There is a wealth of knowledge present in the OpenAPI, Swagger, Postman Collections, Spectral, and other API artifacts available on GitHub, but also on the open web. 

To expand the current [knowledge base](https://github.com/postman-open-technologies/knowledge-base), we want to develop an open-source approach for finding Swagger and OpenAPI definitions on the open web, crawling web pages looking for API definitions, validating them, and then consuming and indexing them as part of an ongoing search. 

There are already known sources like [GitHub](https://github.com/), [SwaggerHub](https://swagger.io/tools/swaggerhub/), and [APIs.guru](https://apis.guru/) to find OpenAPI/Swagger specifications but we want to focus on **extracting API definitions from lesser-known sources and presenting them to the world**. The dataset can later be used to [analyze the specifications to obtain insights](https://www.wittern.net/blog/analyzing-api-specs) into some of the practices common among APIs.

## What’s Open API Web Search?

Open API Web Search project is all about providing a simple way for developers to find existing Swagger and OpenAPI definitions on the open web—mostly from lesser-known sources. The ultimate goal of this project is to build a search engine for APIs where API consumers and producers can discover APIs using keywords that abstract away the complexity of searching the web for specific terms, helping identify APIs in a sea of web pages.

The goal of this project can be achieved with the following milestones:

1. **Crawling**: Crawl webpages looking for **valid** API Definitions—mostly from lesser-known sources.
2. **Indexing**: Validate & store indexed crawl results.
3. **Implementing a search algorithm**: Using this large dataset of OpenAPI/Swagger specifications, expose an API that abstracts away the complexity of searching the web for specific terms for finding APIs
4. **Providing an interface**: Design a UI for API consumers and producers to initiate a search looking for APIs. Initially, the search can be done using metadata—the info object of the [OpenAPI document](https://spec.openapis.org/oas/latest.html#info-object).
5. **Updating dataset**: Regularly update the crawl results and re-index them for better search results.

## Info about GSoC’23

> **Note**: This project idea is shortlisted for [Google Summer Of Code 2023](https://blog.postman.com/join-postman-at-google-summer-of-code-2023/). Find the initial conversation [here](https://github.com/postman-open-technologies/gsoc-2023/issues/7).

If you're an aspiring GSoC candidate, here's what you should know: 

- Having said that the purpose of this project is the **discovery of APIs from lesser-known sources**, crawling is where you will spend a good chunk of time.
- The proposal should expand on each milestone mentioned in the above section. We understand that completing all the milestones within the 12 weeks of the GSoC period may not be feasible. We can figure it out based on the timeline provided.
- There is no restriction on the choice of language, framework, or tools for building the solution for Open API Web Search.
- We really don’t believe in reinventing the wheel. Feel free to use an existing solution like [Common Crawl](https://commoncrawl.org/).
- For any concerns, kindly reach out to [@vinitshahdeo](https://github.com/vinitshahdeo) or [@MikeRalphson](https://github.com/MikeRalphson).

#### Qualifying task

As mentioned in [`CONTRIBUTOR_GUIDANCE.md`](https://github.com/postman-open-technologies/gsoc-2023/blob/main/CONTRIBUTOR_GUIDANCE.md), please refer to **[#2](https://github.com/postman-open-technologies/openapi-web-search/issues/2)** for the qualifying task.


## Contact

If you have any questions or queries, please [create an issue](openapi-web-search) on this repo (with a prefix GSoC 2023), start a topic on [our community forums in the GSoC category](https://community.postman.com/c/open-technology/gsoc/42) or send an email to us at gsoc@postman.com.

[![Twitter](https://img.shields.io/badge/Twitter-%40getpostman-orange?logo=twitter&logoColor=white)](https://twitter.com/getpostman) [![YouTube](https://img.shields.io/badge/YouTube-%40postman-orange?logo=youtube)](https://www.youtube.com/c/postman)
