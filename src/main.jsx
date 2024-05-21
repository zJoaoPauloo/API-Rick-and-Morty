import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Tarefas from './todolist.jsx'
import Cabecalho from './cabecalho.jsx'
import ConsultaRAM from '../consulta-ram/consulta-ram.jsx'
import DetalhePersonagem from '../consulta-ram/detalhePersonagem.jsx'
const routes = createBrowserRouter([
{
  path:'/',
  element:<Cabecalho />,
  children: [
    {
      path:'/tarefas',
      element:<Tarefas />,
    },
    {
      path:'/rota2',
      element:<h1>minha rota 2</h1>,
    },
    {
      path:'/consulta-ram',
      element: <ConsultaRAM/>
    },
    {
      path:'/detalhe/:id',
      element: <DetalhePersonagem/>
    }

    
  ]
}

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   
    <RouterProvider router = {routes}/>
  </React.StrictMode>,
  
)
