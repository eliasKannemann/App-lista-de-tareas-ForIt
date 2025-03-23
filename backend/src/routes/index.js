const express = require('express');
    
const { getTasks, createTasks,deleteTask, updateTask  } = require('../controllers');

const router = express.Router();

router.get('/tasks', getTasks);
router.post('/tasks', createTasks);
router.delete('/tasks/:id', deleteTask);
router.put('/tasks/:id', updateTask);

module.exports = router;