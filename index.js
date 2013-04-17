var lactate = require('lactate');
var options = {root:'./static/',autoindex:'1',from:'/'};
var server = lactate.createServer(options);
server.listen(8080);