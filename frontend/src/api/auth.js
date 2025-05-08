import axios from "axios";

const API_URL = "http://localhost:3001/api/v1";

export const loginUser = async (email, password) => {
  try {
    // Envoi de la requête POST à l'API pour la connexion
    const response = await axios.post(`${API_URL}/user/login`, {
      email,
      password,
    });
    return response;
  } catch (error) {
    // Gestion des erreurs
    console.error(error.response?.data);
    throw error;
  }
};
