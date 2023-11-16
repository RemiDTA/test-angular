import { Component } from '@angular/core';
import { Equipe } from 'src/app/modele/Equipe';
import { AuthService } from 'src/app/service/auth.service';
import { CommunService } from 'src/app/service/commun.service';
import { Subscription } from 'rxjs';
import { API_URLS } from 'src/app/constants';

@Component({
  selector: 'app-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.css']
})
export class TeamCreateComponent {

  /**
   * Gère l'affichage des messages d'erreurs/succès
   */
  traitementOk : boolean | null = null;

  equipe : Equipe = new Equipe();

  private listeInscription : Array<Subscription> = new Array<Subscription>();

  constructor(private authService : AuthService){

  }

  creerEquipe(){
    let inscriptionHttpEquipe = this.authService.doPost(API_URLS.TEAM_URL, this.equipe).subscribe ((retour : any) => {
      //On vide le formulaire
      this.equipe = new Equipe();
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