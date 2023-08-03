const express= require('express');
const router= express.Router();

const mongoose = require('mongoose');
//const { validate } = require('../models/depotVoiture');

const Categorie= require('../models/categorieTourisme');


//http://localhost:3000/Categorie
router.get('',function(req,res,next)
    {
        console.log("nakato")
        let listeRetour= new Array();
        Categorie.find().exec().then(result => {
            console.log('tena hamoaka result');
             console.log(result);
           
            res.status(200).json(result);
        }).catch(err => {
            console.log(err);
            res.status(500).json(
                {
                    error: err
                }
            );
        });
    }
);


module.exports= router;