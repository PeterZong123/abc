import { Component, OnInit,Inject } from '@angular/core';

@Component({
  selector: 'app-create-cluster',
  templateUrl: './create-cluster.component.html',
  styleUrls: ['./create-cluster.component.scss']
})
export class CreateClusterComponent implements OnInit {

  objs: any = [];
  alertMessage: string;
  alertType: string;
  //查询条件
  startTime:Date;
  endTime:Date;
  manualFlag:string = '';
  incomeNumber:string = '';
  serviceType:string = '';
  totalItems: number = 1;
  currentPage: number = 1;
  //判定alert输入值变化
  alertNumber = 1;
  //蒙层显隐
  showModal = false;

  query: any;
  zh:any;
  constructor(@Inject('help') private helpService) { }

  ngOnInit() {

  }


  //获取列表
  getSellerList() {


  }

}
