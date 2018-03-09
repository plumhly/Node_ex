var qs = require('querystring');
require('http').createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  if (req.url === '/') {
    res.end([
      '<form method="POST" action="/url">',
      '<h1>My form</h1>',
      '<fieldset>',
      '<label>Personal information</label>',
      '<p>What is your name?</p>',
      '<input type="text" name="name"/>',
      '<p><button>Submit</button></p>',
      '</form>'
    ].join(''));
  } else if (req.url === '/url' && 'POST' === req.method) {
    var body = '';

    req.on('data', function (chunk) {
      body += chunk;
    });

    req.on('end', function () {
      res.end('<p> Your name is <b>' + qs.parse(body).name + '</b><p>');
    });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
  
}).listen(3000);