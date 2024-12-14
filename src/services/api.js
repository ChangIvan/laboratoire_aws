
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

export const createOrUpdateRecetteAvecImage = async (recette, image) => {
  const formData = new FormData();
  formData.append('id', recette.id);
  formData.append('nom', recette.nom);
  if (image) {
    formData.append('imageName', image.name);
    formData.append('file', image);
  }


  const response = await axios.put(`${API_URL}/recettes`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}

const imageToBase64 = (image) => { 
  return new Promise((resolve, reject) => { 
    const reader = new FileReader(); 
    reader.readAsDataURL(image); 
    reader.onload = () => resolve(reader.result.split(',')[1]); 
    reader.onerror = error => reject(error); 
  }); 
};
