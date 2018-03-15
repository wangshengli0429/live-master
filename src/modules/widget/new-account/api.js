import config_server from '@/config/config'
const api = config_server.server_api;

import { httpAgent } from '@/config/utils';


export const createAccount = (account,successCb,erroCb) => {
    const url = api + '/users/admins.json';
    let param = {
    	loginName:account.loginName,
    	status:account.status,
    }
    if(account.authorityGroupId){
    	param.authorityGroupId = account.authorityGroupId
    }
    if(account.nickname){
    	param.nickname = account.nickname
    }
    if(account.mobile){
    	param.mobile = account.mobile
    }
    if(account.password){
    	param.password = account.password
    }

    if(account.unionId){
        param.orgId = account.unionId
    }else{
        if(account.platId){
            param.orgId = account.platId;
        }else{
            param.orgId = 'XsXBL85vaJK4zie1yLaxRy';
        }
    }

    httpAgent(url, 'POST', param, successCb,erroCb);

}

export const modifyAccount = (account,successCb,erroCb) => {
    const url = api + '/users/admins/'+account.uuid+'.json';
    let param = {
        loginName:account.loginName,
        status:account.status,
    }
    if(account.authorityGroupId){
        param.authorityGroupId = account.authorityGroupId
    }
    if(account.nickname){
        param.nickname = account.nickname
    }
    if(account.mobile){
        param.mobile = account.mobile
    }
    if(account.password){
        param.password = account.password
    }

    if(account.unionId){
        param.orgId = account.unionId
    }else{
        if(account.platId){
            param.orgId = account.platId;
        }
    }

    httpAgent(url, 'PUT', param, successCb,erroCb);
}



