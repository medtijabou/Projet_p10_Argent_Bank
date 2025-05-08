import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../redux/slices/authSlice"; // adapte selon ton chemin
import { loginUser } from "../api/auth"; // crée cette fonction dans ton dossier API
import "../Style/index.scss";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Veuillez remplir tous les champs");
      setTimeout(() => setErrorMessage(""), 4000);
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Le mot de passe doit contenir au moins 6 caractères");
      setTimeout(() => setErrorMessage(""), 4000);
      return;
    }

    try {
      const response = await loginUser(email, password); // API POST
      const token = response.data.body.token;

      if (response.status === 200) {
        localStorage.setItem("authtoken", token);
        dispatch(loginSuccess({ token }));
        navigate("/user");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Identifiants incorrects.");
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
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Se souvenir de moi</label>
          </div>
          {errorMessage && <p className="error">{errorMessage}</p>}
          <button type="submit" className="sign-in-button">Se connecter</button>
        </form>
      </section>
    </main>
  );
};

export default SignIn;
