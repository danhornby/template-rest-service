var express = require('express');
var app = express();

//Port given by env param or default to 8020
port = process.env.PORT || 8020;

var routes = require("./routes/routes.js")(app);

var server = app.listen(port, function() {
    console.log("RESTful API server started on port: %s", server.address().port);
});