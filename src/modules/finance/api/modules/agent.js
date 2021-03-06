import { httpAgent,getCurrentMonthFirst,getCurrentMonthLast } from '@/config/utils'
import qs from 'qs'

export default {
  getAgentList({start,limit,filter}, successCb, erroCb){
    let url = `${config_server.server_api}/salary/broker.json`;
    let params = {
      start,
      limit
    }
    if(filter){
      if(filter.unionId){
        params.orgId = filter.unionId;
      }else{
        if(filter.platId){
          params.orgId = filter.platId
        }
      }

      if(filter.status || filter.status == 0){
        params.status = filter.status;
      }

      if(filter.nickname){
        params.nickname = filter.nickname;
      }

      if(filter.thirdId){
        params.thirdId = filter.thirdId;
      }
      if(filter.date){
        params.startDate = getCurrentMonthFirst(filter.date);
        params.endDate = getCurrentMonthLast(filter.date);
      }
      
    }
    


    httpAgent(url,'GET', params,successCb,erroCb)
  },
  agreeAgentApply({list},successCb, erroCb){
    let url = `${config_server.server_api}/salary/broker/${list[0]}/distribute.json`;
    let params = '';
    // for(var items of list){
    //   params = params + '&uuid='+items;
    // }
    // console.log(params);
    httpAgent(url,'POST', params,successCb,erroCb)
  },
  rejectAgentApply({list},successCb, erroCb){
    let url = `${config_server.server_api}/salary/broker/${list[0]}/reject.json`;
    let params = '';
    // for(var items of list){
    //   params = params + '&uuid='+items;
    // }
    // console.log(params);
    httpAgent(url,'POST', params,successCb,erroCb)
  },


}
