const express = require('express');
const cors = require('cors');
const config = require('./config');
const routes = require('./routes');


const app = express();
const PORT = config.port;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});