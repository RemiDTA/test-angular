import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {  HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProjetListComponent } from './projet/projet-list/projet-list.component';
import { EquipeListComponent } from './equipe/equipe-list/equipe-list.component';
import { SelectEquipeComponent } from './equipe/selection/select-equipe/select-equipe.component';
// Librairie de lookup
import { DxLookupModule } from 'devextreme-angular';
import { SelectProjetComponent } from './projet/selection/select-projet/select-projet.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserDetailComponent,
    LoginComponent,
    UserListComponent,
    UserDetailComponent,
    HomeComponent,
    ProjetListComponent,
    EquipeListComponent,
    SelectEquipeComponent,
    SelectProjetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // Permet de gérer ngModel
    HttpClientModule, // Permet de gérer les requêtes HTTP
    DxLookupModule // Gestion de lookup
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
