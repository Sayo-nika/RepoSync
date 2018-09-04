/**
 * @file sync.js
 * @author bubmet
 */

/*  global router */
const webdav = require("webdav").createClient(webDavHost, webDavUser, webDavPassword);
const ft = require("file-type");
const https = require("https");
 
router.post("/reposync", async (req, res) => {
    const atts = req.body.attachments;
    if (atts.length <= 0)
        return res.send("No attachments.");
    atts.forEach(async att => {
        // get url -> upload to WebDAV
        const mimeType = getType(att.url);
        https.get(att.url, res => {
            res.once("data", chunk => {
                await webdav.putFileContents(att.filename, chunk, {format: mimeType})
            });
        });
    });
});


function getType(url) {
    https.get(url, res => {
        res.once("data", chunk => {
            res.destroy();
            return ft(chunk).mime;
        });
    });
}
module.exports = router;