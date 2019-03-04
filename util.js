// 首字母大写
const firstStrToUpperCase = (req) => {
    if (req && req.length > 0) {
        req = req.replace(req[0], req[0].toUpperCase())
    }
    return req;
}

//给数组去重并且排除空值
const deduplication = (srcList) => {
    let singleObj = {};
    let resultList = [];

    for (let index = 0; index < srcList.length; index++) {
        const element = srcList[index];
        if (element) {
            singleObj[element] = element
        }
    }

    for (const key in singleObj) {
        if (singleObj.hasOwnProperty(key)) {
            resultList.push(key);
        }
    }
    return resultList;
}


module.exports = {
    firstStrToUpperCase: firstStrToUpperCase,
    deduplication: deduplication
}