import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { r3JitTypeSourceSpan } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  /** 
   * Addresse du BO (le front s'execute sur un port différent, il faut donc donner l'addresse complète)
  */
  private baseUrl ='/api';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    console.log("login", username, password);
    // Envoyez la demande POST vers l'URL de connexion
    let urlComplete = `v1/login`;
    console.log(urlComplete);
    let retour = this.http.post(urlComplete, { username, password });
    retour.subscribe(
      (data : any) => {
        // Gérer la réponse réussie ici
        console.log('Réponse de la requête POST :', data);
      },
      (error : any) => {
        // Gérer les erreurs ici
        console.error('Erreur de la requête POST :', error);
      }
    );
    console.log(retour, urlComplete);
    return retour;
  }
}
