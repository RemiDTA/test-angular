import { Component } from '@angular/core';
import {AuthService} from '../service/auth.service';
import { Subscription } from 'rxjs';
import { CommunService } from '../service/commun.service';
import { Router } from '@angular/router';
import {  URL_FRONT } from '../constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  private listeInscription : Array<Subscription> = new Array<Subscription>();

  connexionOk : boolean | null = null;

  constructor(private authService: AuthService, private router: Router) {} // Injection du service AuthService

  connexion() {
    // Appel de la méthode login du service
    let inscriptionHttp = this.authService.login(this.email, this.password)
       .subscribe((response : any) => {
        this.traitementLorsConnexion();
       }, (error : any) => {
         // Il s'agit d'un faux négatif ici, la réponse est 200 mais avec redirection de la part du BO
         if (error.status == 200) {
          this.traitementLorsConnexion();
         } else {
          this.connexionOk = false;
          console.error('Erreur de connexion', error);
         }
       });
       this.listeInscription.push(inscriptionHttp);
  }

  /**
   * Traitements réalisés lors d'une connexion réussie
   */
  traitementLorsConnexion(){
    this.connexionOk = true;
    CommunService.rediriger(this.router, URL_FRONT.HOME);
    //Gestion de l'event
    this.authService.setLoginUtilisateurConnecter(this.email);
  }

    /**
   * Lors de la destruction du composant on vide les ressources que l'on a alloué à ce composant et on se désinscrit des evenements
   */
  ngOnDestroy(){
    CommunService.ngOnDestroy(this.listeInscription);
  }
}
