const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send("PAGINA PRINCIPAL")
});
// this route send all the user inside the database
router.get('/users', (req, res, next) => {
  res.json({
    message: "Obtener todos los usuarios"
  })
});


// this route is to register new users 
router.get('/add', (req, res, next) =>{
  res.json({
    message: "Obtener todos los usuarios"
  })
});

// this route deletes the served user from the database, in case the dont want to use the app anymore
router.get('/delete', (req, res, next)=>{
  res.json({
    message: "Borrar algun usuario"
  })
});

// this route changes some things as the name or the surname, it can also be the password for the user in the session
router.get('/update', (req, res, next)=> {
  res.json({
    message: "Actualizar algun usuario"
  })
});

module.exports = router;
