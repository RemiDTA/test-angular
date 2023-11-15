import { Component, EventEmitter, Output } from '@angular/core';
import { API_URLS } from 'src/app/constants';
import { AuthService } from 'src/app/service/auth.service';
import DataSource from 'devextreme/data/data_source';
import { CommunService } from 'src/app/service/commun.service';
import { Subscription } from 'rxjs';

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

  listeEquipe: DataSource | null = null;

  @Output() eventIdEquipeSelectionner:EventEmitter<number> = new EventEmitter<number>();

  private listeInscription : Array<Subscription> = new Array<Subscription>();

  constructor(private authService : AuthService){
  }

  ngOnInit(){
    let inscriptionHttp = this.authService.doGet(API_URLS.TEAM_URL).subscribe ((donneeEquipe : any) => {
      this.listeEquipe = new DataSource({
        store: donneeEquipe,
        key: "id"
    });
    },
      (error : any) => {
        console.error('Erreur de la requête :', error);
      }
    );
    this.listeInscription.push(inscriptionHttp);
  }

  selectionEquipe(evenement : any){
    this.eventIdEquipeSelectionner.emit(evenement.value);
  }

  /**
   * Lors de la destruction du composant on vide les ressources que l'on a alloué à ce composant et on se désinscrit des evenements
   */
  ngOnDestroy(){
    CommunService.ngOnDestroy(this.listeInscription);
  }
}
