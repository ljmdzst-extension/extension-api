import { Transaction } from "sequelize";
import { ActividadObjetivoEspecifico, ActividadObjetivoEspecificoAttributes, ActividadObjetivoEspecificoCreationAttributes } from "../models/ActividadObjetivoEspecifico";
import { CronogramaActividad, CronogramaActividadAttributes, CronogramaActividadCreationAttributes } from "../models/CronogramaActividad";
import { ESTADO_BD } from "../types/general";

export type ActObjEspIn = ActividadObjetivoEspecificoCreationAttributes & {
    cronogramas : CronogramaActividadCreationAttributes[]
}

export type ActObjEspOut = ActividadObjetivoEspecificoAttributes &{
    cronogramas : CronogramaActividadAttributes[]
}

export default class AcObjEsp {
    public estadoEnBd !: ESTADO_BD;

    private dbActObjEsp !: ActividadObjetivoEspecifico;

    private lCronogramas !: CronogramaActividad[];

    constructor(
        data : ActObjEspIn
    ){
        this.dbActObjEsp = ActividadObjetivoEspecifico.build(data );

        this.lCronogramas = CronogramaActividad.bulkBuild(data.cronogramas);
        this.estadoEnBd = ESTADO_BD.A;
    }

    public verDatos() {
        return {
            ...this.dbActObjEsp.dataValues,
            cronogramas : this.lCronogramas.map( cronog => cronog.dataValues )
        }
    }
    public darDeBaja() {
        this.estadoEnBd = ESTADO_BD.B;
    }

    public async definirPersistencia(transaction ?: Transaction) {
        if( await ActividadObjetivoEspecifico.findByPk( this.dbActObjEsp.idActividadObjetivoEspecifico, {transaction} ) ) {
            this.estadoEnBd = ESTADO_BD.M;
        }
    }

    public definirPersistenciaCronogramas( transaction ?: Transaction) {
        if(this.lCronogramas.length) {
            return this.lCronogramas.map(async cronog => await CronogramaActividad.findOne( { where : { ...cronog }, transaction} ).then( resp => cronog.isNewRecord = resp === null ) )
        }
        return [];
    }

    public async guardarEnBD( transaction ?: Transaction) {
        this.dbActObjEsp.isNewRecord = this.estadoEnBd === ESTADO_BD.A;

        await this.dbActObjEsp.save({transaction});
        

    }

    public guardarCronogramasEnBD(  transaction ?: Transaction ) {
        return this.lCronogramas.map( cronog => cronog.save({transaction}));
    }


}