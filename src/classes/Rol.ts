import { Transaction } from "sequelize";
import { RolIntegrante as MRolIntegrante, RolIntegrante, RolIntegranteAttributes, RolIntegranteCreationAttributes } from "../models/RolIntegrante";
import { ESTADO_BD } from "../types/general";


export type TRolIn = RolIntegranteCreationAttributes;
export type TRolOut = RolIntegranteAttributes;



export default class Rol {
    public estadoEnBD !: ESTADO_BD;
    private dbRol !: MRolIntegrante
    constructor (
       data : TRolIn
    ){
        this.estadoEnBD = ESTADO_BD.A;
        this.dbRol = RolIntegrante.build(data);
    }

    verDatos() {
        return {
            
            codigoPropuesta : this.dbRol.codigoPropuesta,
            idRolIntegrante : this.dbRol.idRolIntegrante,
            nroDoc : this.dbRol.nroDoc
        }
    }

    darDeBaja() {
        this.estadoEnBD = ESTADO_BD.B;
    }

    async guardarDatos(transaction : Transaction) : Promise<TRolOut>{
        if(this.estadoEnBD === ESTADO_BD.B) {
            await this.dbRol.destroy({transaction});
        }
        else {
            this.dbRol.isNewRecord = this.estadoEnBD === ESTADO_BD.A;

            await this.dbRol.save({transaction});
        }
        
        return this.verDatos();
    }
}