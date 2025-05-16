import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserAccounts } from "../api/accounts";
import { updateUser } from "../redux/slices/authSlice";
import "../Style/index.scss";

const UserProfile = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const [accounts, setAccounts] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newUserName, setNewUserName] = useState("");

  useEffect(() => {
    if (!token) return;
    getUserAccounts().then((data) => setAccounts(data));
  }, [token]);

  useEffect(() => {
    if (user) {
      setNewFirstName(user.firstName || "");
      setNewLastName(user.lastName || "");
      setNewUserName(user.userName || "");
    }
  }, [user]);

  if (!user) return <p>Chargement du profil...</p>;

  const handleEditClick = () => setIsEditing(true);

  const handleSaveClick = () => {
    if (!newFirstName.trim() || !newLastName.trim() || !newUserName.trim()) {
      alert("Tous les champs sont obligatoires.");
      return;
    }

    dispatch(
      updateUser({
        firstName: newFirstName.trim(),
        lastName: newLastName.trim(),
        userName: newUserName.trim(),
      })
    );

    setIsEditing(false);
  };

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
