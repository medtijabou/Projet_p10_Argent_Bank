import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api/v1/user";

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
