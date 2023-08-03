const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//const session = require('express-session');
//const bcrypt = require('bcrypt');
const app = express();

app.use(bodyParser.json());

const Image = mongoose.model('Image', imageSchema);
module.exports = Image;

app.get('/getAllProvince', async (req, res) => {
    try {
      const image = await Image.find(); // Récupère tous les utilisateurs de la collection "utilisateurs"
      res.json(image);
    } catch (err) {
      res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
    }
});

