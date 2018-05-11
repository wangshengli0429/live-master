import { httpAgent } from '@/config/utils'
import qs from 'qs'

export default {
  getUnionSalaryList({start,limit,filter}, successCb, erroCb){
    let url = `${config_server.server_api}/salary/union.json`;
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
      if(filter.status != '' || filter.status === 0){
          params.status = filter.status;
        }



      if(filter.date){
        params.startDate = new Date(filter.date[0]).getTime();
        params.endDate = new Date(filter.date[1]).getTime();
      }
      
    }
    


    httpAgent(url,'GET', params,successCb,erroCb)
  },
  agreeUnionApply({list},successCb, erroCb){
    let url = `${config_server.server_api}/salary/union/${list[0]}/confirm.json`;
    let params = '';
    // for(var items of list){
    //   params = params + '&uuid='+items;
    // }
    // console.log(params);
    httpAgent(url,'POST', params,successCb,erroCb)
  },
  rejectActorApply({list},successCb, erroCb){
    let url = `${config_server.server_api}/salary/actor/${list[0]}/reject.json`;
    let params = '';
    // for(var items of list){
    //   params = params + '&uuid='+items;
    // }
    // console.log(params);
    httpAgent(url,'POST', params,successCb,erroCb)
  },


}
