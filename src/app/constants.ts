// URL relative au proxy ou absolue au server
export const URL_GLOBALE = {
    URL_COMPLETE_BO : 'http://localhost:8080',
    URL_PROXY : '/proxy',
  };

  // Sous ensemble d'URL
  export const API_SOUS_URLS = {
    LOGIN_SOUS_URL : `/login`,
    USER_SOUS_URL : `/user`,
    TEAM_SOUS_URL: `/team`,
    PROJET_SOUS_URL: `/projet`,
    PROJET_COLLABORATEUR_SOUS_URL : `/collaborateurs`,
    PROJET_AJOUTER_COLLABORATEUR_SOUS_URL: `ajouterCollaborateurs`,
    PROJET_AJOUTER_COLLABORATEUR_EQUIPE_SOUS_URL: `ajouterCollaborateursEquipe`,
    USER_ASSOCIER_EQUIPE_SOUS_URL: `associer_equipe`,
}

  // Pour pouvoir créer une constante à partir d'une autre constante il faut que l'autre constante soit défini (il semble qu'il fonctionne par bloc plutôt que de haut en bas, c'est nul !)
export const API_URLS = {
    LOGIN_URL : `${URL_GLOBALE.URL_PROXY}${API_SOUS_URLS.LOGIN_SOUS_URL}`,
    USER_URL : `${URL_GLOBALE.URL_PROXY}${API_SOUS_URLS.USER_SOUS_URL}`,
    TEAM_URL: `${URL_GLOBALE.URL_PROXY}${API_SOUS_URLS.TEAM_SOUS_URL}`,
    PROJET_URL: `${URL_GLOBALE.URL_PROXY}${API_SOUS_URLS.PROJET_SOUS_URL}`,
}

export const URL_FRONT = {
  HOME :  '',
  USER : 'user',
  LOGIN : 'login',
  PROJET : 'projet',
  TEAM : 'team'
}

