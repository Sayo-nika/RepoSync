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

    atts.forEach(att => {
        // get url -> upload to WebDAV
        const mimeType = getType(att.url);
        https.get(att.url, res => {
            res.once("data", chunk => {
                webdav.putFileContents(`/reposync_from_discord/${att.filename}.${ft(chunk).ext}`, chunk, {format: ft(chunk).mime});
            });
        });
    });
});

module.exports = router;