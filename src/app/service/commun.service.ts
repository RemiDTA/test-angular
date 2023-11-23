import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { API_URLS, URL_FRONT } from '../constants';

@Injectable({
  providedIn: 'root'
})
/**
 * A priori, on ne peut pas étendre des composants, on utilise donc ce service qui va gérer les traitements communs des composants
 */
export class CommunService {

  /**
   * Délai de timeout des messages (à voir si à terme ne pas déplacer dans un fichier de conf)
   */
  static timeOutMessage : number = 5000;

  constructor() { }

  /**
  * Lors de la destruction du composant on vide les ressources que l'on a alloué à ce composant et on se désinscrit des evenements
  */
 static ngOnDestroy(listeInscription : Array<Subscription>){
     listeInscription.forEach((inscription : Subscription)=> {
       inscription.unsubscribe();
     });
   }

   /**
    * Reedirige vers l'url passé en paramètre
    * 
    * @param router 
    * @param url 
    */
  static rediriger(router : Router, url : string){
    router.navigate([url]);
  }

  /**
   * Récupère une variable depuis le localStorage
   * @param nomVariable 
   */
  static recupererLocalStorage(nomVariable : string) {
    return localStorage.getItem(nomVariable);
  }

  /**
   * Vérifie si la variable existe dans le localStorage
   * @param nomVariable 
   */
  static existeDansLocalStorage(nomVariable : string) {
    return this.recupererLocalStorage(nomVariable) != null;
  }

  /**
   * Permet d'effectuer la suppression de l'utilisateur dont l'id est passé en paramètre
   * (Si on était sur un vrai projet j'aurais un gestionnaire pour les utilisateurs, je ne placerais pas un traitement métier/non générique dans un service commun)
   * @param userId 
   */
  static deleteUser(userId : number,authService : AuthService){
    return authService.doDelete(`${API_URLS.USER_URL}/${userId}`);
  }

  /**
   * Supprime d'un tableau la clef fournie en paramètre si celle-ci existe
   * 
   * @param tableau 
   * @param clef 
   */
  static suppressionTableauSiExiste(tableau : Array<any>, clef : any){
    let index = tableau.indexOf(clef);
    if (index > -1) {
      tableau.splice(index, 1);
    }
  }
}
