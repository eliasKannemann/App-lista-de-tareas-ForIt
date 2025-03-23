import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const About = () => {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <div className="card">
                        <div className="card-header">
                            <h3>About Us</h3>
                        </div>
                        <div className="card-body">
                            <p className="card-text">
                                Welcome to our task management app! Our mission is to help you stay organized and productive.
                            </p>
                            <p className="card-text">
                                This app was created as part of the ForIT 2025 Academy Challenge. We hope you find it useful and easy to use.
                            </p>
                            <p className="card-text">
                                If you have any questions or feedback, please feel free to reach out to us.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;