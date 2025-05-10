// redux/actions.js

// Action pour définir l'utilisateur connecté
export const setUser = (user) => {
    return {
      type: 'SET_USER',
      payload: user,  // On passe l'utilisateur comme payload dans l'action
    };
  };
  
  // Action pour déconnecter l'utilisateur
  export const logOut = () => {
    return {
      type: 'LOG_OUT',  // L'action qui met à jour l'état pour supprimer l'utilisateur
    };
  };
  