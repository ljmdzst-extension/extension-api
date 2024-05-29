const fs = require('fs');
const uuid = require('uuid');


const usuarios = [
    { nroDoc : "33129996", idUnidadAcademica : 20, pass : "eco123" , email : "administracionextension@unl.edu.ar" },
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
            '$2b$10$bWJTn1WKyh0BVAvc9vSfux1U4er4ziyd5SeotQuqqc0yf2.Y10uq',
            '16ea2c71-42e8-4bf1-8769-fe407af5e0ed',
            '2cb481d5-e17b-4226-99a2-3794610509ea',
            '2dbd7464-6266-4e88-8939-cbcbb7c7e1e0',
            '2e28cc23-032e-4f0d-917a-757fd8affc24',
            '3123530e-1601-4849-b1da-abd2d95f6409',
            '35c9646a-8da1-4e9e-bce8-a1dc2b7144f0',
            '38f47fe5-4b79-4f61-a41f-3fb85dd89204',
            '398a0808-8d08-4eb4-b779-77488e22d37c',
            '3c0f562e-53fa-4ea7-9683-54acf7f3d005',
            '445af78a-5a48-46f8-a9c2-764777d04ace',
            '45ff2fd8-264e-4f1f-82cb-36b161bca711',
            '47c283fd-f697-4a2d-bbb6-8ee4ed14348a',
            '4bafb46c-7990-4ded-b5cb-0544dcf572af',
            '5f0c62be-f793-4e3c-adb6-31086adaca38',
            '6158701e-edcf-41ef-b9c0-ebdd8be85148',
            '64cd2196-035c-4e41-8097-c5413ae702f6',
            '6a01abb4-13b7-4544-83f7-5b9d6f2b664c',
            '808c1688-5975-4773-ab72-70c3ec4bcbee',
            '84560e97-935f-4af9-adb1-b09f121858bb',
            '85a8cdd5-e8c1-4e0f-935d-5c02479e2b78',
            '8aebd377-239e-41de-8c5f-10aa672657df',
            '8f614298-bd3d-488f-b542-066a759eac0a',
            'a5d316d3-c37a-4bac-bdb2-a0d480678d05',
            'a8c40d9b-301c-436e-8c12-a224ed88196f',
            'b76e252b-a542-44d7-ab37-9e5627f3d6ea',
            'b9e2208d-6dce-4999-b03a-9d2c7ed9f87b',
            'bb66b9e2-eecf-4639-beea-85f6be107743',
            'c0f663c2-f968-4fec-ab7c-fb11be1ed88a',
            'c4fd4bf8-3e24-40fc-9afc-cb9bc2b6b098',
            'd1a7016b-6e4e-4196-954a-979e8ef78249',
            'd28992f4-2c6d-413e-8fb4-0869d4144c8f',
            'dd5f14f7-ac75-49d5-8b2a-c8ca71d984d8',
            'f337ccfe-8032-4761-a80a-f469c3a0eeb5',
            'fb085a8f-2c91-4a59-aee8-ada16b394bbb',
            'd7f1c075-6adf-4fd1-a678-fc54634f4dbe'

        ];

        const parseo = usuarios.map( u => `('${printId(ids)}','${u.email}','${u.pass}','${u.nroDoc}',${u.idUnidadAcademica},0,CURRENT_TIMESTAMP(),CURRENT_TIMESTAMP())` );
        
        fs.writeFileSync('usuarios.sql',parseo.reduce((salida,linea)=>`${salida},${linea}`,''));
  

    } catch (error) {
        console.log(error);        
    }

}

usuariosToSQL();


