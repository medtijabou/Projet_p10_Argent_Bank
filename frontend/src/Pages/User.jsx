import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../api/userAPI"; // Adapté selon ton dossier

function User() {
  const [user, setUser] = useState(null); // Stocker les données de l'utilisateur
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authtoken"); // Récupère le token depuis localStorage

    if (!token) {
      navigate("/signin"); // Redirige si l'utilisateur n'est pas connecté
    } else {
      const fetchUserData = async () => {
        try {
          const data = await getUserProfile(token); // Appel API pour récupérer les infos de l'utilisateur
          setUser(data.body); // Mise à jour de l'état avec les informations récupérées
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
          setError("Impossible de récupérer les informations de l'utilisateur");
        }
      };

      fetchUserData();
    }
  }, [navigate]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back<br />{user.firstName} {user.lastName}!
        </h1>
        <button className="edit-button">Edit Name</button>
      </div>

      <h2 className="sr-only">Accounts</h2>

      {/* Vérifier que user.accounts est un tableau avant de tenter d'appeler .map() */}
      {Array.isArray(user.accounts) && user.accounts.length > 0 ? (
        user.accounts.map((account) => (
          <section className="account" key={account.id}>
            <div className="account-content-wrapper">
              <h3 className="account-title">{account.name} ({account.id})</h3>
              <p className="account-amount">${account.balance}</p>
              <p className="account-amount-description">{account.description}</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
        ))
      ) : (
        <p>No accounts available</p> // Message affiché si aucun compte n'est disponible
      )}
    </main>
  );
}

export default User;
