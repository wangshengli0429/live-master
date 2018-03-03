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
}
