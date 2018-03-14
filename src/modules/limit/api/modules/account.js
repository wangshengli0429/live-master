import { httpAgent } from '@/config/utils'
import qs from 'qs'

export default {
  getAccountList( {start,limit,filter} ,successCb, erroCb){
    let url = `${config_server.server_api}/users/admins.json`;
    let params = {
      start,
      limit
    }
    if(filter.nickname){
      params.nickname = filter.nickname;
    }
    if(filter.authorityGroupId){
      params.authorityGroupId = filter.authorityGroupId;
    }
    if(filter.authorityGroupOrgType){
      params.authorityGroupOrgType = filter.authorityGroupOrgType;
    }
    if(filter.status){
      params.status = filter.status;
    }
    if(filter.loginName){
      params.loginName = filter.loginName;
    }
    if(filter.mobile){
      params.mobile = filter.mobile;
    }
    if(filter.orgId){
      params.orgId = filter.orgId;
    }


    httpAgent(url,'GET', params,successCb,erroCb)
  },
  getAuthoritiesList(successCb, erroCb){
    let url = `${config_server.server_api}/authorities.json`;
    let params = {
    }
    httpAgent(url,'GET', params,successCb,erroCb)
  },
  getAccountGroupDetail({uuid},successCb, erroCb){
    let url = `${config_server.server_api}/authority_group/${uuid}.json`;
    let params = {
    }
    httpAgent(url,'GET', params,successCb,erroCb)
  },
  deleteAccountGroup({uuid},successCb, erroCb){
    let url = `${config_server.server_api}/authority_group/${uuid}.json`;
    let params = {
    }
    httpAgent(url,'DELETE', params,successCb,erroCb)
  },


}
