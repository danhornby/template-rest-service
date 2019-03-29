var fs = require('fs');
const args = require('minimist')(process.argv.slice(2));

function buildStatusResp(){
    var statusResp = {};
    statusResp = JSON.parse(fs.readFileSync(__dirname + '/status-metadata.json'));
    statusResp["lastcommitsha"] = args.s;
    console.log("Created response for route '/status': %s", JSON.stringify(statusResp));    
    return statusResp
};

var appRouter = function(app) {
    app.get("/", function(req, res) {
        res.send("Hello World");
    });
    statusResp = buildStatusResp();
    app.get("/status", function(req, res) {
        res.send(statusResp);
    });
}

module.exports = appRouter;