const mongoose = require('mongoose');

const categorieSchema= mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        nomCategorie: String,
    }
);

const Categ = mongoose.model('Categorie',categorieSchema);
module.exports = Categ ; 