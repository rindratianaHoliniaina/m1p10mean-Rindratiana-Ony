const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//const session = require('express-session');
//const bcrypt = require('bcrypt');
const app = express();

const Element = require('../models/elementTouristique');

const router= express.Router();

//Avoir tous les liste d' element touristique
//http://localhost:3000/element/getAllElement
router.get('/getAllElement', async (req, res) => {
    try {
      const element = await Element.find({}); 
      res.status(200).json({ message: 'Success',values:element});
    } catch (err) {
      res.status(500).json({ message: 'Erreur lors de la récupération' });
    }
});


//Avoir les element toristique par province
//http://localhost:3000/element/listeElementParProvince/64ca5957ebf46d16c46c8083
router.get('/listeElementParProvince/:idProv',function(req,res,next)
    {

       // Element.find({provinceId:req.params.idProv} , 'nomElement').exec().then(result => { (Raha otranty dia le nomelement sy id iany no resultat averiny)
        console.log("params"+req.params.idProv)
      Element.find({provinceId:req.params.idProv}).exec().then(result => {
            console.log(result);
            res.status(200).json({ message: 'Success',values:element});
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

//Avoir les fiche de chaque element touristique
//http://localhost:3000/element/listeFicheParElement/ParcnationaldeMontagnedAmbre
router.get('/listeFicheParElement/:nomRecherche',function(req,res,next)

    { 
        // Utilisation d'une expression régulière pour rechercher le mot spécifié
    const regex = new RegExp(req.params.nomRecherche, 'i');

    //Element.find({ nomElement: { $regex: regex } })
        // tsy azo asiana anle filtre etsy amin 2è param .find
      Element.find({nomElement:{ $regex: regex }} ).exec().then(result => {
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

//Recherche simple
router.get('/recherche', function(req, res , next) 
{
  const { nomElement, minDescription, maxDescription } = req.query;
  const critereRecherche = {};
  if (nomElement) {
    critereRecherche.nomElement = nomElement;
  }
  if (minDescription) {
    critereRecherche.minDescription = minDescription;
  }
  if (maxDescription) {
    critereRecherche.maxDescription = maxDescription;
  }
  Element.find(critereRecherche).exec().then(result => {
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
});


module.exports= router;