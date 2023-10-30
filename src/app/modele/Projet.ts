import { UtilisateurSimple } from './UtilisateurSimple';

export class Projet {
    id: number = 0;
    entreprise: string= '';
    nomProjet: string= '';
    listeCollaborateurs: Array<UtilisateurSimple> = new Array<UtilisateurSimple>();
}