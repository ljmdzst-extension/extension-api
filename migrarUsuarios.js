const fs = require('fs');
const uuid = require('uuid');


const usuarios = [
    { nroDoc : "00000010", idUnidadAcademica : 2, pass : "lbento" , email : "lia.bentolila1@gmail.com" },
    { nroDoc : "00000010", idUnidadAcademica : 2, pass : "mcfari" , email : "mceciliafarias@gmail.com" },
    { nroDoc : "34827115", idUnidadAcademica : 24, pass : "es1234" , email : "estefania.vschneider@gmail.com" },
    { nroDoc : "32621200", idUnidadAcademica : 21, pass : "ivi123" , email : "ivimorelli@gmail.com" },
    { nroDoc : "24509623", idUnidadAcademica : 2, pass : "caneva" , email : "caneva.ana@gmail.com" },
];


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
            'dd5f14f7-ac75-49d5-8b2a-c8ca71d984d8',
            'd1a7016b-6e4e-4196-954a-979e8ef78249',
            '6158701e-edcf-41ef-b9c0-ebdd8be85148',
            '398a0808-8d08-4eb4-b779-77488e22d37c',
            '3c0f562e-53fa-4ea7-9683-54acf7f3d005',
            '3123530e-1601-4849-b1da-abd2d95f6409',
            'd28992f4-2c6d-413e-8fb4-0869d4144c8f',
            'a8c40d9b-301c-436e-8c12-a224ed88196f',
            '16ea2c71-42e8-4bf1-8769-fe407af5e0ed',
            'f337ccfe-8032-4761-a80a-f469c3a0eeb5',
            '35c9646a-8da1-4e9e-bce8-a1dc2b7144f0',
            '2dbd7464-6266-4e88-8939-cbcbb7c7e1e0',
            'c0f663c2-f968-4fec-ab7c-fb11be1ed88a',
            '224380f8-3889-4ad0-b083-d2ba49e81b59',
            'c4fd4bf8-3e24-40fc-9afc-cb9bc2b6b098',
            'bb66b9e2-eecf-4639-beea-85f6be107743',
            '4bafb46c-7990-4ded-b5cb-0544dcf572af',
            '5f0c62be-f793-4e3c-adb6-31086adaca38',
            '$2b$10$bWJTn1WKyh0BVAvc9vSfux1U4er4ziyd5SeotQuqqc0yf2.Y10uq',

        ];

        const parseo = usuarios.map( u => `('${printId(ids)}','${u.email}','${u.pass}','${u.nroDoc}',${u.idUnidadAcademica},0,CURRENT_TIMESTAMP(),CURRENT_TIMESTAMP())` );
        
        fs.writeFileSync('usuarios.sql',parseo.reduce((salida,linea)=>`${salida},${linea}`,''));
  

    } catch (error) {
        console.log(error);        
    }

}

usuariosToSQL();


