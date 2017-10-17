import { Component, OnInit, Input} from '@angular/core';

const template = `
  <div class="mask"  *ngIf="showModal">
    <div class="loader" style="z-index: 21">
      <div class="text-animation">
        <span >加载中,请稍后</span>
      </div>
    </div>  
  </div>
`;

@Component({
  selector: 'app-mask',
  template: template
})
export class MaskComponent implements OnInit {

  @Input() showModal: boolean;


  constructor() { }

  ngOnInit() {

  }


}
