var http = require('http'), qs = require('querystring');

function send(theName) {
  http.request({
    host: '127.0.0.1',
    port: 3000,
    url: '/',
    method: 'POST',
  }, function (res) {
    console.log('res');
    res.setEncoding('utf-8');
    res.on('end', function () {
      console.log('\n \033[90m request complete! \033[39m\n');
      process.stdout.write('\n your name:');
    });
  }).end(qs.stringify({name: theName}));
}

process.stdout.write('\n your name: ');
process.stdin.resume();
process.stdin.setEncoding('utf-8');
process.stdin.on('data', (name) => {
  send(name.replace('\n',''));
});
