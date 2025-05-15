import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserName as updateUserNameAPI, getUserProfile } from "../api/auth";
import { updateUserName as updateUserNameAction } from "../redux/slices/authSlice";

const EdiUser = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const [username, setUsername] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [newUsername, setNewUsername] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) return console.error("Token manquant");
      try {
        const res = await getUserProfile(token);
        const userNameFromAPI = res.data.body.userName || res.data.body.firstName;
        setUsername(userNameFromAPI);
        setNewUsername(userNameFromAPI);
      } catch (error) {
        console.error("Erreur de chargement du profil:", error);
      }
    };

    fetchProfile();
  }, [token]);

  const handleEditClick = () => setEditMode(true);

  const handleSaveClick = async () => {
    try {
      const res = await updateUserNameAPI(token, newUsername);
      const updatedUserName = res.data.body.userName || newUsername;
      setUsername(updatedUserName);
      setEditMode(false);

      // Mise à jour Redux pour que Navbar soit à jour aussi
      dispatch(updateUserNameAction(updatedUserName));

      // Si tu veux, tu peux aussi mettre à jour localStorage user ici
      // ou faire un refresh complet de profil pour être sûr que tout est synchro
    } catch (error) {
      console.error("Erreur lors de la mise à jour du nom d'utilisateur:", error);
    }
  };

  return (
    <div className="profile">
      <h1>Welcome back</h1>
      {editMode ? (
        <>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h2>{username}</h2>
          <button onClick={handleEditClick}>Edit</button>
        </>
      )}
    </div>
  );
};

export default EdiUser;
