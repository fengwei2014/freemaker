export interface Type {
    ChangeDriverReq: ChangeDriverReq;
    ReasonDetailReq: ReasonDetailReq;
    ReasonReq:       ReasonReq;
    ReasonRes:       ReasonRes;
    ReasonDetailRes: ReasonDetailRes;
    ResError:        ResError;
}

export interface ChangeDriverReq {
    sid:            string;
    orderId:        string;
    reasonLabel:    string;
    reassignLabels: string;
    remarkLabel:    string;
}

export interface ReasonDetailReq {
    sid:                    string;
    firstLevelReasonMenuId: number;
}

export interface ReasonDetailRes {
    secondLevelReasonMenus: SecondLevelReasonMenu[];
    otherReasonOpen:        number;
}

export interface SecondLevelReasonMenu {
    menuText: string;
    menuId:   number;
    tags:     Tag[];
}

export interface Tag {
    tagId:   number;
    tagText: string;
}

export interface ReasonReq {
    sid: string;
}

export interface ReasonRes {
    code:    number;
    message: string;
    data:    Data;
}

export interface Data {
    firstLevelReasonMenus: FirstLevelReasonMenu[];
    changeDriverCount:     number;
}

export interface FirstLevelReasonMenu {
    reasonMenuId:   number;
    reasonMenuText: string;
}

export interface ResError {
    code:    number;
    message: string;
}
