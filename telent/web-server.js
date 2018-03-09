require('http').createServer((req, res) => {
  res.writeHead(200, {'Content-type':'text/html'});
  res.end('<h1>Hello word</h1>');
}).listen(3000);