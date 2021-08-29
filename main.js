const nodemailer = require('nodemailer');
const cors = require('cors');
const express = require('express');

const app = express();

app.use(express.json());

app.use(cors({
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
        host: "mail.diftinto.com",
        port: 465,
        secure: true,
        auth: {
            user: "info@diftinto.com",
            pass: 'VGETp@2011'
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


app.listen(3030, () => {
    console.log("Servidor arriba en puerto 3030")
})