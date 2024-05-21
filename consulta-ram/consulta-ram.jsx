import React, { useEffect, useState } from "react";

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
          <p>{personagem.name}</p>
          <p>Gênero: {personagem.gender}</p>
          <img src={personagem.image} alt={personagem.name} />
        </div>
      ))}
    </>
  );
}

export default ConsultaRAM;
