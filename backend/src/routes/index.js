import express from 'express';
import { getTasks, createTasks, deleteTask, updateTask } from '../controllers/index.js';

const router = express.Router();

router.get('/tasks', getTasks);
router.post('/tasks', createTasks);
router.delete('/tasks/:id', deleteTask);
router.put('/tasks/:id', updateTask);

export default router;