import React, { useState } from 'react';

function Contador() {
  const [numero, setNumero] = useState(0);
  const [posicaoX, setPosicaoX] = useState(0);
  const [posicaoY, setPosicaoY] = useState(0);

  const contar = () => {
    setNumero(numero + 1);
  };

  const zerarNumero = () => {
    setNumero(0);
  };

  const handleMouseEnter = () => {
    const novoX = Math.random() * (window.innerWidth - 100);
    const novoY = Math.random() * (window.innerHeight - 100);
    setPosicaoX(novoX);
    setPosicaoY(novoY);
  };

  return (
    <>
      <button onClick={contar}>Contar</button>
      <button
        onClick={zerarNumero}
        onMouseEnter={handleMouseEnter}
        style={{ position: 'absolute', left: posicaoX + 120, top: posicaoY }}
      >
        Zerar Número
      </button>
      {numero}
    </>
  );
}

export default Contador;
