import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//composants spécifiques 
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProjetListComponent } from './projet/projet-list/projet-list.component';
import { EquipeListComponent } from './equipe/equipe-list/equipe-list.component';
import { SelectEquipeComponent } from './equipe/selection/select-equipe/select-equipe.component';
import { URL_FRONT } from './constants';

//Permet de gérer les routes
const routes: Routes = [
  { path: URL_FRONT.HOME, component: HomeComponent },
  { path: URL_FRONT.USER, component: UserListComponent },
  { path: `${URL_FRONT.USER}/:id`, component: UserDetailComponent },
  { path: URL_FRONT.LOGIN, component: LoginComponent },
  { path: URL_FRONT.PROJET, component: ProjetListComponent },
  { path: URL_FRONT.TEAM, component: EquipeListComponent },
  { path: 'team-select', component: SelectEquipeComponent },
  //La redirection doit être la dernière ligne
  { path: '**', redirectTo: '', pathMatch: 'full' } // Rediriger vers la page de garde par défaut
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
