var express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');
const async = require('hbs/lib/async');
var router = express.Router();
var nodemailer = require("nodemailer");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', async (req, res, next) => {

  console.log(req.body)

  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var mail = req.body.email;
  var telefono = req.body.telefono;
  var domicilio = req.body.domicilio;
  var ciudad = req.body.ciudad;
  var inputState = req.body.inputState;
  var cp = req.body.cp;
  var comentario = req.body.comentario;

  var obj = {
    to: 'chicheteam@gmail.com',
    subject: 'contacto desde la web',
    html: nombre + " " + apellido + " se contacto a traves y quiere mas info a este correo: " + mail + " . <br> Ademas, hizo el siguiente comentario: " + comentario + " . <br> Su telefono es " + telefono
  }

  var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })

  var info = await transport.sendMail(obj)

  res.render('index', {
    message: 'Mensaje enviado correctamente'
  })

})

module.exports = router;
