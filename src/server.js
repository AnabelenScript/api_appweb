const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const zapatosRoutes = require('./routes/zapatos');
require('dotenv').config();
const fs = require('fs');
const https = require('https');

const app = express();
const port = process.env.DB_PORT || 3000;

app.use(cors({
  origin: 'http://34.206.22.144', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use(bodyParser.json());
app.use('/zapatos', zapatosRoutes);

app.listen(port, () => {
  console.log(`Servidor Express en ejecución en http://localhost:${port}`);
});
