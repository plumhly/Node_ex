var fs = require('fs');
fs.readdir(process.cwd(), function(err, files) {
  console.log('');
  if (!files.length) {
    return console.log('   \033[31m no files to show!\033[39m\n');
  }
  console.log('  select which file or directory you want wo see \n');

  function file(i) {
    var filename = files[i];
    fs.stat(__dirname + '/' + filename, function (err, stat) {
      if (stat.isDirectory()) {
        console.log('    '+i+'   \033[36m' + filename + '/\033[39m');
      } else {
        console.log('    '+i+'   \033[36m' + filename + '\033[39m');
      }

      i++;
      if (i == files.length) {
        console.log('');
        
      }
    })
  }
})