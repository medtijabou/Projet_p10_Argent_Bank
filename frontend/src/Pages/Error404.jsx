import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <main className="main bg-dark" style={{ padding: "4rem", textAlign: "center", color: "#fff" }}>
      <h1 style={{ fontSize: "6rem" }}>404</h1>
      <p style={{ fontSize: "1.5rem" }}>La page que vous recherchez n'existe pas.</p>
      <Link to="/" style={{ marginTop: "2rem", display: "inline-block", color: "#00bc77", textDecoration: "underline" }}>
        Retour à l'accueil
      </Link>
    </main>
  );
};

export default Error404;
