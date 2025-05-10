import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess} from "../redux/slices/authSlice"; // ajoute setUser
import { loginUser, getUserProfile} from "../api/auth"; // crée cette fonction
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
  
    try {
      const response = await loginUser(email, password);
      const token = response.data.body.token;
  
      // ✅ Appel API pour récupérer les infos utilisateur
      const profileResponse = await getUserProfile(token);
      const user = profileResponse.data.body;
  
      if (response.status === 200) {
        localStorage.setItem("authtoken", token);
        dispatch(loginSuccess({ user, token }));
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
            <label htmlFor="email">User name</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
