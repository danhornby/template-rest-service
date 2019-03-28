var fs = require('fs');

function setStatusResponse() {
    var statusResponse = {}
    const args = require('minimist')(process.argv.slice(2));
    statusResponse = JSON.parse(fs.readFileSync(__dirname + '/status-metadata.json'));
    statusResponse["lastcommitsha"] = args.s;
    return statusResponse
}

var appRouter = function(app) {
    app.get("/", function(req, res) {
        res.send("Hello World");
    });
    resp = setStatusResponse();
    console.log("Created response for route '/status': %s", JSON.stringify(resp));
    app.get("/status", function(req, res) {
        res.send(resp);
    });
}

module.exports = appRouter;
