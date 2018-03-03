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
  login({identify,password}, successCb, erroCb){
    let url = `${config_server.server_api}/login.json`;
    let params = {
      identify,
      password
    }
    // httpAgent(url,'GET', params,successCb,erroCb)
    successCb();
  },
}
