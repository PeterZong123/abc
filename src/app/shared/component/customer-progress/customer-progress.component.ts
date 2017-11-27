import { Component, OnInit, EventEmitter,Input } from '@angular/core';
import { setInterval, clearInterval } from 'timers';

@Component({
  selector: 'customer-progress',
  templateUrl: './customer-progress.component.html',
  styleUrls: ['./customer-progress.component.scss'],
})
export class CustomerProgressComponent implements OnInit {

  public progressValue: number;

  @Input()
  public buildStatus:string;
  ngOnInit() {
    if(this.buildStatus == 'BUILDING'){
      this.changeValue(40,90);
    }
  }

  changeValue(start,end){
    this.progressValue = start;
    let timer = setInterval(()=>{
      if(this.progressValue <= end){
        this.progressValue++;
      }else{
        clearInterval(timer);
      }
    },2000)
  }
}
