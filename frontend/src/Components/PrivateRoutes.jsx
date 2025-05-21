import React from "react";
import { Navigate } from "react-router-dom";// Permet de rediriger l'utilisateur
import { useSelector } from "react-redux";// Permet d'accéder au state global Redux
//Composant de route privée.
//Il empêche l'accès aux pages protégées si l'utilisateur n'est pas authentifié.
const PrivateRoute = ({ children }) => {
 // Récupère le token d'authentification depuis le store Redux
  const tokenFromRedux = useSelector((state) => state.auth.token);
  // Récupère le token depuis le localStorage (persisté entre les sessions)
  const tokenFromStorage = localStorage.getItem("authToken");
  // Vérifie si un des deux tokens existe (Redux ou localStorage)
  const isAuthenticated = tokenFromRedux || tokenFromStorage;
  // Si l'utilisateur est authentifié, on affiche le composant demandé (children)
  return isAuthenticated ? children : <Navigate to="/" />;
  // Sinon, on redirige vers la page d'accueil ("/")
};

export default PrivateRoute;
