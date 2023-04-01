const cron = require("node-cron")
const fs = require("fs")
const CHUNK_SIZE = 1024 * 1024 * 1; // 1 MB chunk size
const URL = "https://index.commoncrawl.org/"
const { getDataFromCommomCrawlServer, getDataFromFiles, downloadFile, removeFile, parsing } = require("./crawling.service");
const { bulkIndexOpenAPIs } = require("./indexing.service");
const urlsForIndexing = [];


function readContent(client,links, idx) {
    if (idx < links.length) {
        downloadFile(links[idx], './data/output.txt')
            .then(async () => {
                const readStream = fs
                .createReadStream('./data/output.txt',
                 { highWaterMark: CHUNK_SIZE });
                readStream.on('data', chunk => {
                    const text = chunk.toString();
                    const parsedUrls = parsing(text)
                    if(parsedUrls !== undefined) {
                        urlsForIndexing.push(parsedUrls)
                    }
                });

                readStream.on('end', () => {
                    removeFile("./data/output.txt").then((res) => {
                        const flattedUrlsFroIndexing = urlsForIndexing.flat()
                        console.log(flattedUrlsFroIndexing)
                        bulkIndexOpenAPIs(client,flattedUrlsFroIndexing).then(res => {
                            readContent(client,links, idx + 1);
                        })
                        .catch(e => {
                            console.error('Error while Indexing: ',e);
                            return;
                        })
                    }).catch(e => {
                        console.error('Error while deleting file:', e)
                        return;
                    })
                });

                readStream.on('error', err => {
                    console.error(err);
                    return;
                });
            })
            .catch((err) => {
                console.error('Error downloading file:', err)
                return;
            });
    }

}


class Cron {
    startCronJob(client) {
        getDataFromCommomCrawlServer(URL).then(async res => {
            const ccFilesPromises = res.map(async r => await getDataFromFiles(r));
            const results = await Promise.all(ccFilesPromises);
            const links = results.flat()
            readContent(client,links, 0)
        })
        cron.schedule('0 0 * * 0', () => {
            getDataFromCommomCrawlServer(URL).then(async res => {
                const ccFilesPromises = res.map(async r => await getDataFromFiles(r));
                const results = await Promise.all(ccFilesPromises);
                const links = results.flat()
                readContent(client,links, 0)
            })

        })
    }
}

module.exports = new Cron()