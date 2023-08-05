const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//const session = require('express-session');
//const bcrypt = require('bcrypt');

const Utilisateur = require('../models/utilisateur');

const router= express.Router();


//Inscription utilisateur
//http://localhost:3000/utilisateur/register
// {
//   "nom" : "ony",
//   "prenom" : "tiana",
//   "email" : "ony@gmail.com",
//   "password" : "ony123"
// }
router.post('/register',function(req,res,next)
    {
        const user= new Utilisateur(
            {
                _id: new mongoose.Types.ObjectId(),
                nom: req.body.nom,
                prenom: req.body.prenom,
                email: req.body.email,
                password:req.body.password
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

//Avoir tous les utilisateur
//http://localhost:3000/utilisateur/users
router.get('/users', async (req, res) => {
    try {
      const users = await Utilisateur.find(); // Récupère tous les utilisateurs de la collection "utilisateurs"
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs' });
    }
});

router.use(bodyParser.urlencoded({ extended: false }));
// router.use(session({
//   secret: 'secret',
//   resave: true,
//   saveUninitialized: true
// }));

//Connexion utilisateur 
//http://localhost:3000/utilisateur/login // tsy mety ty fa tsy mamerina anle bodyresult
// {
//   "email" : "ony@gmail.com",
//   "password" : "ony13"
// }
// router.post('/login', async (req, res) => {
//     const {email, password } = req.body;
//     try {
//       const user = await Utilisateur.findOne({email});
//       if (!user) {
//         return res.status(404).json({ message: 'utilisateur incorrect ou inexistante' });
//       }
//       //const passwordMatch = await bcrypt.compare(password, user.password);
//       if (password == user.password) {
//         req.user = user;
//         console.log("about to print result");
//         console.log(res);
//         return res.status(200).json({ message: 'Login réussi' });
//       } else {
//         return res.status(401).json({ message: 'Mot de passe incorrect' });
//       }
//     } catch (error) {
//       res.status(500).json({ message: 'Erreur lors du login' });
//     }
// });


router.post('/login',function(req,res,next)
    {
        const email=req.params.email;
        const mdp= req.params.password;
        //const typeUser = req.params.typeUser; // Le typeUser tsy maila precisena tsony
        Utilisateur.find({email:req.body.email,password:req.body.password})
        .exec().then(result => {
            console.log(result);
            if(result) 
            {
                res.status(200).json({message : 'Connexion réussie',values:result[0],status:'success'});
            }
            else 
            {
                res.status(404).json({message : 'Identifiant inéxistant/Login ou mot de passe incorrect',values:null,status:'failure'});
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


//Deconnexion utilisateur
//http://localhost:3000/utilisateur/logout
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Erreur lors de la déconnexion' });
      }
      res.clearCookie('connect.sid');
      res.json({ message: 'Déconnexion réussie' });
    });
});

//http://localhost:3000/utilisateur/listeUser/64c8f91aaf23ede7e31aefb6
router.get('/listeUser/:iduser',function(req,res,next)
    {
        Utilisateur.find({_id:req.params.iduser}).exec().then(result => {
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