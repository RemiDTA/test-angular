import { Component } from '@angular/core';
import {AuthService} from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {} // Injection du service AuthService

  connexion() {
    // Appel de la méthode login du service
    this.authService.login(this.email, this.password)
      // .subscribe(response => {
      //   // Traitez ici la réponse du service après la connexion réussie
      //   console.log('Connexion réussie', response);
      // }, error => {
      //   // Traitez ici les erreurs en cas d'échec de la connexion
      //   console.error('Erreur de connexion', error);
      // });
  }

}
