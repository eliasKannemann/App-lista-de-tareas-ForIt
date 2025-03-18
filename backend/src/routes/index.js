const express = require('express');
const { getTasks, createTask,deleteTask, updateTask  } = require('../controllers');

const router = express.Router();

router.get('/tasks', getTasks);
router.post('/tasks', createTask);
router.delete('/tasks/:id', deleteTask);
router.put('/tasks/:id', updateTask);

module.exports = router;