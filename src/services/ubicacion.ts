import { Propuesta } from "../models/Propuesta";



export class SeriviciosUbicacion {

    static async leerUbicacionesPorPropuesta( iPropuesta : Propuesta ) {
        await iPropuesta.sequelize.transaction(async transaction =>{
            await Promise.all(iPropuesta.ubicacionProblematicas.map( ubicProp => ubicProp.getUbicacion({transaction}).then( ubic => ubicProp.ubicacion = ubic) ));
        })
    }
   
}