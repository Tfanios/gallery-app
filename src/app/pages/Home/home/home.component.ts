import { Component, HostListener, OnInit } from '@angular/core';
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
  isLoading = false
  ngOnInit() {
    // this.imageSerivce.getImages().subscribe(images=>this.images = images);
    this.imageSerivce.getLikedImages().subscribe(images=>this.likedImages = images);
    this.images = this.imageSerivce.getImagesWithSubject()
    if(localStorage?.getItem('userAndFavoriteImages')){
      const data =JSON.parse(localStorage.getItem('userAndFavoriteImages')!)
      this.likedImages = data.imagesId;
      console.log(JSON.parse(localStorage.getItem('userAndFavoriteImages')!),'this')
    }
  }

  @HostListener('window:scroll',['$event'])
  onWindowScroll(event:any){
    console.log(this.likedImages)
    if(window.innerHeight+window.scrollY>=document.body.querySelector<HTMLElement>('app-root')!.offsetHeight ){
      // console.log(window.innerHeight+window.scrollY,'y+x');
      console.log(event);
      this.imageSerivce.getImagesByScroll();
    }
  }
}

