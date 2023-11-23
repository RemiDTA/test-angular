import { Component, EventEmitter, Output, Input } from '@angular/core';
import { API_URLS, TYPE_SELECTION } from 'src/app/constants';
import { AuthService } from 'src/app/service/auth.service';
import DataSource from 'devextreme/data/data_source';
import { CommunService } from 'src/app/service/commun.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.css']
})
export class SelectUserComponent {

  listeUtilisateurs: DataSource | null = null;

  @Output() eventListeIdUtilisateurSelectionner : EventEmitter<number[]> = new EventEmitter<number[]>();

  private listeInscription : Array<Subscription> = new Array<Subscription>();

  utilisateurSelectionner : any[] = [];

  /**
   * Type de selection au niveau des utilisateurs, permet de choisir en single et multiple (avec case à coché) en fonction du contexte
   */
  @Input() typeSelection : any = TYPE_SELECTION.MULTIPLE;

  /**
   * Label qui sera écrit à gauche de la selection des utilisateurs
   */
  @Input() label : string | null = null;

  constructor(private authService : AuthService){
  }

  ngOnInit(){
    let inscriptionHttp = this.authService.doGet(API_URLS.USER_URL).subscribe((donneeUtilisateur : any) => {
      this.listeUtilisateurs = new DataSource({
        store: donneeUtilisateur,
        key: "id"
    });
    },
      (error : any) => {
        console.error('Erreur de la requête :', error);
      }
    );
    this.listeInscription.push(inscriptionHttp);
  }

  /**
   * Lors de la destruction du composant on vide les ressources que l'on a alloué à ce composant et on se désinscrit des evenements
   */
  ngOnDestroy(){
    CommunService.ngOnDestroy(this.listeInscription);
  }

  modificationSelection(evenement : any){
    this.eventListeIdUtilisateurSelectionner.emit(this.utilisateurSelectionner);
  }
}
