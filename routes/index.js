// Importando Express y configurando el enrutador
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

// Importando funciones de gestión de usuarios desde userfunctions.js
const { AllUsers, AddUser, DeleteUser } = require("../functions/userfunctions.js");
const { token } = require('morgan');

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

// Ruta para actualizar información de un usuario

//ruta de creacion de token a partir del nombre de un usuario

// ruta para validar token del usuario 

router.post("/validate",(req,res)=>{
  const {token} = req.body  
  console.log(token);
  return jwt.verify(token,process.env.SECRET)
})
// Exportando el enrutador para su uso en otros archivos
module.exports = router;
