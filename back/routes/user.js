const express= require('express');
const router= express.Router();

const mongoose = require('mongoose');

const User= require('../models/user');

//get all users
//http://localhost:3000/users
router.get('',function(req,res,next)
    {
        User.find().exec().then(result => {
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

// inscription: insertclient 
// http://localhost:3000/users/inscription
// {
//     "nom": "Rakoto",
//     "prenom": "Vola",
//     "email": "rindrahratsima@gmail.com",
//     "mdp":"vola",
//     "typeUser":1
// }
router.post('/inscription',function(req,res,next)
    {
        const user= new User(
            {
                _id: new mongoose.Types.ObjectId(),
                nom: req.body.nom,
                prenom: req.body.prenom,
                email: req.body.email,
                mdp:req.body.mdp,
                typeUser:req.body.typeUser
            }
        );
        user.save().then(result => {
            res.status(201).json([user]);
        }).catch(err => err => {
            console.log(err);
            res.status(500).json(
                {
                    error: err
                }
            );
        });
    }
);

//login
// http://localhost:3000/users/login
// {
//     "email": "rindrahratsima@gmail.com",
//     "mdp": "vola"
// }
router.post('/login',function(req,res,next)
    {
        const email=req.params.email;
        const mdp= req.params.mdp;
        //const typeUser = req.params.typeUser; // Le typeUser tsy maila precisena tsony
        User.find({email:req.body.email,mdp:req.body.mdp,typeUser:1})
        .exec().then(result => {
            console.log(result);
            if(result) 
            {
                res.status(200).json(result);
            }
            else 
            {
                res.status(404).json({message : 'Identifiant inéxistant'});
            }
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


// router.get('/:UserId',function(req,res,next)
//     {
//         const id=req.params.UserId;

//         //Tsy voatery manao new User() fa afaka le User azo t@ require tes=tsy ambony no alaina dia atao methode static
//         User.findById(id).exec().then(result => {
//             console.log(result);
//             if(result) 
//             {
//                 res.status(200).json(result);
//             }
//             else // zany hoe valide le form anle objectId nalefa fa tsy misy ao amin base fotsiny dia null ny resultat azo fa tsy erreur
//             {
//                 res.status(404).json({message : 'Identifiant inéxistant'});
//             }
//         }).catch(err => {
//             console.log(err);
//             //eRREUR raha le form anle objectid mitsy no tsy valide
//             res.status(500).json(
//                 {
//                     error: err
//                 }
//             );
//         });

//         // if(id=='special')
//         // {
//         //     res.status(200).json(
//         //         {
//         //             message: 'special '
//         //         }
//         //     )
//         // }
//         // else
//         // {
//         //     res.status(200).json(
//         //         {
//         //             message: 'regular'
//         //         }
//         //     )
//         // }
       
//     }
// );

// router.patch('/:UserId',function(req,res,next)
//     {
//         const id= req.params.UserId;
//         const updateOps ={};
//         // for(const ops of req.body)
//         // {
//         //     updateOps[ops.propName]= ops.value;
//         // }
//         // User.update({_id: id},{$set: updateOps})
//         //User.update({_id: id},{$set: {name: req.body.newName, price:req.body.newPrice}})
//         User.update({_id: id},{$set: {nom: req.body.name, price:req.body.price}}).exec().then(result => {
//             console.log(result);
//             res.status(200).json(result);
//         }).catch(err => {
//             console.log(err);
//             res.status(500).json(
//                 {
//                     error: err
//                 }
//             );
//         });

//     }
// );

router.delete('/:UserId',function(req,res,next)
    {
        const id=req.params.UserId;

        //Tsy voatery manao new User() fa afaka le User azo t@ require tes=tsy ambony no alaina dia atao methode static
        User.remove({_id:id}).exec().then(result => {
            console.log(result);
                res.status(200).json(result);
        }).catch(err => {
            console.log(err);
            //eRREUR raha le form anle objectid mitsy no tsy valide
            res.status(500).json(
                {
                    error: err
                }
            );
        });

        // res.status(200).json(
        //     {
        //         message: 'deleted User'
        //     }
        // )
    }
);



//tsy maintsy exportena
module.exports= router;
