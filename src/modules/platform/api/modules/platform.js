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
  getPlatFormList( successCb, erroCb){
    let url = `${config_server.server_api}/login.json`;
    // let params = {
    //   identify,
    //   password
    // }
    // httpAgent(url,'GET', params,successCb,erroCb)
    const temp = {
      list:[{
        name:"测试平台",
        uuid:"1111"
      },
      {
        name:"测试平台2",
        uuid:"222"
      }]
    }
    successCb(temp);
  },
}
