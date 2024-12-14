
import axios from 'axios';

const API_URL = 'https://govoky22r3.execute-api.us-east-2.amazonaws.com';

export const createRecette = async (recette) => {
  const response = await axios.put(`${API_URL}/recettes`, recette);
  return response.data;
};

export const getRecette = async (id) => {
  const response = await axios.get(`${API_URL}/recettes/${id}`);
  return response.data;
};

export const getRecettes = async () => {
    const response = await axios.get(`${API_URL}/recettes`);
    return response.data;
  };

export const updateRecette = async (recette) => {
  const response = await axios.put(`${API_URL}/recettes`, recette);
  return response.data;
};

export const deleteRecette = async (id) => {
  const response = await axios.delete(`${API_URL}/recettes/${id}`);
  return response.data;
};

