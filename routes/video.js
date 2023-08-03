const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//const session = require('express-session');
//const bcrypt = require('bcrypt');
const app = express();

app.use(bodyParser.json());

const Video = mongoose.model('Video', videoSchema);
module.exports = Video;

app.get('/getAllVideo', async (req, res) => {
    try {
      const video = await Video.find(); // Récupère tous les utilisateurs de la collection "utilisateurs"
      res.json(video);
    } catch (err) {
      res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
    }
});

