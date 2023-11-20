import { UtilisateurComplet } from './UtilisateurComplet';
import { UtilisateurSimple } from './UtilisateurSimple';

export class Equipe {
    id: number = -1;
    description: string= '';
    emplacement: string= '';
    listeUtilisateur: Array<UtilisateurSimple> = new Array<UtilisateurSimple>();
    dateCreation: Date | null = null;
    chefEquipe: UtilisateurComplet | null = null;
}