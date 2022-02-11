import { Component, OnInit } from '@angular/core';
import { MynftsService } from '../services/mynfts.service';

@Component({
  selector: 'app-my-nft',
  templateUrl: './my-nft.component.html',
  styleUrls: ['./my-nft.component.scss']
})
export class MyNftComponent implements OnInit {
  loaded = false;
  empty = false;
  nfts : any;

  constructor(private myNFTsservice: MynftsService) { }

  async ngOnInit(): Promise<void> {
    await this.myNFTsservice.LoadNFTs();
    this.loaded = await this.myNFTsservice.loadingState;
    this.nfts = await this.myNFTsservice.nfts;


    if(this.nfts.length == 0) {
      console.log("coucou");
      this.empty = true;
    }
  }

}
