import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

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
    * Reedirige vers l'url passé en paramètre au bout de #CommunService.timeOutMessage ms
    * 
    * @param router 
    * @param url 
    */
  static rediriger(router : Router, url : string){
    setTimeout(() => {
    router.navigate([url]);
    }, CommunService.timeOutMessage);
  }
}
