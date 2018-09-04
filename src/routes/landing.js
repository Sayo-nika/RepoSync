/**
 * @file landing.js
 * @author Capuccino
 */
 
/*  global router */
 
router.get("/", async (req, res) => {
    res.render("index");
});
 
module.exports = router;