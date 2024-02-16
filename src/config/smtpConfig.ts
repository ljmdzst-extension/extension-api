import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';


    
export let smtpService = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        type: 'OAuth2',
        user: process.env.SMTP_USER ,
        pass: process.env.SMTP_PASS ,
        clientId: process.env.SMTP_CLIENT_ID ,
        clientSecret: process.env.SMTP_SECRET ,
        refreshToken: process.env.SMTP_REFRESH_TOKEN
    }
} as SMTPTransport.Options);


export const generarEmailValidaciónRegistro = (_to : string, _idUsuario : string) => ({
    from : process.env.SMTP_USER,
    to : _to,
    subject : 'Secretaría de Extensión - Registro de usuario ',
    text : `ìngrese en el siguiente enlace para confirmar su cuenta : ${process.env.SERVER_HOST}/register/validation/${_idUsuario}`,
    html : `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Secretaría de extensión y cultura - Confirmación de registro</title>
        </head>
        <body>
            <section>
                <p>Recibimos una solicitud de registro de usuario con este correo electrónico</p>
                <p>Para confirmar el registro, haga clic en el siguiente enlace :</p>
                <p><a href="${process.env.SERVER_HOST}/register/validation/${_idUsuario}">CONFIRMAR REGISTRO DE USUARIO</a></p> 
            </section>
            <footer>
                <hr>
                <h2>Universidad Nacional del Litoral</h2>
                <h3>Secretaría de Extensión y Cultura</h3>
            </footer>
        </body>
        </html>
    `
  })
