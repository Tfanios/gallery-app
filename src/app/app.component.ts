import { Component, OnDestroy, OnInit, SimpleChanges, inject } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  router = inject(Router);

  constructor(private authService: AuthService){}
  private authSub!: Subscription;
  user!:Iuser 

  title = 'gallery-app';
  isAuth = false;
  ngOnInit():void {
   
    if(localStorage?.getItem('user')){
      this.user = JSON.parse(localStorage?.getItem('user')!)
      this.authService.isAuthenticated$.next(true)
      this.router.navigate(['home'])
    }  
    this.authSub = this.authService.isAuthenticated$.subscribe(value=> {
      this.isAuth = value
    })
    console.log(this.user)
  }
  ngOnDestroy():void {
    this.authSub.unsubscribe()
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