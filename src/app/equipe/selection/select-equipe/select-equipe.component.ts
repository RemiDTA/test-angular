import { Component, Output } from '@angular/core';
import { API_URLS } from 'src/app/constants';
import { AuthService } from 'src/app/service/auth.service';
import DataSource from 'devextreme/data/data_source';


@Component({
  selector: 'app-select-equipe',
  templateUrl: './select-equipe.component.html',
  styleUrls: ['./select-equipe.component.css']
})

/**
 * Ce lookup a été créer en utilisant une bibliothèque :
 * https://js.devexpress.com/Angular/Documentation/Guide/UI_Components/Lookup/Getting_Started_with_Lookup/
 */
export class SelectEquipeComponent {

  listeEquipe: DataSource;

  @Output() idEquipeSelectionner:number =0;

  constructor(authService : AuthService){
    this.listeEquipe = new DataSource({});
    let inscriptionHttp = authService.doGet(API_URLS.TEAM_URL).subscribe ((donneeEquipe : any) => {
      this.listeEquipe = new DataSource({
        store: donneeEquipe,
        key: "ID"
    });
    },
      (error : any) => {
        console.error('Erreur de la requête :', error);
      }
    );
  }

  selectionEquipe(evenement : any){
    this.idEquipeSelectionner = evenement.value;
  }
}
