import React, { useState, useRef, useEffect } from "react";

function Todolist() {
    const [tarefas, setTarefas] = useState(JSON.parse(localStorage.getItem('tarefas')) || []);
    const [editando, setEditando] = useState(false);
    const [idEditando, setIdEditando] = useState(null);
    const descricaoRef = useRef();

    useEffect(() => {
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }, [tarefas]);

    function cadastrar() {
        const descricao = descricaoRef.current.value;

        if(!descricao) return;

        if(editando) {
            setTarefas(prevTarefas => prevTarefas.map(tarefa => {
                if (tarefa.id === idEditando) {
                    return { ...tarefa, descricao: descricao };
                }
                return tarefa;
            }));
            setEditando(false);
            setIdEditando(null);
        } else {
            const tarefa = {
                id: Date.now(),
                descricao: descricao,
                finalizado: false
            };
            setTarefas([...tarefas, tarefa]);
        }
        descricaoRef.current.value = ""; // Limpar o campo de entrada após adicionar uma tarefa
    }

    function nomeMudou(id) {
        setTarefas(prevTarefas => prevTarefas.map(tarefa => {
            if (tarefa.id === id) {
                return { ...tarefa, finalizado: !tarefa.finalizado };
            }
            return tarefa;
        }));
    }

    function editar(id) {
        setEditando(true);
        setIdEditando(id);
        const tarefa = tarefas.find(tarefa => tarefa.id === id);
        descricaoRef.current.value = tarefa.descricao;
    }

    function excluir(id) {
        setTarefas(prevTarefas => prevTarefas.filter(tarefa => tarefa.id !== id));
    }

    return (
        <>
            <input type="text" ref={descricaoRef} />
            <button onClick={cadastrar}>{editando ? 'Salvar' : 'Cadastrar'}</button>
            {tarefas.map(tarefa => (
                <div key={tarefa.id} style={{
                    backgroundColor: 'blue',
                    padding: '5px',
                    marginBottom: '5px',
                    cursor: 'pointer'
                }}>
                    <span onClick={() => nomeMudou(tarefa.id)} style={{
                        textDecoration: tarefa.finalizado ? 'line-through' : 'unset',
                        color: 'white',
                        marginRight: '15px'
                    }}>
                        {tarefa.descricao}
                    </span>
                    <button onClick={(e) => {e.stopPropagation(); editar(tarefa.id);}} style={{marginRight: '5px'}}>Editar</button>
                    <button onClick={(e) => {e.stopPropagation(); excluir(tarefa.id);}}>Excluir</button>
                </div>
            ))}
        </>
    );
}

export default Todolist;
