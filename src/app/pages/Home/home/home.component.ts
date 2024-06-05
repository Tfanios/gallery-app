import { Component, OnInit } from '@angular/core';
import { ImagesService } from 'src/app/services/images/images.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private imageSerivce : ImagesService){}
  images:string[] = []
  likedImages:string[] = []
  ngOnInit() {
    this.imageSerivce.getImages().subscribe(images=>this.images = images);
    this.imageSerivce.getLikedImages().subscribe(images=>this.likedImages = images);
    if(localStorage?.getItem('userAndFavoriteImages')){
      const data =JSON.parse(localStorage.getItem('userAndFavoriteImages')!)
      this.likedImages = data.imagesId;
      console.log(JSON.parse(localStorage.getItem('userAndFavoriteImages')!))
    }

  }
}

