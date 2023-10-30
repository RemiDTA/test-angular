import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//composants spécifiques 
import { UserListComponent } from './user/user-list/user-list.component';
 import { UserDetailComponent } from './user/user-detail/user-detail.component';
 import { LoginComponent } from './login/login.component';
 import { HomeComponent } from './home/home.component';
import { Projet } from './modele/Projet';
import { ProjetListComponent } from './projet/projet-list/projet-list.component';

//Permet de gérer les routes
const routes: Routes = [
  { path: 'user', component: UserListComponent },
  { path: 'user/:id', component: UserDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'projet', component: ProjetListComponent },
  { path: '', component: HomeComponent },
  //La redirection doit être la dernière ligne
  { path: '**', redirectTo: '', pathMatch: 'full' } // Rediriger vers la page de garde par défaut
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
