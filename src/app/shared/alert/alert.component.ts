import { Component, OnInit, Input, HostListener, OnChanges} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnChanges {

  public alerts: any = [];

  @Input() message: string;
  @Input() type: string;
  @Input() number: string;


  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(){
    console.log('change:' + this.message);

    this.alerts.push({
      type: this.type,
      message: this.message,
      timeout: 5000
    });
  }

  @HostListener('change', ['$event'])
  change(){
    console.log('change running' + this.message + '<<<<<<' + this.type);
  }

}
