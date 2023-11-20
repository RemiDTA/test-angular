import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test-angular';

  /**
   * Observe l'evenement de connexion
   */
  loginUtilisateur : string | null = null;
 
  constructor(private authService : AuthService){
  }  

  ngOnInit(){
    //On s'abonne à l'evenement et dès qu'un utilisateur se connecte il recoit son login
    this.authService.loginUtilisateurConnecter$.subscribe((val : string) => {
      this.loginUtilisateur = val;
    });
  }
}

