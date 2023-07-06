class Search {
    async searchOpenAPI(client, keyword) {
        try {
            const response = await client.search({
                index: 'openapi_docs',
                body: {
                    query: {
                        bool: {
                            must: [
                                { match: { "body.content": keyword } }
                            ]
                        }
                    }
                }
            });
            if (response.hits.total.value === 0) {
                throw new Error()
            }
            return response.hits.hits
        } catch (error) {
            return [];
        }
    }

}

module.exports = new Search()