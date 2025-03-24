import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, ListGroup, Container, Row, Col, Card } from 'react-bootstrap';

const Home = () => {
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
        axios.delete(`http://localhost:3000/api/tasks/${id}`)
            .then(() => {
                setTasks(tasks.filter(task => task.id !== id)); // Filtrar y eliminar la tarea
            })
            .catch(error => console.error("Error al eliminar tarea:", error));
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
            })
            .catch(error => console.error("Error al actualizar tarea:", error.response?.data || error));
    };



    return (
        <Container>
            <Card>
                <Row className="my-4">
                    <Col>
                        <h1>APP TAREAS</h1>
                        <Form>
                            <Form.Group className="form-group" controlId="formTaskName">
                                <Form.Label className="col">Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese el nombre de la tarea"
                                    value={taskName}
                                    onChange={(e) => setTaskName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="form-group" controlId="formTaskText">
                                <Form.Label>descripción</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese la descripción de la tarea"
                                    value={taskText}
                                    onChange={(e) => setTaskText(e.target.value)}
                                />
                            </Form.Group>

                            <Button className="btn btn-primary btn-lg active form-group" variant="primary" onClick={addTask}>
                                Crear
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Card>
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
        </Container>
    );
};

export default Home;