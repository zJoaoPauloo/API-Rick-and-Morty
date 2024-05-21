// ConsultaRAM.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ConsultaRAM() {
  const [personagens, setPersonagens] = useState([]);

  useEffect(() => {
    console.log('consulta API');
    fetch('https://rickandmortyapi.com/api/character')
      .then((resposta) => resposta.json())
      .then((resultadoConsulta) => {
        setPersonagens(resultadoConsulta.results);
      });
  }, []);

  return (
    <>
      {personagens.map((personagem, index) => (
        <div key={index}>
          <Link to={`/detalhe/${personagem.id}`}>
            <p>{personagem.name}</p>
            <p>Gênero: {personagem.gender}</p>
            <img src={personagem.image} alt={personagem.name} />
          </Link>
        </div>
      ))}
    </>
  );
}

export default ConsultaRAM;

