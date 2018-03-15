import { httpAgent } from '@/config/utils'
import qs from 'qs'

export default {
  getAccountList( {start,limit,filter} ,successCb, erroCb){
    let url = `${config_server.server_api}/users/admins.json`;
    let params = {
      start,
      limit
    }
    if(filter){
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
    }
    


    httpAgent(url,'GET', params,successCb,erroCb)
  },
  deleteAccount({uuid},successCb, erroCb){
    let url = `${config_server.server_api}/users/admins/${uuid}.json`;
    let params = {
    }
    httpAgent(url,'DELETE', params,successCb,erroCb)
  },


}
