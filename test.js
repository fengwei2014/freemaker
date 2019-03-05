const { freemaker, quicktype} = require('./index');
const typeJson = require('./freemarker/quicktypesrc/type.json');
const config = require('./freemarker/config');

const args = process.argv.splice(2)
const type = args[0];

if(type === 'freemaker'){
    freemaker(config, typeJson);
} else if(type === 'quicktype'){
    quicktype(config.quicktype)
} else {
    console.error('命令参数有误');
}
