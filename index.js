const nunjucks = require('nunjucks');
const fs = require('fs');
const {
    deduplication
} = require('./util');

nunjucks.configure('template', {
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

module.exports = (config, typeJson) => {
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

    console.log(`freemaker config is : \n${JSON.stringify(config)}`);

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