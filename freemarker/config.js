module.exports = {
    author: "freemaker",
    quicktype: {
        srcDir: "freemarker/quicktypesrc",
        outDir: "src",
        srcExtend: "json",
        outExtend: "ts"
    },
    api: {
        file: "src/api/index.ts"
    },
    mock: {
        file: 'mock/index.js',
        path: '/proxy111'
    },
    xhr: {
        file: "src/utils/xhr.ts",
        list: [{
                desc: "获取更多操作",
                name: "getMoreOptions",
                method: "get",
                api: "rightmenu",
                url: "/api/path1",
                req: "ReasonReq",
                res: "ReasonRes"
            },
            {
                desc: "获取原因",
                name: "getchangeReason",
                method: "get",
                api: "changeReason",
                url: "/api/path2",
                req: "ReasonReq",
                res: "ReasonRes"
            },
            {
                desc: "获取原因详情",
                name: "getReasonDetail",
                method: "get",
                api: "reasonDetail",
                url: "/api/path3",
                req: "ReasonDetailReq",
                res: "ReasonDetailRes"
            },
            {
                desc: "提交",
                name: "submitChangeReason",
                method: "get",
                api: "submitReason",
                url: "/api/path4",
                req: "ChangeDriverReq",
                res: "ChangeDriverRes"
            },
            {
                desc: "入参为空",
                name: "testReqNull",
                method: "get",
                api: "testReqNull",
                url: "/api/path4",
                req: "",
                res: "ChangeDriverRes"
            }
        ]
    }
}