import { Component, OnInit } from '@angular/core';
import { LoadBalanceService } from './loadbalance.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-loadbalance',
  templateUrl: './loadbalance.component.html',
  styleUrls: ['./loadbalance.component.scss'],
  providers: [LoadBalanceService]
})
export class LoadBalanceComponent implements OnInit {
  
  public outBalacneList: Array<any> = [];
  public inBalacneList: Array<any> = [];

  constructor(public loadBalanceService: LoadBalanceService,
              public router: Router,
              public activeRoute: ActivatedRoute) {

  }

  ngOnInit() {
  }
}
