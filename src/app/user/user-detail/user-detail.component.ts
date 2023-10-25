import { Component } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import { API_URLS } from '../../constants';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {

  private listeInscription : Array<Subscription> = new Array<Subscription>();

  userTrouver : boolean = false;

  telephone : string = '';

  prenom : string = '';

  nom : string = '';

  email : string = '';

  projet : string = '';

constructor(private authService : AuthService, private route: ActivatedRoute){
  
  let inscription = this.route.params.subscribe(params => {
    let idCourant = params['id'];
    let inscriptionHttp = authService.doGet(`${API_URLS.USER_URL}/${idCourant}`).subscribe(
      
      (data : any) => {
        this.telephone = data.telephone;
        this.prenom = data.prenom;
        this.nom = data.nom;
        this.email = data.email;
        //Ca n'a pas trop de sens fonctionnellement puisque ca ne respecte pas notre MDD vu qu'un user peut être associé à plusieurs projets
        if (data.projets[0]) {
          this.projet = data.projets[0].nomProjet;
        } else {
          this.projet = 'Aucun projet associé';
        }
        // Gérer la réponse réussie ici
        console.log('data :', data);
      },
      (error : any) => {
        this.userTrouver = false;
        // Gérer les erreurs ici
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
