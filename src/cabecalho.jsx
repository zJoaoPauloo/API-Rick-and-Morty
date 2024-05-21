import React from 'react';
import { Link, Outlet} from 'react-router-dom';
function Cabecalho(){
return(
   <>
    <h1>lista de tarefas</h1>
    <Link to={'/tarefas'}>Tarefas</Link>
    <Link to={'rota2'}>rota2</Link>
    <Link to={'/consulta-ram'}> Consulta rick morty</Link>
    <Link to={'/detalhePersonagem'}>detalhes dos personagens</Link>
    <Outlet/>
    </>
);
}
export default Cabecalho;