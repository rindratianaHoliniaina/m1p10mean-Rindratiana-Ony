const express= require('express');
const router= express.Router();

const mongoose = require('mongoose');

const Reparation= require('../models/reparation');
const Depotvoiture= require('../models/depotVoiture');

//http://localhost:3000/reparation/listeReparation/63c662a01d3459b5410a0d44
//liste de reparation par depot de voiture
router.get('/listeReparation/:idDepotVoit',function(req,res,next)
    {
        Reparation.find({idDepotVoiture:req.params.idDepotVoit}).exec().then(result => {
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


//http://localhost:3000/reparation/reparationParId/63d1e47e96eab78fe378237c
//liste de reparation par depot de voiture
router.get('/reparationParId/:idReparation',function(req,res,next)
    {
        Reparation.find({_id:req.params.idReparation}).exec().then(result => {
            console.log(result);
            res.status(200).json(result[0]);
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



//  insertReparation
// http://localhost:3000/reparation/insertReparation
// {
//     "idDepotVoiture": "63d127df47f56d34514b6218",
//     "descReparation": "description reparation",
//     "montantRep": "15000",
//     "typeReparation":"1",
//     "nomTypeReparation":"Réparation mineure"
// }
router.post('/insertReparation',function(req,res,next)
    {
        const rep= new Reparation(
            {
                _id: new mongoose.Types.ObjectId(),
                idDepotVoiture: req.body.idDepotVoiture,
                descReparation: req.body.descReparation,
                montantRep: req.body.montantRep,
                etatPaiementRep:0,
                dateEtatPaiement:null,
                nomEtatPaiement:"Non payé",
                valEtatAv:0,
                nomEtatAv:"En attente",
                dateEtatAv:new Date(),
                typeReparation: req.body.typeReparation,
                nomTypeReparation: req.body.nomTypeReparation,
                dateDebutEntreeGarage: new Date()
            }
        );
        rep.save().then
        (
            result => 
            {
                //Ajout de mnttotal
                console.log("eto a insertReparation");
                //console.log("idDepotVoiture "+result[0].idDepotVoiture); tsy mety alaina avy amle result le idDepotVoiture fa mety hoe save angamba dia tsy recuperable
                 Depotvoiture.find({_id: req.body.idDepotVoiture}).exec().then(resultat => {
                    console.log("Number(req.body.montantRep) "+ Number(req.body.montantRep));
                    console.log("resultat[0].montantRep "+ resultat[0].montantRep);
                     Depotvoiture.update({_id: req.body.idDepotVoiture},{$set: {montantTTlPaiement:resultat[0].montantTTlPaiement+Number(req.body.montantRep),nbreReparationAFaire:resultat[0].nbreReparationAFaire+1}}).exec().then(result => {
                     res.status(200).json(resultat);
                    }).catch(err => {
                        console.log("anatiny"+err);
                        res.status(500).json(
                            {
                                error: err
                            }
                        );
                    });
                }).catch(err => {
                    console.log("ivelany "+err);
                    res.status(500).json(
                        {
                            error: err
                        }
                    );
                });
            }
        ).catch(err => err => {
            console.log(err);
            res.status(500).json(
                {
                    error: err
                }
            );
        });
    }
);

//update rehetra momban depotvoiture
router.patch('/:idReparation/:cible/:valUpdate/:idDepotVoit',function(req,res,next)
    {
        //http://localhost:3000/reparation/63c67c928743ba9bf0deacea/avancement/1/63c67c928743ba9bf0deacea
        console.log("tato eeeeee ");
        const idReparation= req.params.idReparation;
        if(req.params.cible === "avancement") //receptionner voiture 
        {
            // tokony 1 na 2 ny valUpdate
            let nomEtatAvancement= "";
            let valEtatAv= -1;
            if(req.params.valUpdate === "0")
            {
                nomEtatAvancement= "En attente";
                Reparation.update({_id: idReparation},{$set: {nomEtatAv:nomEtatAvancement,valEtatAv:Number(req.params.valUpdate),dateEtatAv:new Date()}}).exec().then(result => {
                    console.log(result);
                    res.status(200).json(result);
                    //Eto tokony misy fandefasana mail ny client
                }).catch(err => {
                    console.log(err);
                    res.status(500).json(
                        {
                            error: err
                        }
                    );
                });
            }
            if(req.params.valUpdate === "1")
            {
                nomEtatAvancement= "En cours";
                Reparation.update({_id: idReparation},{$set: {nomEtatAv:nomEtatAvancement,valEtatAv:Number(req.params.valUpdate),dateEtatAv:new Date()}}).exec().then(result => {
                    console.log(result);
                    res.status(200).json(result);
                    //Eto tokony misy fandefasana mail ny client
                }).catch(err => {
                    console.log(err);
                    res.status(500).json(
                        {
                            error: err
                        }
                    );
                });
            }
            if(req.params.valUpdate === "2")
            {
                nomEtatAvancement="Terminé";
                Reparation.update({_id: idReparation},{$set: {nomEtatAv:nomEtatAvancement,valEtatAv:Number(req.params.valUpdate),dateEtatAv:new Date()}}).exec()
                .then(result => {
                    console.log(result);
                    console.log("eto a insertReparation");
                    //console.log("idDepotVoiture "+result[0].idDepotVoiture); tsy mety alaina avy amle result le idDepotVoiture fa mety hoe save angamba dia tsy recuperable
                     Depotvoiture.find({_id: req.params.idDepotVoit}).exec().then(resultat => {
                        console.log("Resultat ");
                        console.log(resultat);
                        console.log("fin Resultat ");
                         Depotvoiture.update({_id: req.params.idDepotVoit},{$set: {nbreReparationFini:resultat[0].nbreReparationFini+1}}).exec().then(result => {
                         res.status(200).json(resultat);
                        }).catch(err => {
                            console.log("anatiny"+err);
                            res.status(500).json(
                                {
                                    error: err
                                }
                            );
                        });
                    }).catch(err => {
                        console.log("ivelany "+err);
                        res.status(500).json(
                            {
                                error: err
                            }
                        );
                    });
                }).catch(err => {
                    console.log(err);
                    res.status(500).json(
                        {
                            error: err
                        }
                    );
                });
            }
            
                                                
        }
        else if(req.params.cible === "paiement") //receptionner voiture 
        {
                                                //idReparation                  //montantRep          //idDepotVoiture
            //http://localhost:3000/reparation/63c67c928743ba9bf0deacea/paiement/1200000/63c67c928743ba9bf0deacea
                                                                        //ovaina 1 ny etatreception satria recu ny voiture

            nomEtatAvancement="Terminé";
                Reparation.update({_id: idReparation},{$set: {nomEtatPaiement:"Payé",etatPaiementRep:1,dateEtatPaiement:new Date()}}).exec()
                .then(result => {
                    console.log(result);
                    console.log("eto a insertReparation");
                    //console.log("idDepotVoiture "+result[0].idDepotVoiture); tsy mety alaina avy amle result le idDepotVoiture fa mety hoe save angamba dia tsy recuperable
                     Depotvoiture.find({_id: req.params.idDepotVoit}).exec().then(resultat => {
                        console.log("Resultat ");
                        console.log(resultat);
                        console.log("fin Resultat ");
                         Depotvoiture.update({_id: req.params.idDepotVoit},{$set: {montantTotalPaye:resultat[0].montantTotalPaye+Number(req.params.valUpdate)}}).exec().then(result => {
                         res.status(200).json(resultat);
                        }).catch(err => {
                            console.log("anatiny"+err);
                            res.status(500).json(
                                {
                                    error: err
                                }
                            );
                        });
                    }).catch(err => {
                        console.log("ivelany "+err);
                        res.status(500).json(
                            {
                                error: err
                            }
                        );
                    });
                }).catch(err => {
                    console.log(err);
                    res.status(500).json(
                        {
                            error: err
                        }
                    );
                });



            // Reparation.update({_id: idReparation},{$set: {nomEtatPaiementRep:"Payé",etatPaiementRep:Number(req.params.valUpdate),dateEtatAv:new Date()}}).exec().then(result => {
            //     console.log(result);
            //     res.status(200).json(result);
            //     //Eto tokony misy fandefasana mail ny client
            // }).catch(err => {
            //     console.log(err);
            //     res.status(500).json(
            //         {
            //             error: err
            //         }
            //     );
            // });
        }

        // else if(req.params.cible === "montantTTlPaiement") // update montantTTlPaiement
        // {
        //     //Depotvoiture.montantTTlPaiement+
        //     //findOneAndUpdate(filter, update)
        //     Depotvoiture.find({_id: depVoitId}).exec().then(result => {

        //         //Depotvoiture.update({_id: depVoitId},{$set: {montantTTlPaiement:result.montantTTlPaiement+Number(req.params.valUpdate)}}).exec();
        //         Depotvoiture.update({_id: depVoitId},{$set: {montantTTlPaiement:result[0].montantTTlPaiement+Number(req.params.valUpdate)}}).exec().then(result => {
        //         console.log(result);
        //         res.status(200).json(result);
        //         }).catch(err => {
        //             console.log("anatiny"+err);
        //             res.status(500).json(
        //                 {
        //                     error: err
        //                 }
        //             );
        //         });
        //         //console.log("inty aho "+result[0].montantTTlPaiement);
        //         //res.status(200).json(result); // Tsy mandefa an ity intsony lasa double le header lasa any amin client fa une fois vita mitsy 
        //     }).catch(err => {
        //         console.log("ivelany "+err);
        //         res.status(500).json(
        //             {
        //                 error: err
        //             }
        //         );
        //     });
        //     // Depotvoiture.update({_id: depVoitId},{$set: {montantTTlPaiement:Number(req.params.valUpdate)}}).exec().then(result => {
        //     //     console.log(result);
        //     //     res.status(200).json(result);
        //     // }).catch(err => {
        //     //     console.log(err);
        //     //     res.status(500).json(
        //     //         {
        //     //             error: err
        //     //         }
        //     //     );
        //     // });
        // }

    }
);





// resp at: listeDemandeDeDepot
// router.get('/listeDemandeDeDepot',function(req,res,next)
//     {
//         Depotvoiture.find({etatReception:0})
//         .exec().then(result => {
//             console.log(result);
//             if(result) 
//             {
//                 res.status(200).json(result);
//             }
//             else 
//             {
//                 res.status(404).json({message : 'Identifiant inéxistant'});
//             }
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

// router.patch('/:depVoitId',function(req,res,next)
//     {
//         const depVoitId= req.params.depVoitId;
//         Depotvoiture.update({_id: depVoitId},{$set: {etatReception:1}}).exec().then(result => {
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


module.exports= router;