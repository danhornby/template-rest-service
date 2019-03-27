var fs = require('fs');
var response = {};

fs.readFile(__dirname + '/../metadata.json', function (err, data)
{
    if (err) {
        throw err;
    }
    response = JSON.parse(data);
    //Grab the args to find the value for the build sha
    const args = require('minimist')(process.argv.slice(2));
    response["lastcommitsha"] = args.v;
    console.log("Created response for route '/status': %s", JSON.stringify(response));
})



var appRouter = function(app) {
    app.get("/", function(req, res) {
        res.send("Hello World");
    });
    app.get("/status", function(req, res) {
        res.send(response);
    });
}

module.exports = appRouter;
