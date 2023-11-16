import { Component } from '@angular/core';
import { API_URLS } from 'src/app/constants';
import { Projet } from 'src/app/modele/Projet';
import { AuthService } from 'src/app/service/auth.service';
import { CommunService } from 'src/app/service/commun.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-projet-create',
  templateUrl: './projet-create.component.html',
  styleUrls: ['./projet-create.component.css']
})
export class ProjetCreateComponent {

  /**
   * Gère l'affichage des messages d'erreurs/succès
   */
  traitementOk : boolean | null = null;

  projet : Projet = new Projet();

  private listeInscription : Array<Subscription> = new Array<Subscription>();

  constructor(private authService : AuthService){

  }

  creerProjet(){
    this.authService.doPost(API_URLS.PROJET_URL, this.projet).subscribe ((retour : any) => {
      //On vide le formulaire
      this.projet = new Projet();
      this.traitementOk = true;
      // Permet d'appliquer un traitement (ici appliquer une valeur) au bout de Xms 
      setTimeout(() => {
        this.traitementOk = null;
      }, CommunService.timeOutMessage);
    }, (error : any) => {
      this.traitementOk = false;
      console.error('Erreur : ', error);
    });
  }

  
  /**
   * Lors de la destruction du composant on vide les ressources que l'on a alloué à ce composant et on se désinscrit des evenements
   */
  ngOnDestroy(){
    CommunService.ngOnDestroy(this.listeInscription);
  }

}
