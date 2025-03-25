import express from 'express';
import cors from 'cors';
import config from './src/config/index.js';
import routes from './src/routes/index.js';


const app = express();
const PORT = config.port;

// Middleware
app.use(cors({
    origin: "http://localhost:5173"
  }));
  
app.use(express.json());

// Routes
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Error interno del servidor" });
  });