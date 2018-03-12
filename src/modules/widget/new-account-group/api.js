import config_server from '@/config/config'
const api = config_server.server_api;

import { httpAgent } from '@/config/utils';


export const createAuthorityGroup = (authorityGroup,successCb,erroCb) => {
    const url = api + '/authority_group.json';
    const param = {
    	name:authorityGroup.name,
    	orgType:authorityGroup.orgType,
    	status:authorityGroup.status,
    }
    httpAgent(url, 'POST', param, successCb,erroCb);

}

export const modifyAuthorityGroup = (authorityGroup,successCb,erroCb) => {
    const url = api + '/authority_group/'+authorityGroup.uuid+'.json';
    const param = {
    	name:authorityGroup.name,
    	orgType:authorityGroup.orgType,
    	status:authorityGroup.status,
    }
    httpAgent(url, 'PUT', param, successCb,erroCb);
}



