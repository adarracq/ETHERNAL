import { Component, OnInit } from '@angular/core';
import { IpfsService } from '../services/ipfs.service';
import { MintService } from '../services/mint.service';

@Component({
  selector: 'app-mint-nft',
  templateUrl: './mint-nft.component.html',
  styleUrls: ['./mint-nft.component.scss']
})
export class MintNFTComponent implements OnInit {

  fileUrl = null;
  formInput = { price: '', name: '', description: '' };

  constructor(private mintService: MintService, private readonly ipfsService: IpfsService) { }

  ngOnInit(): void {
  }

  updateName(e: any) {
    this.formInput.name = e.target.value;
  }

  updateDescription(e: any) {
    this.formInput.description = e.target.value;
  }

  updatePrice(e: any) {
    this.formInput.price = e.target.value;
  }

  createMarket() {
    this.mintService.fileUrl = this.fileUrl;
    this.mintService.formInput = this.formInput;
    this.mintService.createMarket();
  }

  loadFile = async (e: any) => {
    const file = e.target.files[0];
    try {
      await this.ipfsService.start();
      const node = this.ipfsService.getIpfs();

      const added = await node.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      console.log(url);
      this.fileUrl = url;
    } catch (error) {
      console.log('Error uploading file: ', error);
    }  
  }

}
