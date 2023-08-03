const mongoose = require('mongoose');

// const elementSchema= mongoose.Schema(
//     {
//         _id: mongoose.Schema.Types.ObjectId,
//         nomElement: String,
//         minDescription: String,
//         maxDescription: String,
//         categorieId : { type: mongoose.Schema.Types.ObjectId, ref: 'Categ' },
//         provinceId :  { type: mongoose.Schema.Types.ObjectId, ref: 'Prov' }
//     }
// );

//tokony String no typenle foreign key

const elementSchema= mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        nomElement: String,
        minDescription: String,
        maxDescription: String,
        categorieId : String,
        provinceId :  String
    }
);

const El = mongoose.model('ElementTouristiqe',elementSchema);
module.exports = El;