
const express= require('express');
const app= express();

const bodyParser=require('body-parser');


const mongoose = require('mongoose');
//const url = 'mongodb://127.0.0.1:27017/tpandroid' 
//mongoose.set('strictQuery', false);
mongoose.set('strictQuery', false)
//const url = 'mongodb+srv://user-rindra:motdepasse1234@cluster0.lf4uyt2.mongodb.net/?retryWrites=true&w=majority';
const url = 'mongodb+srv://mongouser:mongouser@cluster0.ovzc44v.mongodb.net/?retryWrites=true&w=majority';
//const url= 'mongodb+srv://mongouser:mongouser@cluster0.vys0xda.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(url, { useNewUrlParser: true }) 
    const db = mongoose.connection
    db.once('open', _ => {
      console.log('Database connected:', url)
    })
    
    db.on('error', err => {
      console.error('connection error:', err)
    })


//use before the other middleware
app.use(bodyParser.urlencoded({extended: false})); //ref miparse zavatra avy amin form no mampiasa an'ity dia tsy ilaina eto
app.use(bodyParser.json()); //refa miparse req post amin api

//routes
const utilisateurRoutes= require('./routes/utilisateur');
const categorieRoutes= require('./routes/categorie');
const elementRoutes= require('./routes/element');
const provinceRoutes= require('./routes/province');
const depotVoitureRoutes= require('./routes/depotVoiture');



// cors
app.use((req,res,next) => {
        res.header("Access-Control-Allow-Origin","*");
        // res.header(
        //     "Access-Control-Allow-Headers",
        //     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        // );
        res.header(
            "Access-Control-Allow-Headers",
            "*"
        );
        //req.method ahitana anle type de methode get, put, delete,...
        if(req.method === 'OPTIONS')
        {
            //definition des methodes supportés par l api
            res.header('Access-Control-Allow-Methods', 'PUT,PATCH,DELETE,POST,GET');
            //status général des réponses 
            return res.status(200).json();
        }
        next(); //continue sur les autres middlewares de routages
    }
    

);

//use routes
//otrany hoe filter , ze /products rehetre dia makany amle router
//use routes
app.use('/utilisateur',utilisateurRoutes);
app.use('/categorie',categorieRoutes);
app.use('/element',elementRoutes);
app.use('/province',provinceRoutes);
app.use('/depotVoiture',depotVoitureRoutes);
// de haut en bas ny faakianle programa anle code 
// dia raha tsy nahita nifanaraka teo ambony izy dia maketo ambany
app.use((req,res,next) =>
    {
        const error= new Error('Not found');
        error.status = 404;
        next(error);
    }

)

app.use((error,req,res,next) =>
    {
        res.status(error.status || 500);
        res.json(
            {
                error:{
                    message: error.message
                }
            }
        );
    }

);

// app.get('/',function(req,res)
//     {
//         res.status(200).json(
//             {
//                 message:'It works!'
//             }
//         )
//     }
// );

// app.listen(3000,function()
//     {
//         console.log('ato a eeeeeeeeee ');
//     }

// )


// app.listen(process.env.NODE_ENV || 3000,function()
//     {
//         console.log('! ');
//     }

// )
// const isProduction = process.env.NODE_ENV === 'production'
// const port = isProduction ? 7500 : 3000;
// app.listen(process.env.NODE_ENV || 3000,function()
//     {
//         console.log(`listening on ${port}`);
//     }

// )

const isProduction = process.env.NODE_ENV === 'production'
const port = isProduction ? process.env.PORT : 3000;
app.listen(port,function()
    {
        console.log(`listening on ${port}`);
    }

)
