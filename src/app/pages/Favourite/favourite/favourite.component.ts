import { Component, OnInit } from '@angular/core';
import { ImagesService } from 'src/app/services/images/images.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit {
constructor (private _imagesService: ImagesService) {}
likedImages!:string[]
 ngOnInit(): void {
   console.log(this.likedImages)
   // localStorage.setItem('userAndFavoriteImages', JSON.stringify({id:this.user.id, imageId:this.likedImagesArrayForStorage}))
   if(localStorage.getItem('userAndFavoriteImages')){
     const data = JSON.parse(localStorage.getItem('userAndFavoriteImages')!)
     console.log(data,'from favourite')
     data.imagesId.forEach((imageId:string) =>{
       this._imagesService.likeImage(String(imageId))
      })
    this._imagesService.getLikedImages().subscribe(data=>this.likedImages = data);
    console.log(this.likedImages)
  }
 }
 ngOnDestroy():void {
  
}
}
