import config_server from '@/config/config'
const api = config_server.server_api;

import { httpAgent } from '@/config/utils';


export const createProxy = (proxy,successCb,erroCb) => {
    const url = api + '/org.json';
    let param = {
        name:proxy.name,
        shareRatio:proxy.shareRatio,
        taxRatio:proxy.taxRatio,
        status:proxy.status,
        orgType:proxy.orgType,
        parentId:proxy.parentId,
        autoPay:proxy.autoPay,
    }
    if(proxy.autoPayDate){
        param.autoPayDate = new Date(proxy.autoPayDate).getTime();
    }

    if(proxy.admin){
        var list = [];
        list.push({uuid:proxy.admin})
        param.admins = list;
    }
    if(proxy.managerId){
      param.managerId = proxy.managerId;
    }
    if(proxy.salaryType){
      param.salaryType = proxy.salaryType;
    }

    httpAgent(url, 'POST', param, successCb,erroCb);

}

export const modifyProxy = (proxy,successCb,erroCb) => {
    const url = api + '/org/'+proxy.uuid+'.json';
    let param = {
        name:proxy.name,
        shareRatio:proxy.shareRatio,
        taxRatio:proxy.taxRatio,
        status:proxy.status,
        orgType:proxy.orgType,
        parentId:proxy.parentId,
        preSetAutoPay:proxy.autoPay
    }
    if(proxy.autoPayDate){
        param.autoPayDate = new Date(proxy.autoPayDate).getTime();
    }
  if(proxy.admin){
    param.majorAdmin = proxy.admin;
  }

  if(proxy.managerId){
    param.managerId = proxy.managerId;
  }
  if(proxy.salaryType){
    param.salaryType = proxy.salaryType;
  }

    httpAgent(url, 'PUT', param, successCb,erroCb);
}




