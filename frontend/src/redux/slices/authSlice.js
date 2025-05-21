import { createSlice } from "@reduxjs/toolkit";
// État initial du slice auth : contient les infos utilisateur et le token d'authentification
const initialState = {
  user: {
    firstName: "",
    lastName: "",
    userName: "",
  },
  token: null,// Token d'authentification (JWT en général)
};
// Création du slice auth avec createSlice
const authSlice = createSlice({
  name: "auth",// Nom du slice, utilisé pour identifier les actions dans Redux DevTools
  initialState,// L'état initial défini ci-dessus
  reducers: {
    /**
     * loginSuccess : appelée après une connexion réussie
     * Met à jour l'état avec les infos utilisateur et le token
     */
    loginSuccess(state, action) {
      state.user = {
        firstName: action.payload.user.firstName || "",
        lastName: action.payload.user.lastName || "",
        userName: action.payload.user.userName || "",
      };
      state.token = action.payload.token;// Stocke le token JWT
     /**
     * updateUser : permet de mettre à jour les données utilisateur dans le store
     * (utile après modification du profil par l'utilisateur)
     */
    },
    updateUser(state, action) {
      if (state.user) {
        state.user.firstName = action.payload.firstName || state.user.firstName;
        state.user.lastName = action.payload.lastName || state.user.lastName;
        state.user.userName = action.payload.userName || state.user.userName;
      }
    },
    
    /**
    * logout : réinitialise l’état en supprimant l’utilisateur et le token
    * (utilisé lors de la déconnexion)
    */
    logout(state) {
      state.user = { firstName: "", lastName: "", userName: "" };
      state.token = null;
    },
  },
});
// Export des actions générées automatiquement par createSlice
export const { loginSuccess, logout, updateUser } = authSlice.actions;
// Export du reducer pour l’intégrer dans le store
export default authSlice.reducer;
