import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { API_SOUS_URLS, API_URLS } from 'src/app/constants';
import { Projet } from 'src/app/modele/Projet';
import { UtilisateurSimple } from 'src/app/modele/UtilisateurSimple';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-projet-list',
  templateUrl: './projet-list.component.html',
  styleUrls: ['./projet-list.component.css']
})
export class ProjetListComponent {
  
  listeProjet : Array<Projet> = new Array<Projet>();

  private listeInscription : Array<Subscription> = new Array<Subscription>();

  constructor(authService : AuthService) {

    let inscriptionHttpProjet = authService.doGet(API_URLS.PROJET_URL).subscribe ((donneeProjet : any) => {
      if (donneeProjet[0]){
        donneeProjet.forEach((projet : any) => {
          let projetCourant = new Projet();
          projetCourant.id = projet.id;
          projetCourant.entreprise = projet.entreprise;
          projetCourant.nomProjet = projet.nomProjet
          this.listeProjet.push(projetCourant);
          console.log(donneeProjet);
          //Pour chaque projet, on récupère l'ensemble des collaborateurs (/projet/{id}/collaborateurs)
          let inscriptionHttpCollabo = authService.doGet(`${API_URLS.PROJET_URL}/${projet.id}${API_SOUS_URLS.PROJET_COLLABORATEUR_SOUS_URL}`).subscribe ((donneeUtilisateur : any) => {
            console.log(donneeUtilisateur);
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
      this.listeInscription.forEach((inscription : Subscription)=> {
        inscription.unsubscribe();
      });
    }

}
