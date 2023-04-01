const axios = require("axios")
const cheerio = require("cheerio")
const readline = require("readline")
const fs = require("fs")
const zlib = require("zlib")


class Crawling {
    async downloadFile(url, path) {
        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream',
            onDownloadProgress: function (progressEvent) {
                const total = progressEvent.total;
                const downloaded = progressEvent.loaded;

                const percent = Math.round((downloaded / total) * 100);

                process.stdout.clearLine();
                process.stdout.cursorTo(0);
                process.stdout.write(`Downloading: ${percent}% (${downloaded}/${total} bytes)`);
            }
        });

        const fileStream = fs.createWriteStream(path);
        response.data.pipe(zlib.createGunzip()).pipe(fileStream);

        return new Promise((resolve, reject) => {
            fileStream.on('close', () => {
                resolve();
            });

            fileStream.on('error', (err) => {
                reject(err);
            });
        });
    }

    async getDataFromFiles(url) {
        try {
            const response = await axios.get(url, { responseType: 'stream' });
            const gunzip = zlib.createGunzip();
            const lines = readline.createInterface({ input: response.data.pipe(gunzip) });

            const links = [];

            for await (const line of lines) {
                const regex = /\.gz$/;
                if (!regex.test(line)) {
                    continue;
                }
                links.push(`https://data.commoncrawl.org/${line}`);
            }

            return links;
        } catch (e) {
            // handle errors gracefully
            console.log(e);
        }
    }
    async removeFile(url) {
        try {
            fs.unlink(url, (err) => {
                if (err) throw err;
                console.log('File deleted!');
            });
        }
        catch (e) {
            console.log(e)
        }
    }
    async getDataFromCommomCrawlServer(url) {
        try {
            const links = [];
            const { data } = await axios.get(url);
            const html = data;
            const $ = await cheerio.load(html);
            $('tbody tr').each((index, row) => {
                const linkTd = $(row).find('td:last-child');
                const link = linkTd.find('a').attr('href');
                links.push(link)
            });
            return links;
        }
        catch (e) {
            // handle errors gracefully
            console.log(e)
        }
    }
    parsing(text) {
        const urlRegex = /http[s]?:\/\/(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+/gi;
        const matchUrls = text.match(urlRegex)
        const parsedUrls = [];
        if (matchUrls) {
            const keywordReg = /^(?:https?:\/\/)?[^\/\s]+(?:\/[^\/\s]+)*(?:\/(openapi|swagger))(?:\/[^\/\s]*)*$/gi;
            const subDomainReg = /^(?:https?:\/\/)?api\.[^\/\s]+\.[^\/\s]+(?:\/[^\/\s]*)*$/gi;
            matchUrls.forEach(url => {
                const tokens = url.split('/');
                const ext = tokens[tokens.length - 1];
                const rg = /^(openapi|swagger)\.(json|yaml|yml)(\?[\w=&]+)?$/
                if (keywordReg.test(url) || rg.test(ext)) {
                    parsedUrls.push(url)
                }
            })
        }
        if(parsedUrls.length !== 0)
        return parsedUrls;
    }
}

module.exports = new Crawling()