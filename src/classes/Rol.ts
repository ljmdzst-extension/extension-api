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
    
    public compararDatos( dataRol : TRolIn ) {
        return this.dbRol.idRolIntegrante === dataRol.idRolIntegrante && 
                this.dbRol.codigoPropuesta === dataRol.codigoPropuesta &&
                this.dbRol.nroDoc === dataRol.nroDoc;
    }

    verDatos() {
        return {
            
            codigoPropuesta : this.dbRol.codigoPropuesta,
            idRolIntegrante : this.dbRol.idRolIntegrante,
            nroDoc : this.dbRol.nroDoc
        }
    }

    async determinarPersistencia( transaction ?: Transaction) {
        this.dbRol.isNewRecord = await RolIntegrante.findOne({
            where : {
                ...this.dbRol.dataValues
            },
            transaction
        }) === null;
    }

    darDeBaja() {
        this.estadoEnBD = ESTADO_BD.B;
    }

    async guardarDatos(transaction ?: Transaction) : Promise<TRolOut>{
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