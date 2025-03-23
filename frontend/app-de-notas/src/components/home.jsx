import React, { useState } from 'react';
import { Button, Form, ListGroup, Container, Row, Col } from 'react-bootstrap';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [taskName, setTaskName] = useState('');
    const [taskText, setTaskText] = useState('');

    const addTask = () => {
        if (taskName && taskText) {
            setTasks([...tasks, { name: taskName, text: taskText, completed: false }]);
            setTaskName('');
            setTaskText('');
        }
    };

    const deleteTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
    };

    const toggleComplete = (index) => {
        const newTasks = tasks.map((task, i) => 
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(newTasks);
    };

    const editTask = (index, newName, newText) => {
        const newTasks = tasks.map((task, i) => 
            i === index ? { ...task, name: newName, text: newText } : task
        );
        setTasks(newTasks);
    };

    return (
        <Container>
            <Row className="my-4">
                <Col>
                    <h1>APP TAREAS</h1>
                    <Form>
                        <Form.Group class="form-group" controlId="formTaskName">
                            <Form.Label class="col">Nombre</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Ingrese el nombre de la tarea" 
                                value={taskName} 
                                onChange={(e) => setTaskName(e.target.value)} 
                            />
                        </Form.Group>
                        <Form.Group class="form-group" controlId="formTaskText">
                            <Form.Label>descripción</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Ingrese la descripción de la tarea"     
                                value={taskText} 
                                onChange={(e) => setTaskText(e.target.value)} 
                            />
                        </Form.Group>
                        <Button class="btn btn-primary btn-lg active form-group"  variant="primary" onClick={addTask}>
                            Add Task
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ListGroup>
                        {tasks.map((task, index) => (
                            <ListGroup.Item key={index} variant={task.completed ? 'success' : ''}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5>{task.name}</h5>
                                        <p>{task.text}</p>
                                    </div>
                                    <div>
                                        <Button 
                                            variant="warning" 
                                            className="mr-2" 
                                            onClick={() => editTask(index, prompt('New name:', task.name), prompt('New text:', task.text))}
                                        >
                                            Edit
                                        </Button>
                                        <Button 
                                            variant="danger" 
                                            className="mr-2" 
                                            onClick={() => deleteTask(index)}
                                        >
                                            Delete
                                        </Button>
                                        <Button 
                                            variant={task.completed ? 'secondary' : 'success'} 
                                            onClick={() => toggleComplete(index)}
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