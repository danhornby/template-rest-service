var http = require('http');
var app = require('./config/express.js')(); // Notice the additional () here
var routes = require("./routes/routes.js")(app);

server = http.createServer(app).listen(app.get('port'), function() {
    console.log("Server Runing on port: ", app.get('port'));
});

module.exports = server;