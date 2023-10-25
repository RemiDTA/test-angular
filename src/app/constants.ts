export const URL_GLOBALE = {
    URL_COMPLETE_BO : 'http://localhost:8080',
    URL_PROXY : '/proxy',
  };

  // Pour pouvoir créer une constante à partir d'une autre constante il faut que l'autre constante soit défini (il semble qu'il fonctionne par bloc plutôt que de haut en bas, c'est nul !)
export const API_URLS = {
    LOGIN_URL : `${URL_GLOBALE.URL_COMPLETE_BO}/login`,
    USER_URL : `${URL_GLOBALE.URL_COMPLETE_BO}/user`,
    TEAM_URL: `${URL_GLOBALE.URL_COMPLETE_BO}/team`,
    PROJET_URL: `${URL_GLOBALE.URL_COMPLETE_BO}/projet`,
}