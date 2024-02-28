import { Transaction } from "sequelize";
import { 
    ObjetivoEspecificoAttributes ,
    ObjetivoEspecifico as MObjetivoEspecifico,
    ObjetivoEspecificoCreationAttributes
} from "../models/ObjetivoEspecifico";
import { ESTADO_BD } from "../types/general";
import ActObjEsp, { ActObjEspIn, ActObjEspOut } from "./ActObjEsp";

export type ObjEspIn = ObjetivoEspecificoCreationAttributes & {
    actividades : ActObjEspIn[]
}

export type ObjEspOut = ObjetivoEspecificoAttributes &{
   actividades : ActObjEspOut[]
}

export default class ObjetivoEspecifico {
    public estadoEnBd !: ESTADO_BD;

    private dbObjEsp !: MObjetivoEspecifico;

    private lActividades !: ActObjEsp[];

    constructor( data : ObjEspIn  ) {
        this.estadoEnBd = ESTADO_BD.A;

        this.dbObjEsp = MObjetivoEspecifico.build(data);
        this.lActividades = data.actividades.map( dataAct => new ActObjEsp(dataAct ) );



    }
    public verDatos() {
        return {
            ...this.dbObjEsp.dataValues,
            actividades : this.lActividades.map( act => act.verDatos())
        }
    }
    public darDeBaja() {
        this.estadoEnBd = ESTADO_BD.B;
    }

    public async definirPersistencia(transaction ?: Transaction) {
        if( await MObjetivoEspecifico.findByPk( this.dbObjEsp.idObjetivoEspecifico, {transaction} ) ) {
            this.estadoEnBd = ESTADO_BD.M;
        }
    }

    public async definirPersistenciaActividades(transaction ?: Transaction) {
        if(this.lActividades.length ) {
            return this.lActividades.map( act => act.definirPersistencia(transaction));
        }
    }

    public async definirPersistenciaCronogramasActividades(transaction ?: Transaction) {
        if(this.lActividades.length ) {
            return this.lActividades.map( act => act.definirPersistenciaCronogramas(transaction))
                    .reduce( (salida,promesas)=> ([ ... salida ,...promesas ]) , []);
        }
    }
    

    public async guardarEnBD( transaction ?: Transaction) {
        this.dbObjEsp.isNewRecord = this.estadoEnBd === ESTADO_BD.A;

        await this.dbObjEsp.save({transaction});
        

    }

    public guardarActividadesEnBD(  transaction ?: Transaction ) {
        return this.lActividades.map( act => act.guardarEnBD(transaction));
    }

    public guardarCronogramasActividadesEnBD( transaction ?: Transaction ) {
        return this.lActividades.map( act => act.guardarCronogramasEnBD(transaction))
                            .reduce( (salida , promesas) =>([...salida,...promesas]) ,[] );
    }
 
}