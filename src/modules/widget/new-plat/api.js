import config_server from '@/config/config'
const api = config_server.server_api;

import { httpAgent } from '@/config/utils';


export const createPlat = (plat,successCb,erroCb) => {
    const url = api + '/org.json';
    let param = {
        name:plat.name,
        shareRatio:plat.shareRatio,
        entryMax:plat.entryMax,
        status:plat.status,
        orgType:plat.orgType,
        parentId:plat.parentId
    }
    if(plat.admin){
        var list = [];
        list.push({uuid:plat.admin})
        param.admins = list;
    }

    httpAgent(url, 'POST', param, successCb,erroCb);

}

export const modifyPlat = (plat,successCb,erroCb) => {
    const url = api + '/org/'+plat.uuid+'.json';
    let param = {
        name:plat.name,
        shareRatio:plat.shareRatio,
        entryMax:plat.entryMax,
        status:plat.status,
        orgType:plat.orgType,
        parentId:plat.parentId
    }

    httpAgent(url, 'PUT', param, successCb,erroCb);
}



