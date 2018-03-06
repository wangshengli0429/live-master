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
  getActorList( successCb, erroCb){
    let url = `${config_server.server_api}/login.json`;
    // let params = {
    //   identify,
    //   password
    // }
    // httpAgent(url,'GET', params,successCb,erroCb)
    
    var temp = {
      list:[]
    }
    for(var i=0;i<50;i++){
      let t_actor = {
        nick_name:"艺人张三",
        id:i+1,
        create_date:new Date().getTime(),
        platform:"斗鱼直播",
        plat_id:"Douyu123",
        group:"工会1",
        agent:"经纪人1",
        name:"张艺兴",
        mobile:"18311344273",
        settlement_method:"系统结算",
        status:"待分配",
        treatment:"45/5000/6"
      }
      temp.list.push(t_actor);
    }
    temp.count=100;

    successCb(temp);
  },
}
