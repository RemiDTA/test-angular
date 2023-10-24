import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { r3JitTypeSourceSpan } from '@angular/compiler';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  /** 
   * Addresse du BO (le front s'execute sur un port différent, il faut donc donner l'addresse complète)
  */
  private baseUrl ='/proxy';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    console.log("login", username, password);

    //Headers nécessaire pour faire de la connexion basic auth
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(username + ':' + password)
      })
    };

    // Envoyez la demande POST vers l'URL de connexion
    let urlComplete = `${this.baseUrl}/login`;
    let retour = this.http.post(urlComplete, {}, httpOptions);
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
