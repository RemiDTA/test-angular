import { Component } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import { API_URLS, API_SOUS_URLS } from '../../constants';
import { ActivatedRoute } from '@angular/router';
import { forkJoin , Subscription } from 'rxjs';
import {UtilisateurComplet} from '../../modele/UtilisateurComplet';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {

  private listeInscription : Array<Subscription> = new Array<Subscription>();

  userTrouver : boolean = true;

  utilisateur : UtilisateurComplet = new UtilisateurComplet();

constructor(private authService : AuthService, private route: ActivatedRoute){
  
  let inscription = this.route.params.subscribe((params : any) => {
    let idCourant = params['id'];
    
    //forkJoin permet de travailler sur plusieurs observable (comme c'est le cas pour les requêtes HTTP) puis de récupérer le résultat dans un tableau
    let inscriptionHttp = forkJoin([
      authService.doGet(`${API_URLS.USER_URL}/${idCourant}`),
      authService.doGet(`${API_URLS.USER_URL}/${idCourant}${API_SOUS_URLS.TEAM_SOUS_URL}`)
    ]).subscribe ((tableauDonnees : any) => {
        let donneeUtilisateur = tableauDonnees[0];
        let donneeEquipe = tableauDonnees[1];

        this.utilisateur.telephone = donneeUtilisateur.telephone;
        this.utilisateur.prenom = donneeUtilisateur.prenom;
        this.utilisateur.nom = donneeUtilisateur.nom;
        this.utilisateur.email = donneeUtilisateur.email;

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

        console.log('donneeUtilisateur :', donneeUtilisateur);
        console.log('donneeEquipe :', donneeEquipe);
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
 * Lors de la destruction du composant on vide les ressources que l'on a alloué à ce composant et on se désinscrit des evenements
 */
ngOnDestroy(){
  this.listeInscription.forEach((inscription : Subscription)=> {
    inscription.unsubscribe();
  });
}

}
