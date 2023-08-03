const express= require('express');
const router= express.Router();

const mongoose = require('mongoose');
//const { validate } = require('../models/depotVoiture');

const Depotvoiture= require('../models/depotVoiture');


//http://localhost:3000/depotVoiture
router.get('',function(req,res,next)
    {
        let listeRetour= new Array();
        Depotvoiture.find().exec().then(result => {
            // console.log(result); 
            // console.log("test depot voiture "+result[0].dateDepotVoit.toISOString().substring(0, 10));
            // for(let i=0;i<result.length;i++)
            // {
            //     // let newObject = {...result[i]}; ???
            //     let nomEtatReception= "";
            //     if(result[i].etatReception === 1) 
            //         nomEtatReception="Récéptionné";
            //     else if(result[i].etatReception === 0) 
            //         nomEtatReception="En attente de récéption";

            //     let nouvObjetResult= Object.assign({},result[i]._doc,{'dateDepotVoitAvecFormat':result[i].dateDepotVoit.toISOString().substring(0, 10),'nomEtatReception':nomEtatReception});
            //     listeRetour.push(nouvObjetResult);
            // }
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