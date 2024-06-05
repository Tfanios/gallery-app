import { TuiRootModule, TuiDialogModule, TuiAlertModule, TuiButtonModule } from "@taiga-ui/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import {  TuiInputModule, TuiInputPasswordModule, TuiIslandModule, TuiTabsModule } from "@taiga-ui/kit";

import { CardComponent } from "./components/card/card.component";
import { DetailsComponent } from './pages/Details/details/details.component';
import { FavouriteComponent } from './pages/Favourite/favourite/favourite.component';
import { HomeComponent } from './pages/Home/home/home.component';
import { ErrorComponent } from './pages/Error/error/error.component';
import { LoginComponent } from './pages/Login/login/login.component';
import { ReactiveFormsModule } from "@angular/forms";
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CardComponent,
    ErrorComponent,
    DetailsComponent,
    FavouriteComponent,
    HomeComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule, 
    AppRoutingModule,
      BrowserAnimationsModule,
      TuiRootModule,
      TuiDialogModule,
      TuiAlertModule,
      TuiIslandModule,
      TuiButtonModule,
      TuiInputPasswordModule,
      TuiInputModule,
      TuiTabsModule,
      HttpClientModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
