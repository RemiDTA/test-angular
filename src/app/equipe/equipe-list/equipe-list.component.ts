import { Component } from '@angular/core';

import { Subscription } from 'rxjs';
import { API_SOUS_URLS, API_URLS } from 'src/app/constants';
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
   * Liste d'id sur lesquels on a appliquer une association de nouveaux membres et qui a réussi
   */
  idAssociationUtilisateurReussi : Array<number> = new Array<number>();

  /**
   * Liste d'id sur lesquels on a appliquer une association de nouveaux membres et qui a échoué
   */
  idAssociationUtilisateurRate : Array<number> = new Array<number>();

  /**
   * Liste d'id sur lesquels on a appliquer une suppression et qu'il n'y a pas eut d'erreur
   */
  idEquipeDeleteReussi : Array<number> = new Array<number>();

  /**
   * Map qui contiendra en clef, l'id de l'équipe et en valeur un tableau d'utilisateur selectionner
   * Nb : je pourrais ne stocker que les id des utilisateurs, cferreira-remi@hotmail.frela serait suffisant pour éxecuter le POST vers le BO mais conserver l'objet utilisateur 
   * me permet de rajouter celui-ci directement dans le front (en cache du coup) sans devoir refaire un GET au BO en demandant toutes les équipes, tous les utilisateurs etc ...
   */
  mapUtilisateurSelectionner : Map<number, Array<any>> = new Map<number, Array<any>>();

  /**
   * Liste d'id sur lesquels on a appliquer une suppression mais qui a échoué
   */
  idEquipeDeleteRate : Array<number> = new Array<number>();

  listeEquipe : Array<Equipe> = new Array<Equipe>();

  private listeInscription : Array<Subscription> = new Array<Subscription>();

  constructor(private authService : AuthService) {
  }

  ngOnInit(){
    let inscriptionHttpProjet = this.authService.doGet(API_URLS.TEAM_URL).subscribe((donneeEquipe : any) => {
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

  /**
   * Une fois les nouveaux membres d'équipe selectionner, l'utilisateur a valider et on appel le BO
   * 
   * @param idEquipe 
   */
  associerUtilisateurSelect(idEquipe : number){
    this.idAssociationUtilisateurReussi.push(idEquipe);
    let equipeRecuperer = this.listeEquipe.find(equipe => equipe.id === idEquipe);
    if (equipeRecuperer){
      let listeUtilisateurSelectionner = this.mapUtilisateurSelectionner.get(idEquipe);
      if (listeUtilisateurSelectionner){
        listeUtilisateurSelectionner.forEach((utilisateur : any) => {
          if (!equipeRecuperer?.listeUtilisateur.find(utilisateurEquipe => utilisateur.id === utilisateurEquipe.id)){
            this.authService.doPatch(`${API_URLS.USER_URL}/${utilisateur.id}/${API_SOUS_URLS.USER_ASSOCIER_EQUIPE_SOUS_URL}`, equipeRecuperer).subscribe((donneeUtilisateur : any) => {
              let nouveauMembre = new UtilisateurSimple();
              nouveauMembre.id = donneeUtilisateur.id;
              nouveauMembre.email = donneeUtilisateur.email;
              
              equipeRecuperer?.listeUtilisateur.push(nouveauMembre);
            }, (error : any) => {
              console.error('Erreur : ', error);
              const index = this.idAssociationUtilisateurReussi.indexOf(idEquipe, 0);
              if (index > -1) {
                this.idAssociationUtilisateurReussi.splice(index, 1);
              }
              this.idAssociationUtilisateurRate.push(idEquipe);
            });
          }
        });
        this.mapUtilisateurSelectionner.delete(idEquipe);
      }
    }
  }

  /**
   * A la selection d'utilisateur, on range ceux-ci dans une map
   * 
   * @param evenement contient tous les utilisateurs qui ont été selectionner
   * @param idEquipe 
   */
  selectionnerUtilisateur(evenement : any, idEquipe : number){
    this.mapUtilisateurSelectionner.set(idEquipe, evenement);
  }

}

