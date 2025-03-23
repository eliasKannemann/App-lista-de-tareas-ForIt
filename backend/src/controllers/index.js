import db from '../database/conexion.js';

export const getTasks = (req, res) => {
  db.query("SELECT id, name, text, completed FROM tareas", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error al obtener tareas" });
    }
    res.json(results);
  });
};

export const createTasks = (req, res) => {
    const { name, text } = req.body;
  
    if (!name || name.trim() === "") {
      return res.status(400).json({ error: "El nombre de la tarea es obligatorio" });
    }
    if (!text || text.trim() === "") {
      return res.status(400).json({ error: "El texto de la tarea es obligatorio" });
    }
  
    const sql = "INSERT INTO tareas (name, text) VALUES (?, ?)";
    db.query(sql, [name, text], (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Error al crear la tarea" });
      }
      res.status(201).json({ id: result.insertId, name, text, completed: false });
    });
    
};

export const updateTask = (req, res) => {        
  const { id } = req.params;
  const { name, text, completed } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({ error: "El nombre de la tarea es obligatorio" });
  }
  if (!text || text.trim() === "") {
    return res.status(400).json({ error: "El texto de la tarea es obligatorio" });
  }
  if (typeof completed !== "boolean") {
    return res.status(400).json({ error: "El estado de la tarea debe ser booleano" });
  }

  db.query(
    "UPDATE tareas SET name = ?, text = ?, completed = ? WHERE id = ?",
    [name, text, completed, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Error al actualizar la tarea" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Tarea no encontrada" });
      }
      res.json({ id, name, text, completed });
    }
  );
};

export const deleteTask = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM tareas WHERE id = ?", [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error al eliminar la tarea" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }
    res.json({ message: "Tarea eliminada correctamente" });
  });
};