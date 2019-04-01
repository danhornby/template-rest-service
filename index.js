/* eslint-disable no-console */
/* eslint-env node */

var http = require('http');
var app = require('./config/express.js')();
require("./routes/routes.js")(app);
var server = {};

server = http.createServer(app).listen(app.get('port'), function() {
    console.log("Server Runing on port: ", app.get('port'));
});

module.exports = server;