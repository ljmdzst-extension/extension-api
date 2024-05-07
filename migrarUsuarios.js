const fs = require('fs');
const uuid = require('uuid');


const usuarios = [
    { nroDoc : "0000005", idUnidadAcademica : 0, pass : "123456" , email : "programaalimentos@unl.edu.ar" },
    {  nroDoc : "0000002", idUnidadAcademica : 0, pass : "123456" , email : "ambienteysociedad@unl.edu.ar" },
    {  nroDoc : "0000004", idUnidadAcademica : 0, pass : "123456" , email : "delitoysociedad@unl.edu.ar" },
    {  nroDoc : "0000003", idUnidadAcademica : 0, pass : "123456" , email : "derechoshumanos@unl.edu.ar"  },
    {  nroDoc : "0000006", idUnidadAcademica : 0, pass : "123456" , email : "genero@unl.edu.ar"  },
    {  nroDoc : "0000008", idUnidadAcademica : 0, pass : "123456" , email : "economiasocial@unl.edu.ar" },
    {  nroDoc : "0000001", idUnidadAcademica : 0, pass : "123456" , email : "equidadensalud@unl.edu.ar" },
    {  nroDoc : "0000007", idUnidadAcademica : 0, pass : "123456" , email : "educacionysociedad@fhuc.unl.edu.ar"},
    {  nroDoc : "0000009", idUnidadAcademica : 0, pass : "123456" , email : "historiaymemoria@unl.edu.ar"  },

];;


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
        let ids = [
            '$2b$10$bWJTn1WKyh0BVAvc9vSfux1U4er4ziyd5SeotQuqqc0yf2.Y10uq',
            '224380f8-3889-4ad0-b083-d2ba49e81b59',
            '2dbd7464-6266-4e88-8939-cbcbb7c7e1e0',
            '35c9646a-8da1-4e9e-bce8-a1dc2b7144f0',
            '5f0c62be-f793-4e3c-adb6-31086adaca38',
            'a8c40d9b-301c-436e-8c12-a224ed88196f',
            'bb66b9e2-eecf-4639-beea-85f6be107743',
            'c0f663c2-f968-4fec-ab7c-fb11be1ed88a',
            'c4fd4bf8-3e24-40fc-9afc-cb9bc2b6b098',
            'd28992f4-2c6d-413e-8fb4-0869d4144c8f',

        ];

        const parseo = usuarios.map( u => `('${printId(ids)}','${u.email}','${u.pass}','${u.nroDoc}',${u.idUnidadAcademica},0,CURRENT_TIMESTAMP(),CURRENT_TIMESTAMP())` );
        
        fs.writeFileSync('usuarios.sql',parseo.reduce((salida,linea)=>`${salida},${linea}`,''));
  

    } catch (error) {
        console.log(error);        
    }

}

usuariosToSQL();