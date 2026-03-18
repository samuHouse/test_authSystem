const express = require('express');
const app = express();
// Per manipolare i percorsi dei file.
const path = require('path');
// Per configurazione delle variabili d'ambiente.
require('dotenv').config();
// Per la gestione dei cookie.
const cookieParser = require("cookie-parser");

app.use(cookieParser());
// Per parsing del body delle richieste in formato JSON.
app.use(express.json());

// rotte.
const authRoutes = require('./routes/auth');
app.use('/', authRoutes);
const userRoutes = require('./routes/user');
app.use('/user', userRoutes);

// espone la frontend, serve i file statici.
app.use(express.static(path.join(__dirname, 'frontend')));

app.listen(process.env.PORT, () => console.log(`Listening on http://localhost:${process.env.PORT}`));