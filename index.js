const nunjucks = require('nunjucks');
const fs = require('fs');
const {
    deduplication
} = require('./util');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

nunjucks.configure(__dirname + '/template', {
    autoescape: false, //不使用自动转义
    tags: {
        blockStart: '<%',
        blockEnd: '%>',
        variableStart: '{{',
        variableEnd: '}}',
        commentStart: '<#',
        commentEnd: '#>'
    }
});

const freemaker = (config, typeJson) => {
    let importTypeListSrc = [];
    let methodListSrc = [];

    const {
        xhr
    } = config;
    const xhrList = xhr.list;
    xhrList.forEach(element => {
        const mockObj = typeJson[element.res] ? JSON.stringify(typeJson[element.res]) : "{}";
        importTypeListSrc.push(element.req || '')
        methodListSrc.push(element.method || '')
        element['mockObj'] = mockObj
    });

    const importTypeList = deduplication(importTypeListSrc)
    const methodList = deduplication(methodListSrc)

    Object.assign(config, {
        importTypeList: importTypeList,
        methodList: methodList
    })

    console.log("========= freemaker config =======");
    console.log(JSON.stringify(config));
    console.log("========= /freemaker config =======");

    const templatesList = ['xhr', 'api', 'mock'];

    templatesList.forEach(item => {
        const templateFile = config[item]['file'];
        const templateContent = nunjucks.render(`${item}.tmpl`, config);
        fs.writeFile(templateFile, templateContent, err => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(`${item} 创建完成，请在文件 ${templateFile} 中查看！`);
        })
    })
}

/**
 * config.quicktype
 * @param {*} config 
 */
const quicktype = (config) => {
    const {
        srcDir,
        outDir,
        srcExtend,
        outExtend
    } = config

    console.log("========= quicktype config =======");
    console.log(config);
    console.log("========= /quicktype config =======");

    async function quickInterface() {
        const fileListCmd = `cd ${srcDir} && ls`
        const {
            stdout,
            stderr
        } = await exec(fileListCmd);
        if (stderr) {
            console.error(stderr);
            return;
        }
        if (stdout) {
            const fileList = splitNull(stdout.split('\n'));

            async function quickType(cmd) {
                return await exec(cmd)
            }
            if (fileList.length > 0) {
                console.log(`quicktype create code from ${srcDir} to ${outDir}`);
                fileList.forEach(item => {
                    let sl = item.split('');
                    sl[0] = sl[0].toUpperCase()
                    const itemName = sl.join('').replace(`.${srcExtend}`, '')
                    const quicktypeCmd = `quicktype -s ${srcExtend} ${srcDir}/${item} -o ${outDir}/${itemName}.${outExtend} -l ${outExtend} --just-types`
                    quickType(quicktypeCmd)
                })
                console.log(`quicktype create finish, you can checkout in ${outDir}`);
            } else {
                console.error(`源文件夹中未检测到任何文件`);
            }
        }
    }

    function splitNull(list) {
        if (Array.isArray(list) && list.length > 0) {
            let _list = []
            list.forEach(element => {
                if (element !== '') {
                    _list.push(element)
                }
            });
            return _list
        } else {
            return []
        }
    }

    fs.stat(srcDir, (err, stats) => {
        if (err) {
            const {
                errno
            } = err
            if (errno === -2) {
                console.error(`源类型文件夹 ${srcDir} 目录不存在，请先手动创建`)
            }
            return;
        }
        if (stats.isDirectory()) {
            fs.stat(outDir, (err, stats) => {
                if (err) {
                    const {
                        errno
                    } = err
                    if (errno === -2) {
                        console.error(`类型输出文件夹 ${outDir} 目录不存在，自动帮你创建`)
                        fs.mkdir(outDir, function (err) {
                            if (err) {
                                return console.error(err);
                            }
                            console.log(`目录创建成功`);
                            quickInterface();
                        });
                    }
                    return;
                }
                if (stats.isDirectory()) {
                    quickInterface()
                } else {
                    console.error(`类型输出文件夹配置参数不对`)
                }
            })
        } else {
            console.error(`源类型文件夹配置参数不对`)
        }
    })
}

module.exports = {
    freemaker: freemaker,
    quicktype: quicktype
}