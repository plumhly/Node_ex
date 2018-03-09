
var connect = require('./node_modules/connect/index');
var time = require('./request-time');
var http = require('http');

var server = connect();

server.use(server.logger('dev'));

server.use(time({time: 500}));

// 快速响应
server.use(function(req, res, next) {
  if ('/a' == req.url) {
    res.writeHead(200);
    res.end('Fast!');
  } else {
    next();
  }
});

// 慢速响应

server.use(function (req, res, next) {
  if ('/b' == req.url) {
    setTimeout(() => {
      res.writeHead(200);
      res.end('Slow!');
    }, 1000);
  } else {
    next();
  }
})

http.createServer(server).listen(3000);