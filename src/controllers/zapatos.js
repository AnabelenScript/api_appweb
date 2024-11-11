const mysql = require('mysql2');
require('dotenv').config();

// Configuración de la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Conexión a la BD establecida');
});

// Obtener todos los zapatos
exports.getAllzapatos = (req, res) => {
  db.query('SELECT * FROM zapatos', (err, result) => {
    if (err) {
      res.status(500).send('Error al obtener los zapatos');
      throw err;
    }
    res.json(result);
  });
};

// Agregar un nuevo zapato
// Agregar un nuevo zapato
exports.addShoe = (req, res) => {
    const { name, price, color, size, brand, image, description } = req.body;
    const newShoe = {
      name,
      price,
      color,
      size,
      brand,
      image,        // Aquí 'image' debe ser '1'
      description
    };
  
    // Insertamos el nuevo zapato sin el campo 'id'
    db.query('INSERT INTO zapatos SET ?', newShoe, (err, result) => {
      if (err) {
        res.status(500).send('Error al agregar el zapato');
        return;
      }
      res.status(201).json({ message: 'Zapato agregado correctamente' });
    });
  };
  

// Actualizar un zapato existente
exports.updateShoe = (req, res) => {
  const shoeId = req.params.id;
  const { name, price, color, size, brand, image, description } = req.body;

  const updatedShoe = {
    name,
    price,
    color,
    size,
    brand,
    image,
    description
  };

  db.query('UPDATE zapatos SET ? WHERE id = ?', [updatedShoe, shoeId], (err, result) => {
    if (err) {
      res.status(500).send('Error al actualizar el zapato');
      throw err;
    }
    res.json({ message: 'Zapato actualizado correctamente' });
  });
};

// Eliminar un zapato
exports.deleteShoe = (req, res) => {
  const shoeId = req.params.id;

  db.query('DELETE FROM zapatos WHERE id = ?', shoeId, (err, result) => {
    if (err) {
      res.status(500).send('Error al eliminar el zapato');
      throw err;
    }
    res.json({ message: 'Zapato eliminado correctamente' });
  });
};
