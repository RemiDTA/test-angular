import { Component, Input } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import { API_URLS } from '../../constants';
import {UtilisateurSimple} from '../../modele/UtilisateurSimple';
import { ActivatedRoute } from '@angular/router';

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

  /**
   * permet de savoir si le composant doit réaliser de la pagination.
   * En effet, cela n'a aucun sens de faire de la pagination si le composant est appelé par un parent et que le parent fourni les données (à voir s'il existe d'autres cas)
   */
  doitGererPagination : boolean = false;

  pageCourante : number = -1;

  @Input() listeUtilisateur : Array<UtilisateurSimple> = new Array<UtilisateurSimple>();

  constructor(private authService : AuthService, private activatedRoute : ActivatedRoute){
  }

  ngOnInit() {
    if (this.doitRecupererTousUtilisateurs) {
      // Si on doit récupérer tous les utilisateurs, alors on fait de la pagination
      this.doitGererPagination = this.doitRecupererTousUtilisateurs;
      this.activatedRoute.queryParams.subscribe((params : any) =>
        {
          // On ne repasse pas par le ngOnInit en utilisant la même URL depuis la vue ([routerLink]="'/user'" [queryParams]="{pageDebut: ...}) même avec des querryParams différents
          // Ce qui veut dire que l'on peut tout à fait garder les données en cache et appeler le BO si nécessaire (ce qui nécessiterais d'avoir une liste des valeurs de querryParams par lesquels on serait déjà passé)
          // Ce n'était pas le but ici donc j'ai préférer refresh la liste des utilisateurs et rappeler le BO
          this.listeUtilisateur = new Array<UtilisateurSimple>();
          // Si on a pas de variable "pageCourante" dans l'URL, on considère que c'est 0
          this.pageCourante = (params[API_URLS.PAGINATION_PARAM]) ? Number(params[API_URLS.PAGINATION_PARAM]) : 0;
          let inscriptionHttp = this.authService.doGet(`${API_URLS.USER_URL}?${API_URLS.PAGINATION_PARAM}=${this.pageCourante}`).subscribe ((donneeUtilisateur : any) => {
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
          this.listeInscription.push(inscriptionHttp);
        })
      
    }
  }

  /**
   * Lors de la destruction du composant on vide les ressources que l'on a alloué à ce composant et on se désinscrit des evenements
   */
  ngOnDestroy(){
    CommunService.ngOnDestroy(this.listeInscription);
  }

}
