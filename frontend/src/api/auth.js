import axios from "axios";

export const loginUser = (email, password) => {
  return axios.post("http://localhost:3001/api/v1/user/login", {
    email,
    password,
  });
};



export const getUserProfile = async (token) => {
  try {
    const response = await axios.get('http://localhost:3001/api/v1/user/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    throw error;
  }
};
