import { UtilisateurSimple } from './UtilisateurSimple'

export class UtilisateurComplet extends UtilisateurSimple{
    nom: string ='';
    prenom: string = '';
    telephone : string= '';
    equipe : string =''; // Contient la description de l'équipe
    nomProjets : Array<string> = new Array<string>(); // Contient la liste des noms de projets dont l'utilisateur fait partit
  }