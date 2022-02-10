import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  loaded = false;
  empty = false;
  nfts : any;

  constructor(private dashboardService: DashboardService) { }

  async ngOnInit(): Promise<void> {
    await this.dashboardService.LoadNFTs();
    this.loaded = await this.dashboardService.loadingState;
    this.nfts = await this.dashboardService.nfts;

    for(var i = 0; i < this.nfts.length; i++) {
      console.log(this.nfts[i]);
      console.log("sold : ", this.nfts[i].sold);
    }

    if(this.nfts.lentgh == 0 || this.nfts.length == null) {
      this.empty = true;
    }
  }

}
