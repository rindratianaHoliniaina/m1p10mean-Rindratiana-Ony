const express= require('express');
const router= express.Router();

const mongoose = require('mongoose');
//const { validate } = require('../models/depotVoiture');

const CategorieTourisme= require('../models/categorieTourisme');


//http://localhost:3000/Categorie
router.get('',function(req,res,next)
    {
        let listeRetour= new Array();
        CategorieTourisme.find().exec().then(result => {
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


////http://localhost:3000/categorie/listeCategorie/64ca461febf46d16c46c8079
router.get('/listeCategorie/:idcategorie',function(req,res,next)
    {
        CategorieTourisme.find({_id:req.params.idcategorie}).exec().then(result => {
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