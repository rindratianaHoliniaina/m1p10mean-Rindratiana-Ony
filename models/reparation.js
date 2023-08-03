const mongoose = require('mongoose');

const reparationSchema= mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        idDepotVoiture: String,
        descReparation: String,
        montantRep: Number,
        etatPaiementRep:Number,
        dateEtatPaiement:Date,
        nomEtatPaiement: String,
        valEtatAv:Number,
        nomEtatAv:String,
        dateEtatAv:Date,
        typeReparation:String,
        nomTypeReparation:String
    }
); 

//Product= le anarana iantsoana anle model refa ampiasa anazy ao amle projet
module.exports = mongoose.model('Reparation',reparationSchema);

