var chokidar = require('chokidar');

var shelljs = require('shelljs');
const watchDir = 'freemarker';
chokidar.watch(watchDir).on('change', function () {

    console.log("=================== auto exec freemarker ================");

    shelljs.exec('node test.js quicktype');

    shelljs.exec("node test.js freemaker");

    console.log("=================== auto exec end =======================");

});

console.log(`${watchDir} is watched ……`);

