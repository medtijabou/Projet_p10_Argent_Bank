import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api/v1/user";

//Fonction pour connecter un utilisateur.
//Envoie une requête POST avec l'email et le mot de passe à l'API.
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password,
    });
    return response;
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    throw error;
  }
};

//Fonction pour récupérer le profil de l'utilisateur connecté.
//Envoie une requête GET à l'API avec un token d'authentification.
export const getUserProfile = async (token) => {
  if (!token) throw new Error("Token manquant");
  try {
    const response = await axios.get(`${API_BASE_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Erreur lors de la récupération du profil:", error);
    throw error;
  }
};
//Fonction pour mettre à jour le nom d'utilisateur.
//Envoie une requête PUT avec le nouveau nom d'utilisateur à l'API.
export const updateUserName = async (token, newUserName) => {
  if (!token) throw new Error("Token manquant");
  try {
    const response = await axios.put(
      `${API_BASE_URL}/profile`,
      { username: newUserName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du nom d'utilisateur:", error);
    throw error;
  }
};
//Fonction pour récupérer les comptes de l'utilisateur.
//Envoie une requête GET à l'API en fournissant un token d'authentification.
export const getUserAccounts = (token) => {
  return axios.get("/api/user/accounts", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};