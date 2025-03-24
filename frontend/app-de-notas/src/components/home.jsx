import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Container, Row, Col, Card } from 'react-bootstrap';
import Notas from './notas';
import Swal from 'sweetalert2';

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
                    Swal.fire("Tarea creada", "La tarea se ha creado correctamente", "success");
                })
                .catch(error => console.error("Error al agregar tarea:", error));
        }
    };


    useEffect(() => {
        axios.get("http://localhost:3000/api/tasks")
            .then(response => setTasks(response.data))
            .catch(error => console.error("Error al obtener tareas:", error));
    }, []);


    return (
        <Container className='mt-5 mb-15'>
            <Card>
                <Row className="my-6">
                    <Col>
                    <h1>Crea una tarea!</h1>
                        <Form>
                            <Form.Group className="form-group mb-3" controlId="formTaskName">
                                <Form.Label className="col">Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese el nombre de la tarea"
                                    value={taskName}
                                    onChange={(e) => setTaskName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group className="form-group" controlId="formTaskText">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingrese la descripción de la tarea"
                                    value={taskText}
                                    onChange={(e) => setTaskText(e.target.value)}
                                />
                            </Form.Group>

                            <Button className="btn btn-primary btn-lg active form-group" variant="primary" onClick={addTask}>
                                Crear Nota
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Card>
            <Notas />
        </Container>



    );
};

export default Home;