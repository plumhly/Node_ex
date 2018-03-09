var count = 0, users = {};
var net = require('net');

// 创建服务器
var server = net.createServer((conn) => {
  conn.write(
    '\n > welcome to \033[92mnode-chat\033[39m!'
  + '\n > ' + count + ' other people are connectd at this time'
  + '\n > please write you name and press enter!'
  );
  conn.on('close', function() {
    count--;
    delete users[nickname];
    broadcast('\033[90m > ' + nickname + 'leave the room\033[39m\n');
  });
  var nickname;
  conn.on('data',(data) => {
    data = data.replace('\r\n', '');
    if (!nickname) {
      if (users[data]) {
        conn.write('\033[93m> nickname already in use, try again:\033[39m');
        return;
      } else {
        nickname = data;
        users[nickname] = conn;
        for(var i in users) {
          broadcast('\033[90m > ' + nickname + 'joined the room\033[39m\n');
        }
      }
    } else {
      for (var i in users) {
        if (i != nickname) {
          broadcast('\033[96m >' + nickname + ':\033[39m ' + data + '\n');
        }
      }
    }
  });

  function broadcast(msg, exceptMyself) {
    for (var i in users) {
      if (!exceptMyself || i != nickname) {
        users[i].write(msg);
      }
    }
  }

  conn.setEncoding('utf8');
  count++;
  console.log('\033[90m     new connection!\033[39m');
});
server.listen(3000, function () {
  console.log('\033[96m    server listen on *:3000\033[39m');
});