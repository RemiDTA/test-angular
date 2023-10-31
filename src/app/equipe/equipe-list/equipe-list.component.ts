import { Component } from '@angular/core';

import { Subscription } from 'rxjs';
import { API_URLS } from 'src/app/constants';
import { Equipe } from 'src/app/modele/Equipe';
import { UtilisateurComplet } from 'src/app/modele/UtilisateurComplet';
import { UtilisateurSimple } from 'src/app/modele/UtilisateurSimple';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-equipe-list',
  templateUrl: './equipe-list.component.html',
  styleUrls: ['./equipe-list.component.css']
})
export class EquipeListComponent {

  listeEquipe : Array<Equipe> = new Array<Equipe>();

  private listeInscription : Array<Subscription> = new Array<Subscription>();

  constructor(authService : AuthService) {

    let inscriptionHttpProjet = authService.doGet(API_URLS.TEAM_URL).subscribe ((donneeEquipe : any) => {
      if (donneeEquipe[0]){
        donneeEquipe.forEach((equipe : any) => {
          let equipeCourante = new Equipe();
          equipeCourante.id = equipe.id;
          equipeCourante.dateCreation = equipe.dateCreation;
          equipeCourante.description = equipe.description
          equipeCourante.emplacement = equipe.emplacement
          this.listeEquipe.push(equipeCourante);
          console.log(donneeEquipe);
          //Pour chaque equipe, on récupère l'ensemble des utilisateurs associés
          (equipe.users).forEach((utilisateur : any) => {
            console.log(utilisateur);
            let utilisateurCourant = new UtilisateurSimple();
            utilisateurCourant.email = utilisateur.email;
            utilisateurCourant.id = utilisateur.id;
            equipeCourante.listeUtilisateur.push(utilisateurCourant);
          });
        });
      }
    });
    this.listeInscription.push(inscriptionHttpProjet);
  }

  /**
   * Lors de la destruction du composant on vide les ressources que l'on a alloué à ce composant et on se désinscrit des evenements
   */
    ngOnDestroy(){
      this.listeInscription.forEach((inscription : Subscription)=> {
        inscription.unsubscribe();
      });
    }

}

