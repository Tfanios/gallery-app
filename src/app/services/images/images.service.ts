import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  constructor() { }
  private likedImagesSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  likedImages$: Observable<string[]> = this.likedImagesSubject.asObservable();

  getImages() : Observable<string[]>{
    const numberOfImages = 50
    const images = [...Array(numberOfImages)].map((image, i) => `https://picsum.photos/id/${i}/300/300`)
   
    return of(images)
  }

  likeImage (imageId: string) {
    console.log('liked', imageId)
    if (imageId) {
      const currentLikedImages = this.likedImagesSubject.getValue();
      if (!currentLikedImages.includes(imageId)) {
        this.likedImagesSubject.next([...currentLikedImages, imageId]);
      }
    }
  }
  unlikeImage (imageId: string) {
    const currentLikedImages = this.likedImagesSubject.getValue();
    const updatedLikedImages = currentLikedImages.filter((id) => id !== imageId);
    this.likedImagesSubject.next(updatedLikedImages);
   
    const data = JSON.parse(localStorage.getItem('userAndFavoriteImages')!)
    
    const updatedImagesId = data.imagesId.filter((img:string) =>{
        return img != imageId;
    })
    console.log(data)
    if(updatedImagesId > 1){
      localStorage.setItem('userAndFavoriteImages', JSON.stringify({id:data.id, imagesId:updatedImagesId}))
    }else{
      localStorage.setItem('userAndFavoriteImages', JSON.stringify({id:data.id, imagesId:[]}))
    }
    
  }
  getLikedImages(): Observable<string[]> {
    return this.likedImages$;
  }
 
}

