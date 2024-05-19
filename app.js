const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bd = require("./connection.js");
const cors = require('cors')
const indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const corsOptions = {
    origin: 'http://localhost:8080', // Permite este origen específico
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization' // Permite estos encabezados
};

app.use(cors(corsOptions));
app.use('/', indexRouter);
app.use(express.static(path.join(__dirname, 'public')));



module.exports = app;
