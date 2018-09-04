/**
 * @file sync.js
 * @author bubmet
 * @author Capuccino
 */

/*  global router */
const webdav = require("webdav").createClient(webDavHost, webDavUser, webDavPassword);
const ft = require("file-type");
const https = require("https");
 
router.post("/reposync", async (req, res) => {
    const atts = req.body.attachments;
    // basic sanity check
    if (atts.length <= 0) return res.send("No attachments.");

    atts.map(att => att.url).forEach(async url => {
        // get url -> upload to WebDAV
        const mimeType = getType(url);
        https.get(url, res => {
            res.once("data", chunk => {
                webdav.putFileContents("", chunk, {format: ft(chunk).mime});
            });
        });
    });
});

module.exports = router;