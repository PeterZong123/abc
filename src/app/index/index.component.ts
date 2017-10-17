import { Component, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  templateUrl: 'index.component.html',
})
export class IndexComponent implements AfterViewInit{

  constructor(private elementRef: ElementRef){}

  ngAfterViewInit(){
    let that = this;

    var s1 = document.createElement("script");
    s1.type = "text/javascript";
    s1.src = "./files/pt_0common_macro.js"
    this.elementRef.nativeElement.appendChild(s1);

    var s2 = document.createElement("script");
    s2.type = "text/javascript";
    s2.src = "./files/core.js"
    this.elementRef.nativeElement.appendChild(s2);

    setTimeout(function() {
      var s3 = document.createElement("script");
      s3.type = "text/javascript";
      s3.src = "./files/pt_index.js"
      that.elementRef.nativeElement.appendChild(s3);
    }, 3000);
  }
}
