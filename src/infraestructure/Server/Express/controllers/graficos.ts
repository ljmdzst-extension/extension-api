// import { response } from "express";

// import * as SGraficos from '../../../db/Mysql-Sequelize/services/graficos'


// export const verGraficosDeAnio = async(req : any , resp : typeof response)=>{

//     try {
        
//         const {anio } = req.params;

//         const graficos = await SGraficos.verGraficosDeAnio(anio);
        
//         resp.status(200).json({
//             ok : true,
//             data : graficos,
//             error : null
//         });
        
        

//     } catch (error : any) {
        
//         if( error.status && error.status === 500){
//             console.log( error.message );
//         }
//         resp.status( error.status || 500).json({
//             ok : false,
//             data : null,
//             error : error.message || 'Error de servidor'
//         })
//     }

// }