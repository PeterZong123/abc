import { Component, OnInit, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'customer-filter-dropdown',
  templateUrl: './customer-filter-dropdown.component.html',
  styleUrls: ['./customer-filter-dropdown.component.scss'],
})
export class CustomerFilterDropdownComponent implements OnInit {

  public searchValue: string;
  @Output()
  public searchEmitter: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    
  }

  search(){
    this.searchEmitter.emit(this.searchValue);
  }
  
}
