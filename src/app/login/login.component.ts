import { Component } from '@angular/core';
import {AuthService} from '../service/auth.service';
import { Subscription } from 'rxjs';
import { CommunService } from '../service/commun.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  private listeInscription : Array<Subscription> = new Array<Subscription>();

  constructor(private authService: AuthService) {} // Injection du service AuthService

  connexion() {
    // Appel de la méthode login du service
    let inscriptionHttp = this.authService.login(this.email, this.password)
       .subscribe((response : any) => {
         // Traitez ici la réponse du service après la connexion réussie
         console.log('Connexion réussie', response);
       }, (error : any) => {
         // Traitez ici les erreurs en cas d'échec de la connexion
         console.error('Erreur de connexion', error);
       });
       this.listeInscription.push(inscriptionHttp);
  }

    /**
   * Lors de la destruction du composant on vide les ressources que l'on a alloué à ce composant et on se désinscrit des evenements
   */
  ngOnDestroy(){
    CommunService.ngOnDestroy(this.listeInscription);
  }
}
