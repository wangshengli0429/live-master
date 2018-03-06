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
  getGroupList( successCb, erroCb){
    let url = `${config_server.server_api}/login.json`;
    // let params = {
    //   identify,
    //   password
    // }
    // httpAgent(url,'GET', params,successCb,erroCb)
    const temp = {
      list:[{
        name:"测试工会",
        uuid:"11112"
      },
      {
        name:"测试工会2",
        uuid:"22211"
      }]
    }
    successCb(temp);
  },
}
