import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";// Pour accéder au store Redux et dispatcher des actions
import { getUserAccounts } from "../api/accounts";// Fonction API pour récupérer les comptes utilisateur
import { updateUser } from "../redux/slices/authSlice";// Action Redux pour mettre à jour l'utilisateur
import "../Style/index.scss";

const UserProfile = () => {
  const dispatch = useDispatch();
  // Récupère l'utilisateur et le token depuis Redux
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  // État local pour stocker la liste des comptes de l'utilisateur
  const [accounts, setAccounts] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newUserName, setNewUserName] = useState("");
  // useEffect pour récupérer les comptes utilisateur dès que le token est disponible
  useEffect(() => {
    if (!token) return;// Si pas de token, ne fait rien
    // Appel API pour récupérer les comptes puis stockage dans l'état local
    getUserAccounts().then((data) => setAccounts(data));
  }, [token]);
  // useEffect pour initialiser les champs modifiables dès que les données utilisateur changent
  useEffect(() => {
    if (user) {
      setNewFirstName(user.firstName || "");
      setNewLastName(user.lastName || "");
      setNewUserName(user.userName || "");
    }
  }, [user]);

  if (!user) return <p>Chargement du profil...</p>;
  // Fonction déclenchée au clic sur "Edit Name" pour activer le mode édition
  const handleEditClick = () => setIsEditing(true);
// Fonction déclenchée au clic sur "Save" pour sauvegarder les modifications
  const handleSaveClick = () => {
    // Validation : aucun champ ne doit être vide
    if (!newFirstName.trim() || !newLastName.trim() || !newUserName.trim()) {
      alert("Tous les champs sont obligatoires.");
      return;
    }
    // Validation : aucun champ ne doit être vide
    dispatch(
      updateUser({
        firstName: newFirstName.trim(),
        lastName: newLastName.trim(),
        userName: newUserName.trim(),
      })
    );

    setIsEditing(false);
  };
    // Fonction déclenchée au clic sur "Cancel" pour annuler les modifications et revenir aux valeurs initiales
  const handleCancelClick = () => {
    setNewFirstName(user.firstName || "");
    setNewLastName(user.lastName || "");
    setNewUserName(user.userName || "");
    setIsEditing(false);
  };

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {isEditing ? (
            <>
            <section className="input_user">
                
              <input
                type="text"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                placeholder="Username"
              />
              <input
                type="text"
                value={newFirstName}
                readOnly
                placeholder="First Name"
            
              />
              <input
                type="text"
                value={newLastName}
               readOnly
                placeholder="Last Name"
               
              />
            </section>
            </>
          ) : (
            <>
              {user.firstName} {user.lastName}
              {user.userName ? ` (${user.userName})` : ""}
            </>
          )}
          
        </h1>
         {/* Affiche les boutons d'action selon le mode édition ou non */}
        {isEditing ? (
          <>
            <button onClick={handleSaveClick} className="edit-button">
              Save
            </button>
            <button onClick={handleCancelClick} className="edit-button cancel">
              Cancel
            </button>
          </>
        ) : (
          <button onClick={handleEditClick} className="edit-button">
            Edit Name
          </button>
        )}
      </div>

      <h2 className="sr-only">Accounts</h2>
      {/* Affiche la liste des comptes sous forme de sections */}
      {accounts.map((account) => (
        <section className="account" key={account.id}>
          <div className="account-content-wrapper">
            <h3 className="account-title">
              {account.title} (x{account.number})
            </h3>
            <p className="account-amount">${account.balance.toFixed(2)}</p>
            <p className="account-amount-description">{account.description}</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      ))}
    </main>
  );
};

export default UserProfile;
