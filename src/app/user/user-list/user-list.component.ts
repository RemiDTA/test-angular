import { Component } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import { API_URLS } from '../../constants';
import {UtilisateurSimple} from '../../modele/UtilisateurSimple';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

  doitToutAfficher : boolean = true;

  private listeInscription : Array<Subscription> = new Array<Subscription>();

  listeUtilisateur : Array<UtilisateurSimple> = new Array<UtilisateurSimple>();

  affichageComplet(doitToutAfficher : boolean){
    this.doitToutAfficher = doitToutAfficher;
  }

  constructor(authService : AuthService){
    let inscriptionHttp = authService.doGet(API_URLS.USER_URL).subscribe ((donneeUtilisateur : any) => {
      if (donneeUtilisateur[0]){
        donneeUtilisateur.forEach((element : any) => {
          let utilisateurCourant = new UtilisateurSimple();
          utilisateurCourant.email = element.email;
          utilisateurCourant.id = element.id;
          this.listeUtilisateur.push(utilisateurCourant);
        });
      }
      console.log(donneeUtilisateur);
    },
      (error : any) => {
        console.error('Erreur de la requête :', error);
      }
    );
  }

}
