// Importando Express y configurando el enrutador
const express = require('express');
const router = express.Router();

// Importando funciones de gestión de usuarios desde userfunctions.js
const { AllUsers, AddUser, DeleteUser } = require("../functions/userfunctions.js");

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
    res.send("Usuario Añadido Correctamente");
  } else {
    // Enviando mensaje de error si el usuario no se añadió
    res.send("Usuario No añadido");
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
router.post('/update', (req, res, next) => {
  // Respondiendo con un mensaje genérico para actualizar un usuario
  res.json({
    message: "Actualizar algún usuario"
  });
});

// Exportando el enrutador para su uso en otros archivos
module.exports = router;
