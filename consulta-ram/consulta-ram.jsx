import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ConsultaRAM() {
  const [personagens, setPersonagens] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    console.log('consulta API');
    fetch(`https://rickandmortyapi.com/api/character/?page=${currentPage}`)
      .then((resposta) => resposta.json())
      .then((resultadoConsulta) => {
        setPersonagens(resultadoConsulta.results);
        setTotalPages(resultadoConsulta.info.pages);
      });
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handlePageNumberClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    let pageNumbers = [];
    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      if (i < 1 || i > totalPages) continue;
      pageNumbers.push(
        <button 
          key={i} 
          onClick={() => handlePageNumberClick(i)}
          style={{ 
            backgroundColor: currentPage === i ? 'gray' : 'transparent',
            color: 'white'
          }}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

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
      <div>
        {currentPage > 1 && (
          <button onClick={handlePrevPage}>Páginas Anteriores</button>
        )}
        {renderPageNumbers()}
        {currentPage < totalPages && (
          <button onClick={handleNextPage}>Próximas Páginas</button>
        )}
      </div>
    </>
  );
}

export default ConsultaRAM;