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
  blocks: any[] = [];

  ethPrice = 3127;

  showFilters = false;

  constructor(private homeService : HomeService) {
    //this.homeService.LoadNFTs();
   }

  async ngOnInit(): Promise<void> {
    await this.homeService.LoadNFTs();
    this.loaded = this.homeService.loadingState;
    this.nfts = await this.homeService.nfts;

    this.fillBlock();

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

  openFilters() {
    this.showFilters = !this.showFilters;
  }

  fillBlock() {
    for(var i = 0; i < this.nfts.length/4; i++) {
      this.blocks[i] = {};
      this.blocks[i].nfts = [];
      this.blocks[i].nfts[0] = this.nfts[i*4];

      try {
        if(this.nfts[i*4 + 1].name != null){
          this.blocks[i].nfts[1] = this.nfts[i*4 + 1];
        }
        if(this.nfts[i*4 + 2].name != null){
          this.blocks[i].nfts[2] = this.nfts[i*4 + 2];
        }
        if(this.nfts[i*4 + 3].name != null){
          this.blocks[i].nfts[3] = this.nfts[i*4 + 3];
        }
      }
      catch(error){}
    }
  }

  async sortNFTs(type) {
    console.log(type);
    if(type == "Recent"){
      this.nfts = this.nfts.sort((n1,n2) => n1.date - n2.date);
      this.fillBlock();
    }
    else if(type == "Price : low to high"){
      this.nfts = this.nfts.sort((n1,n2) => n1.price - n2.price);
      this.fillBlock();
    }
    else if(type == "Price : high to low") {
      this.nfts = this.nfts.sort((n1,n2) => n2.price - n1.price);
      this.fillBlock();
    }
  }

}
