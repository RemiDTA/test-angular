export class Utilisateur {
    id: number = 0;
    nom: string ='';
    prenom: string = '';
    email: string= '';
    telephone : string= '';
    equipe : string =''; // Contient la description de l'équipe
    nomProjets : Array<string> = new Array<string>(); // Contient la liste des noms de projets dont l'utilisateur fait partit
  }