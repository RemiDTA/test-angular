import { Component } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import { API_URLS, API_SOUS_URLS } from '../../constants';
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
   * Permet de gérer l'affichage des messages d'erreur concernant l'affectation du projet
   */
  traitemenProjettOk : boolean | null = null;

  idEquipeSelectionner : number | null = null;

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
  let bodyEquipe = new Equipe();
  if (this.idEquipeSelectionner) {
    bodyEquipe.id = this.idEquipeSelectionner;
    
    this.authService.doPatch(`${API_URLS.USER_URL}/${this.utilisateur.id}/${API_SOUS_URLS.USER_ASSOCIER_EQUIPE_SOUS_URL}`, bodyEquipe).subscribe(
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
  }
}

  /**
   * Lors de la destruction du composant on vide les ressources que l'on a alloué à ce composant et on se désinscrit des evenements
   */
  ngOnDestroy(){
    CommunService.ngOnDestroy(this.listeInscription);
  }

}
