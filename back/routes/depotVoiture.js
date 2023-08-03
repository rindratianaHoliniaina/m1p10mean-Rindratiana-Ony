const express= require('express');
const router= express.Router();

const mongoose = require('mongoose');
const { validate } = require('../models/depotVoiture');

const Depotvoiture= require('../models/depotVoiture');
const reparation= require('../models/reparation');

const Fonction = require('../shared/fonction')


//http://localhost:3000/depotVoiture
router.get('',function(req,res,next)
    {
        let listeRetour= new Array();
        Depotvoiture.find().exec().then(result => {
            // console.log(result); 
            // console.log("test depot voiture "+result[0].dateDepotVoit.toISOString().substring(0, 10));
            for(let i=0;i<result.length;i++)
            {
                // let newObject = {...result[i]}; ???
                let nomEtatReception= "";
                if(result[i].etatReception === 1) 
                    nomEtatReception="Récéptionné";
                else if(result[i].etatReception === 0) 
                    nomEtatReception="En attente de récéption";

                let nouvObjetResult= Object.assign({},result[i]._doc,{'dateDepotVoitAvecFormat':result[i].dateDepotVoit.toISOString().substring(0, 10),'nomEtatReception':nomEtatReception});
                listeRetour.push(nouvObjetResult);
            }
            res.status(200).json(listeRetour);
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

// insertDepotVoit
// http://localhost:3000/depotVoiture/insertDepotVoit
// {
//     "idClient": "63c5742a22490e43cdd7dfd6",
//     "numVoiture": "1212TAC"
// }
router.post('/insertDepotVoit',function(req,res,next)
    {
        const depVoit= new Depotvoiture(
            {
                _id: new mongoose.Types.ObjectId(),
                idClient: req.body.idClient,
                numVoiture: req.body.numVoiture,
                dateDepotVoit: new Date(),
                dateRecupVoit:null,
                etatReception:0,
                datebonDeSortie:null,
                etatRecuperation:0,
                etatTTlPaieemnt:0,
                montantTTlPaiement:0,
                montantTotalPaye:0,
                nbreReparationAFaire:0,
                nbreReparationFini:0,
                bonDeSortie:0,
                dateReceptionVoit: null
            }
        );
        depVoit.save().then(result => {
            res.status(201).json(
                {
                    message: 'Votre demande de dépot de voiture a été envoyé',
                    createdUser: depVoit
                }
            );
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

// resp at: listeDemandeDeDepot
//http://localhost:3000/depotVoiture/listeDepotVoiture/demandeDepotVoit
router.get('/listeDepotVoiture/:cible',function(req,res,next)
    {
        let etatReceptionAtrouver=-1; //tokony let fa tsy const
        let option =-1;
        if(req.params.cible ==="demandeDepotVoit")
        {
            etatReceptionAtrouver=0;
            option=1;
        }
        else if(req.params.cible ==="depotVoitEnGarage")
        {
            etatReceptionAtrouver=1;
            option=1;
        }
        else if(req.params.cible ==="depotVoitCoteFinancier") // Raha ao amin 'ilay financier ndray ty satria le ao amle financier mety ho efa 1 ny bon de sortie fa mbola tsy payé dia tsy afaka récupérena
        {
            etatReceptionAtrouver=1;
            option=3;
        }
        else
        {
            // numero de voiture no nalefa teo
            etatReceptionAtrouver=1;
            option=2;
        }
        let listeRetour= new Array();
        // raha ho an ilay demandeDepotVoit dia ampy ilay etatReception:etatReceptionAtrouver, fa raha le efa receptionne dia tsy mety fa tsy mintsy ampiana etatrecuperation:0 koa satria sode le efa nivoaka mbola alainy dia ampiana bonsortie:0 satria sode zavatra efa vita reoaration dia mbola nampiany ndray
        // raha ny tokony izy tokony nosarahana tamle if sy else le crud
        if(option === 1)
        {
            Depotvoiture.find({etatReception:etatReceptionAtrouver,etatRecuperation:0,bonDeSortie:0}) 
            .exec().then(result => {
                console.log(result);
                if(result) 
                {
                    for(let i=0;i<result.length;i++)
                    {
                        // let newObject = {...result[i]}; ???
                        let nomEtatReception= "";
                        if(result[i].etatReception === 1) 
                            nomEtatReception="Récéptionné";
                        else if(result[i].etatReception === 0) 
                            nomEtatReception="En attente de récéption";
    
                        let nouvObjetResult= Object.assign({},result[i]._doc,{'dateDepotVoitAvecFormat':result[i].dateDepotVoit.toISOString().substring(0, 10),'nomEtatReception':nomEtatReception});
                        listeRetour.push(nouvObjetResult);
                    }
                    
                    res.status(200).json(listeRetour);
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
        else if(option === 2)
        {
            http://localhost:3000/depotVoiture/listeDepotVoiture/2222TAA
            Depotvoiture.find({etatReception:etatReceptionAtrouver,etatRecuperation:0,numVoiture:req.params.cible}) 
            .exec().then(result => {
                console.log(result);
                if(result) 
                {
                    for(let i=0;i<result.length;i++)
                    {
                        // let newObject = {...result[i]}; ???
                        let nomEtatReception= "";
                        if(result[i].etatReception === 1) 
                            nomEtatReception="Récéptionné";
                        else if(result[i].etatReception === 0) 
                            nomEtatReception="En attente de récéption";
    
                        let nouvObjetResult= Object.assign({},result[i]._doc,{'dateDepotVoitAvecFormat':result[i].dateDepotVoit.toISOString().substring(0, 10),'nomEtatReception':nomEtatReception});
                        listeRetour.push(nouvObjetResult);
                    }
                    res.status(200).json(listeRetour);
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
        if(option === 3)
        {
            Depotvoiture.find({etatReception:etatReceptionAtrouver,etatRecuperation:0}) 
            .exec().then(result => {
                console.log(result);
                if(result) 
                {
                    for(let i=0;i<result.length;i++)
                    {
                        // let newObject = {...result[i]}; ???
                        let nomEtatReception= "";
                        if(result[i].etatReception === 1) 
                            nomEtatReception="Récéptionné";
                        else if(result[i].etatReception === 0) 
                            nomEtatReception="En attente de récéption";
    
                        let nouvObjetResult= Object.assign({},result[i]._doc,{'dateDepotVoitAvecFormat':result[i].dateDepotVoit.toISOString().substring(0, 10),'nomEtatReception':nomEtatReception});
                        listeRetour.push(nouvObjetResult);
                    }
                    
                    res.status(200).json(listeRetour);
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
        

        
    }
);


// Le rehefa le ilaina ao 
//http://localhost:3000/depotVoiture/depotVoitureParId/63d471419f7966000a559010
router.get('/depotVoitureParId/:id',function(req,res,next)
    {
        let listeRetour= new Array();
        Depotvoiture.find({_id:req.params.id})
        .exec().then(result => {
            console.log(result);
            if(result) 
            {
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



//update rehetra momban depotvoiture
// raha put ny nampiasaina dia tsy maintsy ny mombanle objet rehetra no verenina definitiavana fa raha patch dia 
// ze tiana ovaina iany
router.patch('/:depVoitId/:cible/:valUpdate',function(req,res,next)
    {
        //NB Test id objet si valide 
        // if!(ObjectId.isValid(req.params.depVoitId))
        // {}

        console.log("tato eeeeee ");
        const depVoitId= req.params.depVoitId;
        if(req.params.cible === "etatReception") //receptionner voiture 
        {
                                                //idDepotVoiture
            //http://localhost:3000/depotVoiture/63c662a01d3459b5410a0d44/etatReception/1
                                                                        //ovaina 1 ny etatreception satria recu ny voiture
            Depotvoiture.update({_id: depVoitId},{$set: {etatReception:Number(req.params.valUpdate),dateReceptionVoit:new Date()}}).exec().then(result => {
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
        if(req.params.cible === "etatRecuperation") //etatRecuperation voiture 
        {
                                                //idDepotVoiture
            //http://localhost:3000/depotVoiture/63c662a01d3459b5410a0d44/etatReception/1
                                                                        //ovaina 1 ny etatreception satria recu ny voiture
            Depotvoiture.update({_id: depVoitId},{$set: {etatRecuperation:Number(req.params.valUpdate),dateRecupVoit:new Date()}}).exec().then(result => {
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
        else if(req.params.cible === "montantTTlPaiement") // update montantTTlPaiement
        {
            //Depotvoiture.montantTTlPaiement+
            //findOneAndUpdate(filter, update)
            Depotvoiture.find({_id: depVoitId}).exec().then(result => {

                //Depotvoiture.update({_id: depVoitId},{$set: {montantTTlPaiement:result.montantTTlPaiement+Number(req.params.valUpdate)}}).exec();
                Depotvoiture.update({_id: depVoitId},{$set: {montantTTlPaiement:result[0].montantTTlPaiement+Number(req.params.valUpdate)}}).exec().then(result => {
                console.log(result);
                res.status(200).json(result);
                }).catch(err => {
                    console.log("anatiny"+err);
                    res.status(500).json(
                        {
                            error: err
                        }
                    );
                });
                //console.log("inty aho "+result[0].montantTTlPaiement);
                //res.status(200).json(result); // Tsy mandefa an ity intsony lasa double le header lasa any amin client fa une fois vita mitsy 
            }).catch(err => {
                console.log("ivelany "+err);
                res.status(500).json(
                    {
                        error: err
                    }
                );
            });
            
            // Depotvoiture.update({_id: depVoitId},{$set: {montantTTlPaiement:Number(req.params.valUpdate)}}).exec().then(result => {
            //     console.log(result);
            //     res.status(200).json(result);
            // }).catch(err => {
            //     console.log(err);
            //     res.status(500).json(
            //         {
            //             error: err
            //         }
            //     );
            // });
        }
        else if(req.params.cible === "bonDeSortie") //receptionner voiture 
        {
                                                //idDepotVoiture
            //http://localhost:3000/depotVoiture/63c662a01d3459b5410a0d44/etatReception/1
                                                                        //ovaina 1 ny etatreception satria recu ny voiture
            Depotvoiture.update({_id: depVoitId},{$set: {bonDeSortie:Number(req.params.valUpdate),datebonDeSortie:new Date()}}).exec().then(result => {
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

    }
);

//Delete
router.delete('/delete/:idDepotVoiture',function(req,res,next)
    {
        const id=req.params.idDepotVoiture;

        //Tsy voatery manao new Product() fa afaka le Product azo t@ require tes=tsy ambony no alaina dia atao methode static
        Depotvoiture.remove({_id:id}).exec().then(result => {
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
    }
);


//http://localhost:3000/depotVoiture/date
router.get('/date',function(req,res,next)
    {
        let listeRetour= new Array();
        
        Depotvoiture.find({etatReception:1,bonDeSortie:1}) 
            .exec().then(result => {
                console.log('avant');
                let sommeDiffDate= 0;
                let sommeDiffDateRepMaj= 0;
                // let countStatMaj=0;
                // let sommeDiffDateRepMin= 0;
                // let countStatMin=0;
                // let sommeDiffDateRepMoy= 0;
                // let countStatMoy=0;
                let moyenne=0;
                // let moyennetMoy=0;
                // let moyenneMaj=0;
                // let moyenneMin=0;
                for(let i=0;i<result.length;i++)
                {
                    let diff = result[i].datebonDeSortie.getTime() - result[i].dateReceptionVoit.getTime();   
                    let daydiff = diff / (1000 * 60 * 60 * 24);   
                    console.log(daydiff);
                    sommeDiffDate= sommeDiffDate+daydiff;
                    // if(result[i].typeReparation= '1')
                    // {
                    //     let diff = result[i].dateRecupVoit.getTime() - result[i].dateDepotVoit.getTime(); 
                    //     let daydiff = diff / (1000 * 60 * 60 * 24);     
                    //     sommeDiffDateRepMin=sommeDiffDateRepMin+daydiff;
                    //     countStatMin=countStatMin+1;
                    // }
                    // if(result[i].typeReparation= '2')
                    // {
                    //     let diff = result[i].dateRecupVoit.getTime() - result[i].dateDepotVoit.getTime(); 
                    //     let daydiff = diff / (1000 * 60 * 60 * 24);     
                    //     sommeDiffDateRepMoy=sommeDiffDateRepMin+daydiff;
                    //     countStatMoy=countStatMoy+1;
                    // }
                    // if(result[i].typeReparation= '3')
                    // {
                    //     let diff = result[i].dateRecupVoit.getTime() - result[i].dateDepotVoit.getTime(); 
                    //     let daydiff = diff / (1000 * 60 * 60 * 24);     
                    //     sommeDiffDateRepMaj=sommeDiffDateRepMin+daydiff;
                    //     countStatMaj=countStatMaj+1;
                    // }
                }
                if(result.length>0)
                {
                    moyenne = sommeDiffDate/result.length;
                }
                // if(countStatMaj>0)
                // {
                //     moyenneMaj = sommeDiffDate/countStatMaj;
                // }
                // if(countStatMin>0)
                // {
                //     moyenneMin = sommeDiffDate/countStatMin;
                // }
                // if(countStatMoy>0)
                // {
                //     moyennetMoy = sommeDiffDate/countStatMoy;
                // }
                
                console.log('avant');
            res.status(200).json(
                {
                    moyenneMaj: moyenneMaj,
                    moyennetMoy: moyennetMoy,
                    moyenne: moyenne,
                    moyenneMin: moyenneMin
                }
            );
        }).catch(err => {
            console.log(err);
            res.status(500).json(
                {
                    error: err
                }
            );
        });
        // cad terminé
        reparation.find({valEtatAv:2}) 
            .exec().then(result => {

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




// send email
router.get('/testMail',function(req,res,next)
    {
        Fonction.envoiMail('rindrahratsima@gmail.com','sujet','contenu'); 
    }
);


module.exports= router;