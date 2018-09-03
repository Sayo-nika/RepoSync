/**
 * @file landing.js
 * @author Ayane Satomi
 */
 
 /*  global router */
 
 router.get("/", async (req, res) => {
     res.render("index");
 })
 
 module.exports = router;