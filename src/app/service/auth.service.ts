import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { API_URLS } from '../constants';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

/**
 * Evenement permettant de renseigner le login de l'utilisateur connecté
 * Normalement je devrais utilisé des cookie et récupérer le JSESSIONID sauf que ce petit projet est sur une URL HTTP et non HTTPS et que ce cookie n'est pas accessible (sécurité toussa toussa)
 */
  private loginUtilisateurConnecterSubject = new BehaviorSubject<string>("");

  loginUtilisateurConnecter$: Observable<string> = this.loginUtilisateurConnecterSubject.asObservable();
  
/**
 * Constructeur contenant les injections nécessaire à son utilisation :
 * HttpClient => gestion des requêtes
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
    let httpOptions = this.creerHeaderBasicAuth();

    // Envoyez la demande POST vers l'URL de connexion (l'encodage URI est un parametrage gérer automatiquement par Spring Security)
    let retour = this.http.post(API_URLS.LOGIN_URL, encodeURI(`username=${username}&password=${password}`), httpOptions);
    return retour;
  }

  /**
   * Permet de notifier qu'il y a un utilisateur qui est connecté
   * @param isAuthenticated 
   */
  setLoginUtilisateurConnecter(login: string) {
    this.loginUtilisateurConnecterSubject.next(login);
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
   * Méthode générique permettant de réalisé un PATCH sur une URL en passée en paramètre avec le body passé en paramètre
   * @param url 
   * @param body
   */
  doPatch(url : string, body : any) {
    console.log(url, body);
    let resultat = this.http.patch(url, body);
    return resultat;
  }



  /**
   * Génère le header pour le basic auth
   */
  creerHeaderBasicAuth(){
    return {
      headers: new HttpHeaders({
        'Content-Type' : 'application/x-www-form-urlencoded'
      })
    };
  }
}
