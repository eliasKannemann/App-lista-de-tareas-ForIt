import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, ListGroupItem, ListGroup, Row, Col, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';

const TaskList = () => {

    const [tasks, setTasks] = useState([]);
    const [taskName, setTaskName] = useState('');
    const [taskText, setTaskText] = useState('');

    const addTask = () => {
        if (taskName && taskText) {
            axios.post("http://localhost:3000/api/tasks", { name: taskName, text: taskText })
                .then(response => {
                    setTasks([...tasks, response.data]); // Actualiza el estado con la nueva tarea
                    setTaskName("");
                    setTaskText("");
                })
                .catch(error => console.error("Error al agregar tarea:", error));
        }
    };


    useEffect(() => {
        axios.get("http://localhost:3000/api/tasks")
            .then(response => setTasks(response.data))
            .catch(error => console.error("Error al obtener tareas:", error));
    }, []);

    const deleteTask = (id) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3000/api/tasks/${id}`)
                    .then(() => {
                        setTasks(tasks.filter(task => task.id !== id));
                        Swal.fire(
                            "¡Eliminada!",
                            "La tarea ha sido eliminada.",
                            "success"
                        );
                    })
                    .catch(error => {
                        console.error("Error al eliminar tarea:", error);
                        Swal.fire(
                            "Error",
                            "No se pudo eliminar la tarea",
                            "error"
                        );
                    });
            }
        });
    };

    const toggleComplete = (id, name, text, currentCompleted) => {
        const newCompleted = currentCompleted ? false : true; // 🔹 Convertir `0/1` en `true/false`

        axios.put(`http://localhost:3000/api/tasks/${id}`, {
            name,
            text, completed: newCompleted
        })
            .then(() => {
                setTasks(tasks.map(task =>
                    task.id === id ? { ...task, completed: newCompleted } : task
                ));
            })
            .catch(error => console.error("Error al actualizar tarea:", error.response?.data || error));
    };



    const editTask = (id, currentName, currentText, currentCompleted) => {
        const newName = prompt("Nuevo nombre:", currentName);
        const newText = prompt("Nueva descripción:", currentText);

        if (!newName || !newText) {
            alert("El nombre y la descripción no pueden estar vacíos.");
            return;
        }

        axios.put(`http://localhost:3000/api/tasks/${id}`, {
            name: newName,
            text: newText,
            completed: currentCompleted
        })
            .then(() => {
                setTasks(tasks.map(task =>
                    task.id === id ? { ...task, name: newName, text: newText } : task
                ));
                Swal.fire({
                    title: '¡Actualizado!',
                    text: 'La tarea ha sido modificada exitosamente',
                    icon: 'success',
                    timer: 2000,
                    timerProgressBar: true
                  });
            })
            .catch(error => console.error("Error al actualizar tarea:", error.response?.data || error));
    };

    return (
        <div>
            <Row>
                <Col>
                    <ListGroup>
                        {tasks.map((task) => (
                            <ListGroup.Item key={task.id} variant={task.completed ? 'success' : ''}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6>{task.name}</h6>
                                        <p>{task.text}</p>
                                    </div>
                                    <div>
                                        <Button
                                            variant="warning"
                                            className="mr-1"
                                            onClick={() => editTask(task.id, task.name, task.text, task.completed)}
                                        >
                                            Edit
                                        </Button>

                                        <Button variant="danger" onClick={() => deleteTask(task.id)}>Delete</Button>

                                        <Button
                                            variant={task.completed ? 'secondary' : 'success'}
                                            onClick={() => toggleComplete(task.id, task.name, task.text, task.completed)}
                                        >
                                            {task.completed ? 'Undo' : 'Complete'}
                                        </Button>

                                    </div>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </div>
    )
};


export default TaskList;