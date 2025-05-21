import React, { useState } from "react";
import { useDispatch } from "react-redux"; // Pour envoyer une action au store Redux
import { useNavigate } from "react-router-dom"; // Pour rediriger après la connexion
import { loginSuccess } from "../redux/slices/authSlice"; // Action Redux pour enregistrer le login
import { loginUser, getUserProfile } from "../api/auth"; // Appels API pour se connecter et récupérer le profil


import "../Style/index.scss";

const SignIn = () => {
 // État local pour stocker l'e-mail, le mot de passe et un message d'erreur
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();// Permet d'envoyer des actions à Redux
  const navigate = useNavigate();// Permet de naviguer vers une autre route
 // l'authentification de l'utilisateur
  const handleSubmit = async (e) => {
    e.preventDefault();// Empêche le rechargement de la page

// Vérifie si les champs sont bien remplis
    if (!email || !password) {
      setErrorMessage("Veuillez remplir tous les champs");
      setTimeout(() => setErrorMessage(""), 4000);
      return;
    }
     // Envoie la requête de login à l'API
    try {
      const response = await loginUser(email, password);
      console.log("Réponse de l'API de connexion:", response.data);

      const token = response.data.body.token;
      if (!token) {
        setErrorMessage("Aucun token trouvé dans la réponse.");
        setTimeout(() => setErrorMessage(""), 4000);
        return;
      }
      // Stocke le token et l'heure de connexion dans le localStorage
      localStorage.setItem("authToken", token);
      localStorage.setItem("loginTime", Date.now()); 
       // Récupère les informations du profil utilisateur via le token
      const profileResponse = await getUserProfile(token);
      const user = profileResponse.data.body;

      dispatch(loginSuccess({ user, token }));
      // Redirige l'utilisateur vers son profil
      navigate("/UserProfile");
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      setErrorMessage("Identifiants incorrects.");
      //effacer automatiquement le message d'erreur au bout de 4 secondes (4000 ms).
      setTimeout(() => setErrorMessage(""), 4000);
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">User name</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {errorMessage && <p className="error">{errorMessage}</p>}
          <button type="submit" className="sign-in-button">Sign In</button>
        </form>
      </section>
    </main>
  );
};

export default SignIn;
