/**
 * Created by liangzhifeng on 2017/5/25.
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'selectContactPipe', pure: false})
export  class SelectContactPipe implements  PipeTransform{
  transform(allContacts: Array<any>, prefix: string){
    return allContacts.filter(contact => contact.name.match('^' + prefix));
  }
}
