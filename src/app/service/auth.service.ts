import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { r3JitTypeSourceSpan } from '@angular/compiler';
import { HttpHeaders } from '@angular/common/http';
import { API_URLS } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
/**
 * Constructeur contenant les injections nécessaire à son utilisation :
 * HttpClient => gestion des requêtes
 * CookieService => gestion des cookie
 */
  constructor(private http: HttpClient) {}

  /**
   * Méthode permettant la connexion au BO
   * 
   * @param username 
   * @param password 
   */
  login(username: string, password: string) {

    //Headers nécessaire pour faire de la connexion basic auth
    let httpOptions = this.creerHeaderBasicAuth(username, password);

    // Envoyez la demande POST vers l'URL de connexion
    let retour = this.http.post(API_URLS.LOGIN_URL, {}, httpOptions);
    return retour;
  }

  /**
   * Méthode générique permettant de réalisé un GET sur une URL en passée en paramètre.
   * @param url 
   */
  doGet(url : string) {
    let resultat = this.http.get(url);
    return resultat;
  }

  /**
   * Méthode générique permettant de réalisé un POST sur une URL en passée en paramètre avec le body passé en paramètre
   * @param url 
   * @param body
   */
  doPost(url : string, body : any) {
    console.log(url, body);
    let resultat = this.http.post(url, body);
    return resultat;
  }



  /**
   * Génère le header pour le basic auth (encodage base 64 de username et password)
   * N'est pas utilisé à cause de vérification de sécurité CORS (lorsque j'essaie de mettre les vérifications de rôles, la configuration CORS que j'ai mise en place côté server ne fonctionne pas)
   */
  creerHeaderBasicAuth(username: string, password: string){
    //Headers nécessaire pour faire de la connexion basic auth
    return {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(username + ':' + password)
      })
    };
  }


}
