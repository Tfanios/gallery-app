import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  router = inject(Router);

  constructor(private _authService: AuthService){}
  logout(){
    this._authService.Logout();
    this.router.navigate(['login'])
  }
}
