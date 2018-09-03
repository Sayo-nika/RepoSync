/**
 * @file sync.js
 * @author bubmet
 */

/*  global router */
 
router.post("/reposync", async (req, res) => {
    const atts = req.body.attachments;
    if (atts.length <= 0)
        return res.send("No attachments.");
    atts.map(att => att.url).forEach(async url => {
        // get url -> upload to WebDAV
    });
});
 
module.exports = router;