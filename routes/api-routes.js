const request = require("request");
const https = require("https");
const fs = require("fs");

module.exports = app => {
    app.post("/api/geturls", (req, res) => {
        if (/(youtu*.be)/g.test(req.body.url)) {
            grabYouTubeURLs(req.body.url, res);
        }
    });

    let videoList = [];

    app.post("/api/sendurl", (req, res) => {
        const streamID = videoList.length;
        videoList.push({
            id: streamID,
            url: req.body.url
        });
        res.json(streamID);
    });

    app.get("/api/stream/:id", (req, res) => {
        const url = videoList.find(video => video.id == req.params.id).url;
        request.get(url).pipe(res);
    });

    app.get("/api/webdsp", (req, res) => {
        console.log();
    });
};

function grabYouTubeURLs(videoUrl, res) {
    request({
        method: "GET",
        url: videoUrl
    }, (err, response, html) => {
        if (err) return console.log(err);
        let title = /<title>(.*?)<\/title>/.exec(html)[0];
        title = title.replace(/<*\/*title>/g, '');
        illegalChar = title.replace(/[0-9a-zA-Z_\-\s]/g, '');
        const reg = new RegExp(`[${illegalChar}]`);
        title = title.replace(reg, '');
        const standardURLs = parseYTScriptObject("url_encoded_fmt_stream_map", html);
        const adaptiveURLs = parseYTScriptObject("adaptive_fmts", html);

        const data = {
            title,
            standardURLs,
            adaptiveURLs
        }

        res.json(data);
    });

    function parseYTScriptObject(find, html) {
        const reg = new RegExp(`"${find}":\s*"([^"]+)"`);
        const res = reg.exec(html);
        const urlsString = res[1];
        let urls = urlsString.split(',');
        urls = urls.map(url => {
            const arr = url.split("\\u0026");
            const tmpObj = {};
            arr.map(e => {
                const tmpAr = e.split("=");
                tmpObj[tmpAr[0]] = decodeURIComponent(tmpAr[1]);
            });

            const arr2 = tmpObj.type.split(";+");
            tmpObj.type = arr2[0];
            const codecs = arr2[1].split("=");
            tmpObj[codecs[0]] = codecs[1].replace(/"/g, '').split(",+");

            return tmpObj;
        });
        return urls;
    }
}