import { Injectable } from '@angular/core';
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
}
