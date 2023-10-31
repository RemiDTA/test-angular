import { UtilisateurComplet } from './UtilisateurComplet';
import { UtilisateurSimple } from './UtilisateurSimple';

export class Equipe {
    id: number = 0;
    description: string= '';
    emplacement: string= '';
    listeUtilisateur: Array<UtilisateurSimple> = new Array<UtilisateurSimple>();
    dateCreation: Date = new Date();
    chefEquipe: UtilisateurComplet = new UtilisateurComplet();
}