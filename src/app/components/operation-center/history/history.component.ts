import { Component, OnInit } from '@angular/core';
import { HistoryService } from './history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  providers: [HistoryService]
})
export class HistoryComponent implements OnInit {

  public historyList: Array<any> = [];
  constructor(private historyService:HistoryService) { }

  ngOnInit() {
    this.historyService.getList('','').subscribe((res: any) => {
      this.historyList = res;
    },error =>{
      console.log('获取历史纪录列表失败');
    })
  }

  

}
