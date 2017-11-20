import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-monitor-detail',
  templateUrl: './monitor-detail.component.html',
  styleUrls: ['./monitor-detail.component.scss']
})
export class MonitorDetailComponent implements OnInit {
  
  public appName: string;
  public cpuOption: any;
  public echartsIntance: any;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe( params => {
      this.appName = params['name'];
    })
    this.cpuOption = {
      title: {
        text: this.appName + ' CPU Usage'
      },
      tooltip : {
        trigger: 'axis'
      },
      legend: {
        data:['app1','app2','app3','app4','app5']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis : [
        {
          type : 'category',
          boundaryGap : false,
          data : ['周一','周二','周三','周四','周五','周六','周日']
        }
      ],
      yAxis : [
        {
          type : 'value',
          splitArea: {
            show: true
          }
        }
      ],
      series : [
        {
          name:'app1',
          type:'line',
          data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
          name:'app2',
          type:'line',
          data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
          name:'app3',
          type:'line',
          data:[150, 232, 201, 154, 190, 330, 410]
        },
        {
          name:'app4',
          type:'line',
          data:[320, 332, 301, 334, 390, 330, 320]
        },
        {
          name:'app5',
          type:'line',
          data:[820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    }
  }
  
  ngAfterViewInit(){
    this.resizeChart();
  }

  onChartInit(ec) {
    this.echartsIntance = ec;
  }                               
  
  resizeChart() {
    if (this.echartsIntance) {
      $(this.echartsIntance._dom).height($(window).height()*0.6);
      this.echartsIntance.resize();
    }
  }
}
