import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import axios from 'axios';

const Notas = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/tasks")
            .then(response => setTasks(response.data))
            .catch(error => console.error("Error al obtener tareas:", error));
    }, []);

    return (
        <div className='mt-58'>

            <ul className='card mb-3 mt-3 ' >
                <h2 className='mt-59'>Lista de Notas</h2>
                {tasks.map((nota) => (

                    <a key={nota.id} className="text-decoration-none" href={`/notas/${nota.id}`}>
                        <Card className="mb-3 bg-warning text-black border border-light">

                            <Card.Title className="mb-4">{nota.name.toUpperCase()}</Card.Title>
                            <Card.Text className='text-white mb-4 '>
                                {nota.text}
                            </Card.Text>
                            <Card.Text>{nota.id}</Card.Text>

                        </Card>
                    </a>
                ))}
            </ul>
        </div>
    );
};

export default Notas;