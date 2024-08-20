const dotenv = require('dotenv');

dotenv.config();


const nodemailer = require ('nodemailer');
const transport = nodemailer.createTransport({
    service : 'gmail',
    pool : true,
    maxMessages : 'Infinity',
    maxConnections : 5,
    auth : {
        type : 'OAuth2',
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
        clientId : process.env.SMTP_CLIENT_ID,
        clientSecret : process.env.SMTP_SECRET,
        refreshToken : process.env.SMTP_REFRESH_TOKEN
    }

});

const testTransport = nodemailer.createTransport({
    host : 'localhost',
    port : process.env.SMTP_TEST_PORT,
    pool : true,
    maxMessages : 'Infinity',
    maxConnections : 5,
    auth : {
        user: process.env.SMTP_TEST_USER,
        pass: process.env.SMTP_TEST_PASS,
     
    }

});

const {usuarios} = require('./usuarios.json');

const plantillaTexto = (email = '', pass = '')=> `
    Desde el área de Planeamiento y Evaluación nos comunicamos para informar de la nueva plataforma de carga de planificaciones y resultados.

    Esta nueva versión incluye mejoras significativas respecto a la anterior, muchas de las cuales se originaron a partir de la retroalimentación con ustedes, adoptando sus recomendaciones y sugerencias. Agradecemos la colaboración de ustedes en este desarrollo, y esperamos que estas actualizaciones faciliten el uso de la herramienta.

    La información que cada una de las áreas completa en este espacio resulta de utilidad tanto para la gestión cotidiana de actividades, como para la elaboración de la memoria institucional al finalizar el año. Sin embargo sus beneficios no se agotan allí, sino que ha contribuido a la elaboración de indicadores de gestión, así como también a identificar potenciales avances y contribuciones en torno al Plan Institucional Estratégico de la Universidad.

    Este desarrollo forma parte de los ejes de trabajo del área, en vistas a avanzar en la digitalización de procesos de extensión y cultura, contribuyendo a generar información de utilidad para la gestión de la Secretaría en particular, y de la Universidad en general.

    Por ello invitamos a cargar la información referida al año 2024, considerando las actividades ya realizadas y sus resultados, como las actividades planificadas para el resto del año. 

    Encontrarán sus respectivos usuarios y contraseñas al final del correo. Para quienes ya han trabajado con el Gestor de Proyectos y Prácticas de Extensión, encontrarán en esta nueva versión un acceso al mismo.

    Asimismo incluímos un tutorial de uso, y un video explicativo, para que puedan aprovechar al máximo la plataforma. No obstante lo cual, quedamos a disposición por cualquier consulta o duda que surja durante el uso. 

    Saludos! 

    Link de acceso: http://168.197.50.94:4005/
    Tutorial en pdf: https://docs.google.com/document/d/1nqQBBEsa88nyYcAV3ha73FvWJHP1LrLapGaDpAPESOU/edit 
    Video tutorial: https://youtu.be/0YO14hvKQXE

    Usuario: ${email}
    Contraseña: ${pass}
 
`;


const plantillaHTML = (email = '', pass = '')=> `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Plataforma de planificaciones y memoria SEyC </title>
    </head>
    <body>
        <p>Desde el área de Planeamiento y Evaluación nos comunicamos para informar de la nueva plataforma de carga de planificaciones y resultados.</p>

        <p>Esta nueva versión incluye mejoras significativas respecto a la anterior, muchas de las cuales se originaron a partir de la retroalimentación con ustedes, adoptando sus recomendaciones y sugerencias. Agradecemos la colaboración de ustedes en este desarrollo, y esperamos que estas actualizaciones faciliten el uso de la herramienta.</p>

        <p>La información que cada una de las áreas completa en este espacio resulta de utilidad tanto para la gestión cotidiana de actividades, como para la elaboración de la memoria institucional al finalizar el año. Sin embargo sus beneficios no se agotan allí, sino que ha contribuido a la elaboración de indicadores de gestión, así como también a identificar potenciales avances y contribuciones en torno al Plan Institucional Estratégico de la Universidad.</p>

        <p>Este desarrollo forma parte de los ejes de trabajo del área, en vistas a avanzar en la digitalización de procesos de extensión y cultura, contribuyendo a generar información de utilidad para la gestión de la Secretaría en particular, y de la Universidad en general.</p>

        <p>Por ello invitamos a cargar la información referida al año 2024, considerando las actividades ya realizadas y sus resultados, como las actividades planificadas para el resto del año. </p>

        <p>Encontrarán sus respectivos usuarios y contraseñas al final del correo. Para quienes ya han trabajado con el Gestor de Proyectos y Prácticas de Extensión, encontrarán en esta nueva versión un acceso al mismo.</p>

        <p>Asimismo incluímos un tutorial de uso, y un video explicativo, para que puedan aprovechar al máximo la plataforma. No obstante lo cual, quedamos a disposición por cualquier consulta o duda que surja durante el uso. </p>

        <p>Saludos! </p>

        <p>Link de acceso: <a href="http://168.197.50.94:4005/"> Plataforma de Planificaciones y Resultados </a> </p>
        <p>Tutorial en pdf: <a href="https://docs.google.com/document/d/1nqQBBEsa88nyYcAV3ha73FvWJHP1LrLapGaDpAPESOU/edit "> https://docs.google.com/document/d/1nqQBBEsa88nyYcAV3ha73FvWJHP1LrLapGaDpAPESOU/edit  </a> </p>
        <p>Video tutorial: <a href=" https://youtu.be/0YO14hvKQXE"> https://youtu.be/0YO14hvKQXE</a> </p>

        <p>Usuario: ${email}
        <p>Contraseña: ${pass}
    
    </body>
    </html>
`;

const mail = (email = '', pass = '')=>({
    from : 'evaluacion.extension@gmail.com',
    to : email,
    subject : 'Actualización e instructivo - Plataforma de planificaciones y memoria SEyC',
    text : plantillaTexto(email,pass),
    html : plantillaHTML(email,pass)
})






const enviarMail = async( )  =>{

    try {   await transport.verify(); } catch (error) { console.log(error); }

        console.log('smtp ok!');

    const emails = usuarios.map( usr => mail(usr.email,usr.pass));
    try {

                transport.on('idle',()=>{

            while( transport.isIdle() && emails.length){
                transport.sendMail(emails.shift(),(error,resp)=>{
                    if(error){
                        console.log(error);
                    } else {
                        if(resp.rejected.length) {
                            console.log(`rechazado : ${resp.envelope.to}`);
                        } else {
                            console.log(`enviado : ${resp.envelope.to}`)
                        }
                    }
                });
            }
            
            // const envios = emails.map( email => testTransport.sendMail(email));
            // const respuestas = await Promise.all(envios.slice(index, index + 10));


            // respuestas.forEach( resp => {
            //     if(resp.rejected.length > 0) console.log(resp.rejected);
            //     else console.log( `correo a ${resp.envelope.to} - enviado : ${resp.messageId}` )
            // });
            
        });
        transport.emit('idle');
       
      
    
        
        
    } catch (error) {
        console.log(error);
    }
     

}


enviarMail();