import { Component, inject } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
// "username": "emilys",
// "password": "emilyspass",
export class LoginComponent {
  constructor(private authService: AuthService) {}
  router = inject(Router);
  isAuthenticated: boolean = false;
   testForm = new FormGroup({
    name: new FormControl('emilys'),
    password: new FormControl('emilyspass'),
});

  submitForm(){
    this.authService.Login(this.testForm.value.name!, this.testForm.value.password!).pipe(
      finalize(() => {
        this.authService.isAuthenticated$.next(true)
        this.authService.isAuthenticated$.subscribe(value=> {
          this.isAuthenticated = value
        })
        if(this.isAuthenticated){
          this.router.navigate(['/home']);
        }
      })
    ).subscribe()
  }
}
