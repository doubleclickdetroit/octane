var express = require('express'),
    server  = express();

server.configure(function() {
    server.use(express.static(__dirname + '/'));
});

server.listen(3000);
console.log('listening on port 3000.');