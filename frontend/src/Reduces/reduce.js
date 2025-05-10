// userReducer.js
const initialState = {
    user: null,  // L'utilisateur est initialement non connecté
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER':
        return {
          ...state,
          user: action.payload,  // On met à jour l'utilisateur connecté
        };
      case 'LOG_OUT':
        return {
          ...state,
          user: null,  // On déconnecte l'utilisateur
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  