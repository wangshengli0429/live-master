import {timesToDate, changeCronToString,changeNumToChinese} from '@/config/utils'


export const filter = (Vue) => {
  Vue.filter('timesToDate', (times, pattern) => {//时间戳转日期
    if (!pattern) {
      pattern = 'yyyy-MM-dd HH:mm';
    }
    if (times) {
      return timesToDate(times, pattern);
    } else {
      return '';
    }
  })
  Vue.filter('filterOrgType', (str) => {//数据级别
    var result = "";
    switch(str){
      case 'SYSTEM': result = '系统'; break;
      case 'PLAT': result = '平台'; break;
      case 'UNION': result = '公会'; break;
    }
    return result;
  })

  Vue.filter('reflectStatus', (str) => {//数据级别
    var result = "";
    switch(str){
      case 0: result = '待审核'; break;
      case 1: result = '待打款'; break;
      case 2: result = '提现成功'; break;
      case 3: result = '自动提现'; break;
      case 4: result = '被拒绝'; break;
    }
    return result;
  })









}
