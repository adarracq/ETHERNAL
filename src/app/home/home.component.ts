import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  loaded = false;
  empty = false;
  nfts : any;

  constructor(private homeService : HomeService) {
    //this.homeService.LoadNFTs();
   }

  async ngOnInit(): Promise<void> {
    await this.homeService.LoadNFTs();
    this.loaded = await this.homeService.loadingState;
    this.nfts = await this.homeService.nfts;

    for(var i = 0; i < this.nfts.length; i++) {
      console.log(this.nfts[i]);
    }

    if(this.nfts.lentgh == 0 || this.nfts.length == null) {
      this.empty = true;
    }
  }

  async buyNFT(nft: any) {
    await this.homeService.buyNFT(nft);
    await this.homeService.LoadNFTs();
    if(this.nfts.lentgh == 0 || this.nfts.length == null) {
      this.empty = true;
    }
  }

}
