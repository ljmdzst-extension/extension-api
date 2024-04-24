const fs = require('fs');
const uuid = require('uuid');


const usuarios = [{
    email : 'jbailone@unl.edu.ar',
pass:  'Gest0r',
 tipoUsuario: 'eval_int_ext', 
nroDoc : '33123456', 
idUnidadAcademica : 2},
{
    email : 'm1boffelli@gmail.com',
pass:  '219789', 
 tipoUsuario:'eval_int_ext', 
nroDoc : '30123456',
idUnidadAcademica :  2},
{
    email : 'lilivoisard@gmail.com',
pass:  'terapi',
 tipoUsuario: 'eval_int_ext', 
nroDoc : '32456778',
idUnidadAcademica :  18},
{
    email : 'paumantica@gmail.com', 
pass: 'PM1234',
 tipoUsuario: 'eval_int_ext',  
nroDoc :'31123345',
idUnidadAcademica :  21},
{
    email : 'federicogrignafini@gmail.com',
pass:  'seyc22',
 tipoUsuario: 'eval_int_ext', 
nroDoc : '34123456',
idUnidadAcademica :  2},
{
    email : 'msanchez@rectorado.unl.edu.ar',
pass:  'Ringo0',
 tipoUsuario: 'eval_int_ext',  
nroDoc :'20345678',
idUnidadAcademica :  1},
{
    email : 'julieta.theiler@gmail.com ',
pass:  'juliet',
 tipoUsuario: 'eval_int_ext', 
nroDoc : '33122891',
idUnidadAcademica :  1},
{
    email : 'sabrirebollo28@gmail.com ',
pass:  'sabri1',
 tipoUsuario: 'eval_int_ext', 
nroDoc : '34302050',
idUnidadAcademica :  21}];;


const printId = ( ids =[]  )=>{
    let nuevaId = uuid.v4();
    if(ids.length){
        ids.forEach( id => { if(id === nuevaId) nuevaId = uuid.v4(); })
    }
    ids.push(nuevaId);
    return nuevaId;
}

const usuariosToSQL = ()=>{

    try {
        let ids = ['$2b$10$bWJTn1WKyh0BVAvc9vSfux1U4er4ziyd5SeotQuqqc0yf2.Y10uq'];

        const parseo = usuarios.map( u => `('${printId(ids)}','${u.email}','${u.pass}','${u.nroDoc}',${u.idUnidadAcademica},0,CURRENT_TIMESTAMP(),CURRENT_TIMESTAMP())` );
        
        fs.writeFileSync('usuarios.sql',parseo.reduce((salida,linea)=>`${salida},${linea}`,''));
  

    } catch (error) {
        console.log(error);        
    }

}

usuariosToSQL();