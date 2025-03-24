import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const About = () => {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <div className="card">
                        <div className="card-header">
                            <h3>App ForIt</h3>
                        </div>
                        <div className="card-body">
                            <p className="card-text">
                                Bienvenidos a la App de tareas
                            </p>
                            <p className="card-text">
                                Esta aplicación le permite agregar, editar y eliminar tareas.
                            </p>
                            <p className="card-text">
                               Esta aplicación fue desarrollada para el challenge de ForIt
                            </p>
                            <p className="card-text">
                                Desarrollada por: <strong>Elias Kannemann</strong>       
                            </p> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;