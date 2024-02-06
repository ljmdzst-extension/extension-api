import { Transaction } from "sequelize";
import Actividad from "./Actividad";
import { BD } from "../config/dbConfig";
import { ERROR } from "../logs/errores";
import { INVALIDO } from "../logs/validaciones";
import { ESTADO_BD } from "../types/general";


type ID_PROG_SIPPE = number;

interface IProgramaSIPPE {
    idProgramaSIPPE : ID_PROG_SIPPE;
    nom ?: string;
    subProgramaDe ?: ID_PROG_SIPPE;
}


class ProgramaSIPPE{
    public estadoEnBD !: number;
    
    constructor 
    (
        private data : IProgramaSIPPE,
        private iActividad ?: Actividad
    ){ 
        this.estadoEnBD = ESTADO_BD.A;
    }

    public verID() : number 
    {
        return this.data.idProgramaSIPPE;
    }
    public estaDeBaja() : boolean { 
        return this.estadoEnBD === ESTADO_BD.B;
    }
    public verDatos() : IProgramaSIPPE {
        return {
            idProgramaSIPPE : this.data.idProgramaSIPPE,
            nom : this.data.nom,
            subProgramaDe : this.data.subProgramaDe
        };
    }

    public static async validar ( data : IProgramaSIPPE, transaction ?: Transaction) : Promise<void> {
        if(!(data.idProgramaSIPPE > 0)) throw INVALIDO.ID_PROG_SIPPE;
        await new BD.ProgramaSippeActividad({idProgramaSIPPE : data.idProgramaSIPPE, idActividad : 0}).validate({skip : ['createdAt','updatedAt','deletedAt']});
    }

    public cargarActividad ( iActividad : Actividad ){ 
        this.iActividad = iActividad;
    }
    
    /** ConexionBD */

    public darDeAltaBD()
    {
        this.estadoEnBD = ESTADO_BD.A;
    }
    public darDeBajaBD()
    {
        this.estadoEnBD = ESTADO_BD.B;
    }

    public async guardarEnBD(transaction ?: Transaction ) : Promise<void> {
        console.log('ProgramaSIPPE.guardarEnBD');
        
        if(!this.iActividad) throw { status : 500, msg : `La ProgramaSIPPE ${this.verID()} no tienne una actividad asociada`}
        
        const registro = { idActividad : this.iActividad.verID(), idProgramaSIPPE : this.verID() }
        
        switch (this.estadoEnBD) {
            case ESTADO_BD.A:
                if(await BD.ProgramaSippeActividad.findOne({where : registro, paranoid : false, transaction})){
                    await BD.ProgramaSippeActividad.restore({ where :registro, transaction });
                 } else {
                    await BD.ProgramaSippeActividad.create(registro, { transaction});
                 }
                break;
            case ESTADO_BD.B:
                await BD.ProgramaSippeActividad.destroy({where : registro , transaction });
            default:
                break;
        }
    }

    

    public static async buscarPorIDBD(id: number, transaction?: Transaction | undefined): Promise<ProgramaSIPPE> 
    {
        const bdProgramaSIPPE = await BD.ProgramaSippe.findByPk(id,{transaction}) ;

        if(!bdProgramaSIPPE ) throw ERROR.PROGRAMA_SIPPE_INEXISTENTE;

        return new ProgramaSIPPE(bdProgramaSIPPE.dataValues) ;
    } ;
    public static async buscarPorActBD(iAct: Actividad, transaction?: Transaction | undefined): Promise<number[]> 
    {

        let salida : number[] = [];

        const bdProgramaSIPPEesActividad = await BD.ProgramaSippeActividad.findAll({where : {idActividad : iAct.verID()},transaction});

        if(bdProgramaSIPPEesActividad.length > 0) {

            await Promise.all(
                bdProgramaSIPPEesActividad.map( async dbProgAct => {
                    const dbProg = await BD.ProgramaSippe.findByPk(dbProgAct.idProgramaSIPPE,{transaction});
                    if(dbProg){
                        salida.push( dbProg.idProgramaSIPPE );
                    }
                   
                } )
            )
        
        }

        return salida;

    }
    public static async verListaBD(transaction?: Transaction | undefined): Promise<IProgramaSIPPE[]> 
    { 
        let salida : IProgramaSIPPE[] = [];

        salida = await BD.ProgramaSippe.findAll({transaction});

        return salida;
    } ;
    public static async guardarPorActBD( iActividad :Actividad , listaIds : Map<ID_PROG_SIPPE,ESTADO_BD>, transaction ?: Transaction) : Promise<void> {

        if( listaIds.size < 0) {
            console.log('lista ids vacía , omitiendo...');
            return;
        }
        const listaProgramaSIPPEs = await Promise.all( Array.from(listaIds.keys()).map( async id => await ProgramaSIPPE.buscarPorIDBD(id,transaction)) );

        if( listaProgramaSIPPEs.length > 0) {
            listaProgramaSIPPEs.forEach( iProgramaSIPPE => {
                iProgramaSIPPE.cargarActividad(iActividad);
                switch(listaIds.get(iProgramaSIPPE.verID())){
                    case ESTADO_BD.A : iProgramaSIPPE.darDeAltaBD(); break;
                    case ESTADO_BD.B : iProgramaSIPPE.darDeBajaBD(); break;
                    default: break;
                } 
            }  );
            await Promise.all(listaProgramaSIPPEs.map( async iProgramaSIPPE => await iProgramaSIPPE.guardarEnBD(transaction)))
        }
        


     } 

}

export {ID_PROG_SIPPE,IProgramaSIPPE};

export default ProgramaSIPPE;