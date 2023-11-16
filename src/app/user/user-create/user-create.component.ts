import { Component } from '@angular/core';
import { UtilisateurComplet } from 'src/app/modele/UtilisateurComplet';
import { AuthService } from 'src/app/service/auth.service';
import { CommunService } from 'src/app/service/commun.service';
import { Subscription } from 'rxjs';
import { API_URLS } from 'src/app/constants';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {

  /**
   * Gère l'affichage des messages d'erreurs/succès
   */
  traitementOk : boolean | null = null;

  utilisateur : UtilisateurComplet = new UtilisateurComplet();

  private listeInscription : Array<Subscription> = new Array<Subscription>();

  constructor(private authService : AuthService){

  }

  creerUtilisateur(){
    let inscriptionHttpEquipe = this.authService.doPost(API_URLS.USER_URL, this.utilisateur).subscribe ((retour : any) => {
      //On vide le formulaire
      this.utilisateur = new UtilisateurComplet();
      this.traitementOk = true;
      // Permet d'appliquer un traitement (ici appliquer une valeur) au bout de Xms 
      setTimeout(() => {
        this.traitementOk = null;
      }, CommunService.timeOutMessage);
    }, (error : any) => {
      this.traitementOk = false;
      console.error('Erreur : ', error);
    });
    this.listeInscription.push(inscriptionHttpEquipe);
  }

  
  /**
   * Lors de la destruction du composant on vide les ressources que l'on a alloué à ce composant et on se désinscrit des evenements
   */
  ngOnDestroy(){
    CommunService.ngOnDestroy(this.listeInscription);
  }

}
