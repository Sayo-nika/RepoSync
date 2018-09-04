/**
 * @file Main file for Cartographer
 * @author Capuccino
 * @author Ovyerus
 * @license BSD-3-Clause
 */

const express = require("express");
const got = require("got");
const path = require("path");
const engines = require("consolidate");
const fs = require("fs");
const YAML = require("yamljs");

const app = express();
global.router = express.Router();
let config;

try {
    config = YAML.parse(fs.readFileSync("../config.yml").toString());
} catch(e) {
    config = {};
}

global.webDavHost = process.env.REPOSYNC_WEBDAV_HOST || config.webDav.url;
global.webDavUser = process.env.REPOSYNC_WEBDAV_USERNAME || config.webDav.user;
global.webDavPassword = process.env.REPOSYNC_WEBDAV_PASSWORD || config.webDav.password;
global.discordURL = process.env.REPOSYNC_DISCORD_HOOK_URL || config.discord.webHookURL;


app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");
app.engine("html", engines.mustache);

//needed if a discerning idiot does try to browse to index

app.get("/", require("./routes/landing"));

app.get("/reposync", res => {
    res.redirect("/");
});

app.post("/reposync", require("./routes/sync"));


app.listen(PORT, () => {
    console.log(`Cartographer listening on ${PORT}`);
});
