import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent implements OnInit {

  clusterList: Array<any>=[];
  monitorList: Array<any>=[];
  historyList: Array<any>=[];
  subList: Array<any>=[];
  
  constructor() { 
    this.clusterList = [
      {
        name: 'app1',
        cpu: '20%',
        memory: '15%',
        store: '333 KB/s',
        net: '10.58 Mbps'
      },
      {
        name: 'app2',
        cpu: '20%',
        memory: '15%',
        store: '333 KB/s',
        net: '10.58 Mbps'
      },
      {
        name: 'app3',
        cpu: '20%',
        memory: '15%',
        store: '333 KB/s',
        net: '10.58 Mbps'
      }
    ]

    this.monitorList = [
      {
        name:'alert 1',
        cluster:'app 1',
        condition: 'CPU >= 80%',
        way: '邮件',
        time: '2017.11.11	'
      },
      {
        name:'alert 2',
        cluster:'app 1',
        condition: 'CPU >= 80%',
        way: '邮件',
        time: '2017.11.11	'
      },
      {
        name:'alert 3',
        cluster:'app 1',
        condition: 'CPU >= 80%',
        way: '邮件',
        time: '2017.11.11	'
      }
      
    ]

    this.historyList = [
      {
        sendTime:'2018.x.x hh:MM:ss	',
        alarmName: 'alarm  1',
        condition: 'CPU > 80%',
        cluster: 'app 10',
        clusterContainer: 'app 10-xxxx1	',
        way: '邮件'
      },
      {
        sendTime:'2018.x.x hh:MM:ss	',
        alarmName: 'alarm  2',
        condition: 'CPU > 80%',
        cluster: 'app 10',
        clusterContainer: 'app 10-xxxx1	',
        way: '邮件'
      },
      {
        sendTime:'2018.x.x hh:MM:ss	',
        alarmName: 'alarm  3',
        condition: 'CPU > 80%',
        cluster: 'app 10',
        clusterContainer: 'app 10-xxxx1	',
        way: '邮件'
      }
    ]
  }

  ngOnInit() {
  }

}
