const axios = require("axios")
const SwaggerParser = require("swagger-parser")

class Indexing {
    async bulkIndexOpenAPIs(client, urls) {
        // Create an array of bulk index actions for each OpenAPI document
        const bulkActions = [];

        for (const url of urls) {
            try {
                const response = await axios.get(url);
                const tokens = url.split('/');
                const ext = tokens[tokens.length - 1];
                const rg = /^(openapi|swagger)\.(json|yaml|yml)(\?[\w=&]+)?$/
                let document = null;
                if(rg.test(ext)) {
                    document = await SwaggerParser.parse(response.data);
                }

                bulkActions.push({
                    index: { _index: 'openapi_docs' },
                    body: {
                        url,
                        content: response.data,
                        contentType: response.headers['content-type'],
                        info:  document?.info,
                        description: document?.description,
                        tags: document?.tags
                    }
                });
                console.log("Done: ",url)
            }
            catch (e) {
                console.log("Address not found!");
            }
        }

        const result = await client.helpers.bulk({
            datasource: bulkActions,
            onDocument() {
                return {
                    index: { _index: 'openapi_docs' }
                }
            }
        });
    }
}


module.exports = new Indexing()