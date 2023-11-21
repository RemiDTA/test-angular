import { Component } from '@angular/core';

import { Subscription } from 'rxjs';
import { API_URLS } from 'src/app/constants';
import { Equipe } from 'src/app/modele/Equipe';
import { UtilisateurSimple } from 'src/app/modele/UtilisateurSimple';
import { AuthService } from 'src/app/service/auth.service';
import { CommunService } from 'src/app/service/commun.service';

@Component({
  selector: 'app-equipe-list',
  templateUrl: './equipe-list.component.html',
  styleUrls: ['./equipe-list.component.css']
})
export class EquipeListComponent {

  /**
   * Liste d'id sur lesquels on a appliquer une suppression et qu'il n'y a pas eut d'erreur
   */
  idEquipeDeleteReussi : Array<number> = new Array<number>();

  /**
   * Liste d'id sur lesquels on a appliquer une suppression mais qui a échoué
   */
  idEquipeDeleteRate : Array<number> = new Array<number>();

  listeEquipe : Array<Equipe> = new Array<Equipe>();

  private listeInscription : Array<Subscription> = new Array<Subscription>();

  constructor(private authService : AuthService) {
  }

  ngOnInit(){
    let inscriptionHttpProjet = this.authService.doGet(API_URLS.TEAM_URL).subscribe ((donneeEquipe : any) => {
      if (donneeEquipe[0]){
        donneeEquipe.forEach((equipe : any) => {
          let equipeCourante = new Equipe();
          equipeCourante.id = equipe.id;
          equipeCourante.dateCreation = equipe.dateCreation;
          equipeCourante.description = equipe.description
          equipeCourante.emplacement = equipe.emplacement
          this.listeEquipe.push(equipeCourante);
          //Pour chaque equipe, on récupère l'ensemble des utilisateurs associés
          (equipe.users).forEach((utilisateur : any) => {
            let utilisateurCourant = new UtilisateurSimple();
            utilisateurCourant.email = utilisateur.email;
            utilisateurCourant.id = utilisateur.id;
            equipeCourante.listeUtilisateur.push(utilisateurCourant);
          });
        });
      }
    }, (error : any) => {
      console.error('Erreur : ', error);
    });
    this.listeInscription.push(inscriptionHttpProjet);
  }

  /**
   * Lors de la destruction du composant on vide les ressources que l'on a alloué à ce composant et on se désinscrit des evenements
   */
  ngOnDestroy(){
    CommunService.ngOnDestroy(this.listeInscription);
  }


  deleteEquipe(idEquipe : number | null){
    if (idEquipe!= null){
      let inscription =this.authService.doDelete(`${API_URLS.TEAM_URL}/${idEquipe}`).subscribe(
        (response :any) => {
          this.idEquipeDeleteReussi.push(idEquipe);
        },
        (error :any) => {
          console.error('Erreur lors de la requête :', error);
          this.idEquipeDeleteRate.push(idEquipe);
        }
      );
      this.listeInscription.push(inscription);
    }
  }

}

