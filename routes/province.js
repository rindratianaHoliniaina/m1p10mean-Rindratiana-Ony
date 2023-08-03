const express = require('express');

const Province = require('../models/province');

const router= express.Router();

//Avoir tous les province
//http://localhost:3000/province/getAllProvince
router.get('/getAllProvince', async (req, res) => {
    try {
      const province = await Province.find(); 
      res.json(province);
    } catch (err) {
      res.status(500).json({ message: 'Erreur lors de la récupération' });
    }
});

//Avoir les province par Id Province
//http://localhost:3000/province/listeProvince/64ca5957ebf46d16c46c8083
router.get('/listeProvince/:idProv',function(req,res,next)
    {
        Province.find({_id:req.params.idProv}).exec().then(result => {
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

