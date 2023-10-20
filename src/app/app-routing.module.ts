import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';

//composants spécifiques 
import { UserListComponent } from './user/user-list/user-list.component';
 import { UserDetailComponent } from './user/user-detail/user-detail.component';

//Permet de gérer les routes
const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'user/:id', component: UserDetailComponent },
  {path: 'login', component: LoginComponent},
  //La redirection doit être la dernière ligne
  { path: '**', redirectTo: '/login', pathMatch: 'full' } // Rediriger vers /login par défaut
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
