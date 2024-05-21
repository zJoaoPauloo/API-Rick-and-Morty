import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DetalhePersonagem() {
  const { id } = useParams();
  const [personagem, setPersonagem] = useState(null);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((resposta) => resposta.json())
      .then((dadosPersonagem) => {
        setPersonagem(dadosPersonagem);
      });
  }, [id]);

  if (!personagem) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h2>{personagem.name}</h2>
      <p>Gênero: {personagem.gender}</p>
      <p>Espécie: {personagem.species}</p>
      <p>Status: {personagem.status}</p>
      <p>Localização: {personagem.location.name}</p>
      <p>Origem: {personagem.origin.name}</p>
      <img src={personagem.image} alt={personagem.name} />
    </div>
  );
}

export default DetalhePersonagem;