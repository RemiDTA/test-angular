import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /** 
   * Addresse du BO (le front s'execute sur un port différent, il faut donc donner l'addresse complète)
  */
  private static baseUrl ='http://localhost:8080';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    console.log("login", email, password);
    // Envoyez la demande POST vers l'URL de connexion
    return this.http.post('${this.baseUrl}/login', { email, password });
  }
}
