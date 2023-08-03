const mongoose = require('mongoose');

const categorieTourismeSchema= mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        nomCategorie: String,
    }
);

const Categ = mongoose.model('categorietourismes',categorieTourismeSchema);
module.exports = Categ ; 