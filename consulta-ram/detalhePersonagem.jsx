import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DetalhePersonagem() {
  const { id } = useParams();
  const [personagem, setPersonagem] = useState(null);
  const [episodios, setEpisodios] = useState([]);
  const [episodioSelecionado, setEpisodioSelecionado] = useState(null);

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((resposta) => resposta.json())
      .then((dadosPersonagem) => {
        setPersonagem(dadosPersonagem);

        Promise.all(
          dadosPersonagem.episode.map((url) =>
            fetch(url).then((res) => res.json())
          )
        ).then((episodios) => setEpisodios(episodios));
      });
  }, [id]);

  const handleEpisodioClick = (episodio) => {
    setEpisodioSelecionado(episodio);
  };

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

      <h3>Episódios:</h3>
      <ul>
        {episodios.map((episodio) => (
          <li
            key={episodio.id}
            onClick={() => handleEpisodioClick(episodio)}
            style={{
              color:
                episodioSelecionado && episodioSelecionado.id === episodio.id
                  ? "red"
                  : "white",
              cursor: "pointer",
            }}
          >
            {episodio.name}
          </li>
        ))}
      </ul>

      {episodioSelecionado && (
        <div>
          <h3>Detalhes do Episódio Selecionado:</h3>
          <p>Nome: {episodioSelecionado.name}</p>
          <p>Episódio: {episodioSelecionado.episode}</p>
          <p>Data de Lançamento: {episodioSelecionado.air_date}</p>
        </div>
      )}
    </div>
  );
}

export default DetalhePersonagem;
