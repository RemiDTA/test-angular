import {   Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { API_SOUS_URLS, API_URLS } from 'src/app/constants';
import { Projet } from 'src/app/modele/Projet';
import { UtilisateurSimple } from 'src/app/modele/UtilisateurSimple';
import { AuthService } from 'src/app/service/auth.service';
import { CommunService } from 'src/app/service/commun.service';

@Component({
  selector: 'app-projet-list',
  templateUrl: './projet-list.component.html',
  styleUrls: ['./projet-list.component.css']
})
export class ProjetListComponent {
  
  listeProjet : Array<Projet> = new Array<Projet>();

  private listeInscription : Array<Subscription> = new Array<Subscription>();

  /**
   * Liste d'id sur lesquels on a appliquer une suppression et qu'il n'y a pas eut d'erreur
   */
  idProjetDeleteReussi : Array<number> = new Array<number>();

  /**
   * Liste d'id sur lesquels on a appliquer une suppression mais qui a échoué
   */
  idProjetDeleteRate : Array<number> = new Array<number>();

  /**
   * On a 3 cas : pas de traitement (null), traitement OK (true) et traitement KO (false)
   */
  traitementOk : boolean | null = null;

  /**
   * Map contenant l'id de l'équipe que l'on souhaite associer au projet (permet au BO d'associer tous les membres de l'équipe au projet)
   * La clef correspond à l'id du projet et la valeur à l'ID de l'équipe
   * Il s'agit d'une map vu qu'il y a plusieurs projet que l'on peut associer des équipes à plusieurs projet en même temps
   * (Après à voir si c'est mieux d'associer une équipe de manière unitaire ou quoi)
   */
  mapProjetEquipe : Map<number, number> = new Map<number, number>();

  constructor(private authService : AuthService) {
    this.authService = authService;
  }

  ngOnInit(){
    let inscriptionHttpProjet = this.authService.doGet(API_URLS.PROJET_URL).subscribe ((donneeProjet : any) => {
      if (donneeProjet[0]){
        donneeProjet.forEach((projet : any) => {
          let projetCourant = new Projet();
          projetCourant.id = projet.id;
          projetCourant.entreprise = projet.entreprise;
          projetCourant.nomProjet = projet.nomProjet
          this.listeProjet.push(projetCourant);
          //Pour chaque projet, on récupère l'ensemble des collaborateurs (/projet/{id}/collaborateurs)
          let inscriptionHttpCollabo = this.authService.doGet(`${API_URLS.PROJET_URL}/${projet.id}${API_SOUS_URLS.PROJET_COLLABORATEUR_SOUS_URL}`).subscribe ((donneeUtilisateur : any) => {
            if (donneeUtilisateur[0]){
                donneeUtilisateur.forEach((utilisateurHttp : any) => {
                let utilisateurCourant = new UtilisateurSimple();
                utilisateurCourant.email = utilisateurHttp.email;
                utilisateurCourant.id = utilisateurHttp.id;
                projetCourant.listeCollaborateurs.push(utilisateurCourant);
              });
          }
        });
        this.listeInscription.push(inscriptionHttpCollabo);
        });
      }
    });
    this.listeInscription.push(inscriptionHttpProjet);
  }

  /**
   * Lors de la destruction du composant on vide les ressources que l'on a alloué à ce composant et on se désinscrit des evenements
   */
    ngOnDestroy(){
      CommunService.ngOnDestroy(this.listeInscription);
    }

    /**
     * Lorsque l'utilisateur selectionne une équipe qu'il souhaite associer à un projet
     * Comme on affiche une liste de projet, on stock en cache ce que l'utilisateur a associer entre l'équipe et le projet jusqu'à ce que l'utilisateur valide et clic sur le bouton
     */
    associerEquipeProjet(event : any, idProjet : number){
      this.mapProjetEquipe.set(idProjet, event);
    }

    /**
     * Déclenche l'association entre les équipes et les projets saisie par l'utilisateur
     */
    associerEquipeTousProjet(){
      for(let [key,value] of this.mapProjetEquipe){
        this.authService.doPost(`${API_URLS.PROJET_URL}/${key}/${API_SOUS_URLS.PROJET_AJOUTER_COLLABORATEUR_EQUIPE_SOUS_URL}/${value}`, null).subscribe(
          (response :any) => {
            this.traitementOk = true;
            // Permet d'appliquer un traitement (ici appliquer une valeur) au bout de Xms 
            setTimeout(() => {
              this.traitementOk = null;
            }, CommunService.timeOutMessage);
            
          },
          (error :any) => {
            console.error('Erreur lors de la requête :', error);
            this.traitementOk = false;
          }
        );
      };
    }

    deleteProjet(idProjet : number | null){
      if (idProjet!= null){
        let inscription =this.authService.doDelete(`${API_URLS.PROJET_URL}/${idProjet}`).subscribe(
          (response :any) => {
            this.idProjetDeleteReussi.push(idProjet);
          },
          (error :any) => {
            console.error('Erreur lors de la requête :', error);
            this.idProjetDeleteRate.push(idProjet);
          }
        );
        this.listeInscription.push(inscription);
      }
    }

}
