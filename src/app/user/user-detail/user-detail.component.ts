import { Component } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import { API_URLS, API_SOUS_URLS, URL_FRONT } from '../../constants';
import { ActivatedRoute } from '@angular/router';
import { forkJoin , Subscription } from 'rxjs';
import {UtilisateurComplet} from '../../modele/UtilisateurComplet';
import { CommunService } from 'src/app/service/commun.service';
import { Equipe } from 'src/app/modele/Equipe';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {

  private listeInscription : Array<Subscription> = new Array<Subscription>();

  /**
   * Permet de gérer l'affichage des messages d'erreur dans le cas où un user n'a pas été trouvé
   */
  userTrouver : boolean = true;

/** 
 * utilisateur courant
 */
  utilisateur : UtilisateurComplet = new UtilisateurComplet();

  /**
   * Permet de gérer l'affichage des messages d'erreur concernant l'affectation de l'équipe
   */
  traitementEquipeOk : boolean | null = null;

  /**
   * Permet de gérer l'affichage des messages d'erreur concernant la suppression d'un utilisateur
   */
  traitementSuppressionOk : boolean | null = null;

    /**
   * Permet de gérer l'affichage des messages d'erreur concernant l'affectation du projet
   */
  traitemenProjetOk : boolean | null = null;

  /**
   * Permet de gérer l'affichage des messages d'erreurs lors de la mise à jours de l'utilisateur
   */
  majUtilisateur : boolean | null = null;

  /**
   * ID de l'équipe selectionner dans le lookup
   */
  idEquipeSelectionner : number | null = null;

  /**
   * ID du projet selectionner dans le lookup
   */
  idProjetSelectionner : number | null = null;

constructor(private authService : AuthService, private route: ActivatedRoute){}

ngOnInit(){
  let inscription = this.route.params.subscribe((params : any) => {
    let idCourant = params['id'];
    
    //forkJoin permet de travailler sur plusieurs observable (comme c'est le cas pour les requêtes HTTP) puis de récupérer le résultat dans un tableau
    let inscriptionHttp = forkJoin([
      this.authService.doGet(`${API_URLS.USER_URL}/${idCourant}`),
      this.authService.doGet(`${API_URLS.USER_URL}/${idCourant}${API_SOUS_URLS.TEAM_SOUS_URL}`)
    ]).subscribe ((tableauDonnees : any) => {
        let donneeUtilisateur = tableauDonnees[0];
        let donneeEquipe = tableauDonnees[1];

        this.utilisateur.telephone = donneeUtilisateur.telephone;
        this.utilisateur.prenom = donneeUtilisateur.prenom;
        this.utilisateur.nom = donneeUtilisateur.nom;
        this.utilisateur.email = donneeUtilisateur.email;
        this.utilisateur.id = donneeUtilisateur.id;

        if (donneeUtilisateur.projets[0]) {
          donneeUtilisateur.projets.forEach((element : any)=> {
            this.utilisateur.nomProjets.push(element.nomProjet);
          });
        } else {
          this.utilisateur.nomProjets.push('Aucun projet associé');
        }

        if (donneeEquipe){
          this.utilisateur.equipe = donneeEquipe.description;
        } else {
          this.utilisateur.equipe = 'Aucune équipe associée';
        }
      },
      (error : any) => {
        this.userTrouver = false;
        console.error('Erreur de la requête :', error);
      }
    );
    this.listeInscription.push(inscriptionHttp);
  });
  this.listeInscription.push(inscription);
}

/**
 * Met en cache le numéro de l'équipe selectionner par l'utilisateur
 * Celui-ci devra valider en cliquant sur le bouton
 */
selectionnerEquipe(event : any){
  this.idEquipeSelectionner = event;
}

associerEquipe(){
  if (this.idEquipeSelectionner) {
  let bodyEquipe = new Equipe();
    bodyEquipe.id = this.idEquipeSelectionner;
    
    let inscription = this.authService.doPatch(`${API_URLS.USER_URL}/${this.utilisateur.id}/${API_SOUS_URLS.USER_ASSOCIER_EQUIPE_SOUS_URL}`, bodyEquipe).subscribe(
      (response :any) => {
        this.traitementEquipeOk = true;
        // Permet d'appliquer un traitement (ici appliquer une valeur) au bout de Xms 
        setTimeout(() => {
          this.traitementEquipeOk = null;
        }, CommunService.timeOutMessage);
        
      },
      (error :any) => {
        console.error('Erreur lors de la requête :', error);
        this.traitementEquipeOk = false;
      }
    );
    this.listeInscription.push(inscription);
  }
}

/**
 * Met en cache le numéro du projet selectionner par l'utilisateur
 * Celui-ci devra valider en cliquant sur le bouton
 */
selectionnerProjet(event : any){
  this.idProjetSelectionner = event;
}

associerProjet(){
  if (this.idProjetSelectionner){
    let body = new Array<UtilisateurComplet>();
    body.push(this.utilisateur);
    let inscription = this.authService.doPost(`${API_URLS.PROJET_URL}/${this.idProjetSelectionner}/${API_SOUS_URLS.PROJET_AJOUTER_COLLABORATEUR_SOUS_URL}`, body).subscribe(
      (projet :any) => {
        this.traitemenProjetOk = true;
        console.log(projet.nomProjet, projet);
        //Remise en cache du projet retourné par le BO
        this.utilisateur.nomProjets.push(projet.nomProjet);
        // Permet d'appliquer un traitement (ici appliquer une valeur) au bout de Xms 
        setTimeout(() => {
          this.traitemenProjetOk = null;
        }, CommunService.timeOutMessage);
        
      },
      (error :any) => {
        console.error('Erreur lors de la requête :', error);
        this.traitemenProjetOk = false;
      }
    );
    this.listeInscription.push(inscription);
  }
}

  /**
   * Lors de la destruction du composant on vide les ressources que l'on a alloué à ce composant et on se désinscrit des evenements
   */
  ngOnDestroy(){
    CommunService.ngOnDestroy(this.listeInscription);
  }

  /**
   * Mettre à jour les informations personnelles d'un utilisateur.
   */
  majUser(){
    //D'abord on met à jour les informations utilisateurs
      let inscription = this.authService.doPatch(`${API_URLS.USER_URL}/${this.utilisateur.id}`, this.utilisateur).subscribe(
        (response :any) => {
          // L'association de l'équipe se base sur les informations utilisateurs, on a donc besoin que la màj du user soit effectué avant de demandé la màj de l'équipe
          this.associerEquipe();
          this.majUtilisateur = true;
          // Permet d'appliquer un traitement au bout de Xms 
          setTimeout(() => {
            // Refresh de page et donc re-récupération des informations
            // Fais ici juste pour savoir comment faire la bonne pratique serait de récupérer les infos et de remettre à jour les données côté front (si possible sans appel GET puisque les POST retourne les objets cf associerProjet())
            // Cependant, dans ce cas-ci on serait obliger de rappeler le GET pour l'équipe, le POST ne retourne pas l'objet equipe
            location.reload();
          }, CommunService.timeOutMessage);
        },
        (error :any) => {
          console.error('Erreur lors de la requête :', error);
          this.majUtilisateur = false;
        }
      );
      this.listeInscription.push(inscription);
      // L'association à un projet n'est pas dépendante de la màj du user
      this.associerProjet();
    }

    /**
     * Supprime l'utilisateur courant 
     */
    deleteUser(){
      CommunService.deleteUser(this.utilisateur.id, this.authService).subscribe(
        (response :any) => {
          this.traitementSuppressionOk = true;
        },
        (error :any) => {
          console.error('Erreur lors de la requête :', error);
          this.traitementSuppressionOk = false;
        }
      );
    }

}
