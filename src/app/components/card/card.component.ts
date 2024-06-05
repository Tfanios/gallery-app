import { Component, Input, OnInit, computed, inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ImagesService } from 'src/app/services/images/images.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input({ required: true }) itemIndex!:number;
  @Input({ required: true }) type?: 'FAVOURITE' | 'HOME' | 'DETAILS';
  @Input({ required: false }) isLiked: boolean = false;



  constructor(private _imagesService: ImagesService, _authService: AuthService){}
  router = inject(Router);

  user!:Iuser
  isDisabled:boolean = false;
  likedImagesArrayForStorage!:string[];
  routerLinkVar:string = ''

  ngOnInit(): void {
      this.routerLinkVar = '/favourites/'+this.itemIndex;
    }
    
  imagePath = computed(()=>{
    return `https://picsum.photos/id/${this.itemIndex}/300/300`
  })


  likeEvent(){
    this._imagesService.likeImage(String(this.itemIndex))
    const sub = this._imagesService.getLikedImages().subscribe(data=>this.likedImagesArrayForStorage = data)
    if(localStorage?.getItem('user')){
        this.user = JSON.parse(localStorage.getItem('user')!)
      }

      localStorage.setItem('userAndFavoriteImages', JSON.stringify({id:this.user.id, imagesId:this.likedImagesArrayForStorage}))

      if(this.likedImagesArrayForStorage.includes(String(this.itemIndex))){
        this.isDisabled = true
      }
      sub.unsubscribe();
    }
  deleteEvent(){
     
      this._imagesService.unlikeImage(String(this.itemIndex))
      this.router.navigate(['favourites'])
    }
}

interface Iuser {
  id:string;
  username:string;
  email:string;
  firstname:string;
  lastname:string;
  gender:string;
  image:string;
  token:string;
}