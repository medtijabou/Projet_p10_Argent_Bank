import axios from 'axios';

const API_URL = "http://localhost:3001/api/v1";

// Récupère les informations de l'utilisateur connecté
export const getUserProfile = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Contient les données de l'utilisateur
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error; // Relancer l'erreur si besoin
  }
};
