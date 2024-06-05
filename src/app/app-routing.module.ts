import { NgModule } from '@angular/core';
import { RouterModule, Routes,  } from '@angular/router';
import { DetailsComponent } from './pages/Details/details/details.component';
import { FavouriteComponent } from './pages/Favourite/favourite/favourite.component';
import { HomeComponent } from './pages/Home/home/home.component';
import { ErrorComponent } from './pages/Error/error/error.component';
import { LoginComponent } from './pages/Login/login/login.component';
import { authGuard } from './auth.guard';

const routes: Routes = [

  {path: 'favourites', pathMatch: 'full', component: FavouriteComponent,canActivate:[authGuard] },
  {path: 'favourites/:id', component: DetailsComponent,canActivate:[authGuard]},
  {path: 'home', component: HomeComponent,canActivate:[authGuard]},
  {path: 'login', component: LoginComponent},

  { path: '', redirectTo: 'home', pathMatch: 'full'},
  
  // {path: '/', pathMatch: 'full'},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
