import { httpAgent } from '@/config/utils'
import qs from 'qs'

export default {
  /**
   * 登录接口
   * @param identify
   * @param password
   * @param successCb
   * @param erroCb
   */
  getGroupList({orgId,parentId,status,searchKey,start,limit}, successCb, erroCb){
    let url = `${config_server.server_api}/org.json`;
    let params = {
      orgId,
      orgType:"UNION",
      start,
      limit,
    }
    if(status){
      params.status = status;
    }
    if(searchKey){
      params.searchKey = searchKey;
    }
    if(parentId){
      params.parentId = parentId;
    }
    httpAgent(url,'GET', params,successCb,erroCb)
  },
}
