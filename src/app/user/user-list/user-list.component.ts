import { Component, Input } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import { API_URLS } from '../../constants';
import {UtilisateurSimple} from '../../modele/UtilisateurSimple';

import { Subscription } from 'rxjs';
import { CommunService } from 'src/app/service/commun.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

  doitToutAfficher : boolean = true;

  private listeInscription : Array<Subscription> = new Array<Subscription>();

  /**
   * Le @Input() permet de récupérer des information depuis un composant parent
   * Cette variable permet de determiner si ce composant est appeler par un parent qui va remplir la variable listeUtilisateur
   * NB : On pourrait vérifier si listeUtilisateur est vide alors on charge tout, mais dans le cas où le composant parent n'a pas d'utilisateur à charger, 
   * on aurait une liste vide et on ne doit du coup pas charger la liste des utilisateurs
   */
  @Input() doitRecupererTousUtilisateurs : boolean = true;

  @Input() listeUtilisateur : Array<UtilisateurSimple> = new Array<UtilisateurSimple>();

  authService : any = null;

  affichageComplet(doitToutAfficher : boolean){
    this.doitToutAfficher = doitToutAfficher;
  }

  constructor(authService : AuthService){
    this.authService = authService;
  }

  ngOnInit() {
    if (this.doitRecupererTousUtilisateurs) {
    let inscriptionHttp = this.authService.doGet(API_URLS.USER_URL).subscribe ((donneeUtilisateur : any) => {
      if (donneeUtilisateur[0]){
        donneeUtilisateur.forEach((utilisateurHttp : any) => {
          let utilisateurCourant = new UtilisateurSimple();
          utilisateurCourant.email = utilisateurHttp.email;
          utilisateurCourant.id = utilisateurHttp.id;
          this.listeUtilisateur.push(utilisateurCourant);
        });
      }
    },
      (error : any) => {
        console.error('Erreur de la requête :', error);
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
