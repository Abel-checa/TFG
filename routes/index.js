// Importando Express y configurando el enrutador
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
// Importando funciones de gestión de usuarios desde userfunctions.js
const { AllUsers, AddUser, DeleteUser,AddTask,TaskToFinish } = require("../functions/userfunctions.js");
const { token } = require('morgan');
const { now } = require('mongoose');
require('dotenv').config();

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
// Ruta para obtener todos los usuarios
router.get('/users', async (req, res, next) => {
  // Obteniendo todos los usuarios desde la base de datos
  var users = await AllUsers();
  // Verificando si se encontraron usuarios
  if (users.length !== 0) {
    // Enviando la lista de usuarios como respuesta
    res.send(users);
  } else {
    // Si no se encontraron usuarios, enviando un mensaje apropiado
    res.send("No se ha encontrado ningún usuario");
  }
});

// Ruta para registrar nuevos usuarios
router.post('/add', async (req, res, next) => {
  // Obteniendo los datos del nuevo usuario desde el cuerpo de la solicitud
  const saving = req.body;
  console.log(req.body);
  // Intentando agregar el usuario
  if (AddUser(saving)) {
    // Enviando mensaje de éxito si el usuario se añadió correctamente
    res.sendStatus(200);
  } else {
    // Enviando mensaje de error si el usuario no se añadió
    res.sendStatus(400);
  }
});

// Ruta para eliminar un usuario
router.post('/delete/:nombre', async (req, res, next) => {
  // Obteniendo el nombre del usuario a eliminar desde los parámetros de la URL
  const result = await DeleteUser(req.params.nombre);
  // Verificando si el usuario se eliminó correctamente
  if (result !== false) {
    // Enviando mensaje de éxito si el usuario se eliminó correctamente
    res.send(result);
  } else {
    // Enviando mensaje de error si algo salió mal durante la eliminación
    res.send("Algo ha salido mal");
  }
});

router.post("/validate", (req, res) => {
  const { token } = req.body;
  console.log(req.body);

  if (!token) {
    return res.status(400).json({ error: 'Token no proporcionado' });
  }

  try {
    const validation = jwt.verify(token, process.env.SECRET);
    return res.status(200).json({ valid: true, validation });
  } catch (error) {
    console.error('Error al verificar el token:', error);
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
});

router.post("/userTask/:user",async (req,res)=>{
  try{
    console.log(req.body);
    const new_TASK = {
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      startTime: formatDate(new Date()),
      endtime: req.body.endtime
    }
    const action = await AddTask(req.params.user,new_TASK)
    res.send(action)
  }catch(e){
    res.sendStatus(404)
  }
  
})


// ruta para ver que tareas vencen el dia de hoy

router.get('/notCompleted/:user',async (req,res)=>{
  const action = await TaskToFinish(req.params.user, formatDate(new Date()))
  res.send(action)
})


// ruta para comppletar on eliminar una tarea
router.post('/deleteTask/:user',async (req,res)=>{
  const {nombre} = req.body
  res.send(action)
});
// Exportando el enrutador para su uso en otros archivos
module.exports = router;
