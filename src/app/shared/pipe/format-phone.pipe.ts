/**
 * Created by liangzhifeng on 2017/5/27.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'formatPhonePipe', pure: false})
export  class FormatPhonePipe implements  PipeTransform{

  transform(mobile: string): string {
    let result = '';
    if (mobile && mobile !== '') {
      for (let i = 0; i < mobile.length; i++) {
        if (i < 3 || i > mobile.length - 5) {
          result = result + mobile[i];
        } else {
          result = result + '*';
        }
      }
    }

    return result;
  }
}
