import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
  constructor() { }
  private likedImagesSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  private imagesSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

 
  likedImages$: Observable<string[]> = this.likedImagesSubject.asObservable();
  numberOfImages = 50
  getImages() : Observable<string[]>{
    const images = [...Array(this.numberOfImages)].map((image, i) => `https://picsum.photos/id/${i}/300/300`)
    return of(images)
  }


  likeImage (imageId: string) {
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
    console.log(currentLikedImages,'currentLikedImages')
    console.log(updatedLikedImages,'updatedLikedImages')

    const data = JSON.parse(localStorage.getItem('userAndFavoriteImages')!)
    
    const updatedImagesId = data.imagesId.filter((img:string) =>{
        return img != imageId;
    })
   
    if(updatedImagesId.length > 0){
      localStorage.setItem('userAndFavoriteImages', JSON.stringify({id:data.id, imagesId:updatedImagesId}))
    }else{
      localStorage.setItem('userAndFavoriteImages', JSON.stringify({id:data.id, imagesId:[]}))
    }
    
  }

  getLikedImages(): Observable<string[]> {
    return this.likedImages$;
  }
  getImagesByScroll() {
    const lastImageIdx = this.numberOfImages
    let newIndeces:string[] = []
    for(let i = this.numberOfImages + 1; i <= this.numberOfImages+10; i++){
      
        newIndeces.push(`https://picsum.photos/id/${i}/300/300`)
    }
    console.log(newIndeces)
    const currentImages = this.imagesSubject.getValue()
    newIndeces.forEach((el)=>{
      currentImages.push(el);
    })
    this.imagesSubject.next(currentImages);

  }
  getImagesWithSubject() :string[]{
    const images = [...Array(this.numberOfImages)].map((image, i) => `https://picsum.photos/id/${i}/300/300`)
    this.imagesSubject.next(images);
    return images
  }
 
}

