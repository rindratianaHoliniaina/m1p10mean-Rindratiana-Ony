const { text } = require('body-parser');
const express= require('express'); // tsy aiko raha tena ilaina eto ty require ty

const nodeMailer = require('nodemailer');
function test() // tsy maintsy misy function
{
    console.log("oleeeeeeeeeeee");
}

// envoyer du contenu mety manaoo à la ligne dynamiquement
function envoiMail(emailDest,sujet,contenu)
{
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'milanratsima@gmail.com',
            pass:'ujcmipexmouftlvz'
        }
    });

    const mailOptions = 
    {
        from: 'milanratsima@gmail.com',
        to:emailDest,
        subject: sujet,
        text: contenu
    };

    transporter.sendMail(mailOptions,function(error,info){
        if(error)
        {
            console.log(error);
        }
        else
        {
            console.log('Email sent: '+info.response);
        }
    });
}

module.exports = { test,envoiMail };