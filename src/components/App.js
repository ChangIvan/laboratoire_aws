import { withAuthenticator } from "@aws-amplify/ui-react";
import React, { useState, useEffect } from 'react';
import { getRecettes, createRecette, deleteRecette, updateRecette, createOrUpdateRecetteAvecImage } from '../services/api';
import Popup from './popup/Popup';

function App({signOut}) {

  const [recettes, setRecettes] = useState([]);
  const [error, setError] = useState(null);
  const [btnPopup, setBtnPopup] = useState(false);
  const [btnPopup2, setBtnPopup2] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    async function fetchRecettes() {
      try {
        const recettes = await getRecettes();
        setRecettes(recettes);
      } catch (error) {
        setError(error);
      }
    }

    fetchRecettes();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  async function addRecetteSubmitHandler(event) {
    event.preventDefault();
    
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    const newRecette = {
      id: data.id,
      nom: data.nom,
    };

    createRecette(newRecette);
  }
 
  const supprimer = (id) => {
    deleteRecette(id);
  } 

  async function modifierRecetteSubmitHandler(event) {
    event.preventDefault();
    
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    const newRecette = {
      id: id,
      nom: data.nom,
    };

    updateRecette(newRecette);
  }


  return ( 
    <div className="App"> 
      <h1>Recettes</h1>
      <ul> 
        {recettes.map(recette => ( 
          <div>
            <li key={recette.id}>{recette.nom}</li> 
            <button onClick={() => supprimer(recette.id)}>Supprimer</button> 
            <button onClick={() => {(btnPopup2 ? setBtnPopup2(false) : setBtnPopup2(true)); setId(recette.id)}}>Modifier</button> 
          </div>
        ))}
      </ul>
      <button onClick={signOut}>Sign out</button> 

      <button onClick={() => (btnPopup ? setBtnPopup(false) : setBtnPopup(true))}>Ajouter une recette</button> 

      <Popup trigger={btnPopup} setTrigger={setBtnPopup} type="info">
            <form onSubmit={addRecetteSubmitHandler}>
              <label>Id</label>
              <input type="id" name="id"></input>
              <label>Nom de la recette</label>
              <input type="nom" name="nom"></input>
              <button type="submit">Ajouter</button>
            </form>
      </Popup>

      <Popup trigger={btnPopup2} setTrigger={setBtnPopup2} type="info">
            <form onSubmit={modifierRecetteSubmitHandler}>
              <label>Nom de la recette</label>
              <input type="nom" name="nom"></input>
              <button type="submit">Modifier</button>
            </form>
      </Popup>

    </div> 
  );
}

export default withAuthenticator(App);


