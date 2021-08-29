const nodemailer = require('nodemailer');
const cors = require('cors');
const express = require('express');

const app = express();

require('dotenv').config();

app.use(express.json());

app.use(cors({
    // origin: ['http://localhost', 'https://diftinto.com', 'https://www.diftinto.com', 'https://diftinto.netlify.app']
    origin: '*'
}));


app.post('/send-email', (req, res) => {



    const name = req.body.rnName;
    const email = req.body.rnEmail;
    const subject = req.body.rnSubject;
    const message = req.body.rnMessage;

    const htmlEmail = `
            Detalles de contacto
            

                Nombre: ${name} 
                Email: ${email}
                Asunto: ${subject}

            Mensaje
            ${message}

        `
    
    const transporter = nodemailer.createTransport({
        host: process.env.SERVER_MAIL,
        port: process.env.PORT_MAIL,
        secure: true,
        auth: {
            user: process.env.USER_MAIL,
            pass: process.env.PASS_MAIL
        },
    });

    const mailOptions ={
        from: "Formulario de Contacto web",
        to: "info@diftinto.com",
        subject: "ENVIADO DESDE FORMULARIO WEB",
        text: htmlEmail
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            res.status(500).send(error.message);
        }else {
            console.log('Email enviado');
            res.status(200).json(req.body);
        }
    });


})


app.listen(process.env.PORT, () => {
    console.log("Servidor arriba en puerto " + process.env.PORT )
})