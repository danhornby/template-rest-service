/* eslint-disable no-console */
/* eslint-env node */

const fs = require('fs');
const args = require('minimist')(process.argv.slice(2));
var statusResp;

function buildStatusResp() {
    var resp = {};
    resp = JSON.parse(fs.readFileSync(__dirname + '/../config/status-metadata.json'));
    resp["lastcommitsha"] = args.s || 'no-sha-supplied';
    resp = { "myapplication": [resp] }
    console.log("Created response for route '/status': %s", JSON.stringify(resp));
    return resp
}

var appRouter = function (app) {
    app.get("/", function (req, res) {
        res.send("Hello World");
    });
    statusResp = buildStatusResp();
    app.get("/status", function (req, res) {
        res.send(statusResp);
    });
}

module.exports = appRouter;
