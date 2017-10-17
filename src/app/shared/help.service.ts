import {Injectable} from '@angular/core';

@Injectable()
export class HelpService {

  constructor() {
  }

  _dateFormatNoSe(fmt, time) { //author: meizz


    if(typeof time == 'object' && time != null){
      var o = {
        "M+": time.getMonth() + 1, //月份
        "d+": time.getDate(), //日
        "h+": time.getHours(), //小时
        "m+": time.getMinutes(), //分
        "s+": 0, //秒
        "q+": Math.floor((time.getMonth() + 3) / 3), //季度
        "S": time.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    }else{
      return '';
    }

  }

  _queryObjToString(obj) {
    let results = [];
    for (let key in obj) {
      var item = '';
      console.log(key);
      console.log(obj[key]);
      if(obj[key]){
        item = key + '=' + obj[key];
        results.push(item);
      }

    }
    let resultString = '?';
    for (var i = 0; i < results.length; i++) {
      if (i + 1 < results.length) {
        resultString += results[i] + '&'
      } else {
        resultString += results[i];
      }
    }
    return resultString;
  }

}
