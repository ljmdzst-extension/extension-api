import { Op, Transaction } from "sequelize";
import { BD } from "../config/dbConfig";
import { ERROR } from "../logs/errores";
import Actividad, { ID_ACT } from "./Actividad";
import validator from "validator";
import { INVALIDO } from "../logs/validaciones";
import { ESTADO_BD } from "../types/general";


type ID_ENLACE = number;

interface IEnlace {
    idEnlace : ID_ENLACE,
    desc : string,
    link : string
}

class Enlace {

    public estadoEnBD !: number;

    constructor
    (
        private data : IEnlace,
        private iActividad ?: Actividad
    ){ 
        this.estadoEnBD = ESTADO_BD.A;
    }

    public verDatos() : IEnlace 
    { 
        return this.data;
    }

    public static async validar( data : IEnlace) : Promise<void> {
        await new BD.Enlace({...data,idActividad : 0}).validate({ skip : ['createdAt','updatedAt','deletedAt']})
    }
    public editarDatos( data : IEnlace){
        this.data = data;
        this.estadoEnBD = ESTADO_BD.M;
    }
    public estaDeBaja() : boolean 
    { 
        return this.estadoEnBD === ESTADO_BD.B;
    }
    private async darDeAltaBD( registro : IEnlace & {idActividad :number}, transaction ?: Transaction)
    {
        
        this.data.idEnlace = (await BD.Enlace.create(registro, { transaction})).dataValues.idEnlace;
    }
    private async darDeBajaBD( transaction ?: Transaction)
    {
        await BD.Enlace.destroy({where : {idEnlace : this.data.idEnlace} , transaction });
    }
    private async modificarBD( registro : IEnlace & {idActividad :number},transaction ?: Transaction)
    {   
        if(!await BD.Enlace.findByPk(registro.idEnlace, { transaction})){
            console.log(`enlace ${this.data.idEnlace} posiblemente dado de baja, restaurando...`)
            await BD.Enlace.restore({where : {idEnlace : registro.idEnlace}, transaction});
        }
        await BD.Enlace.update(registro,{where : {idEnlace : registro.idEnlace}, transaction});
       
    }

    public async guardarEnBD(transaction ?: Transaction ) : Promise<void> {
        console.log('Enlace.guardarEnBD');
        if(!this.iActividad) throw { status : 500, msg : `La Enlace ${this.data.idEnlace} no tienne una actividad asociada`}
        const registro = { ...this.data, idActividad : this.iActividad.verID() }

        switch (this.estadoEnBD) {
            case ESTADO_BD.A:
                await this.darDeAltaBD(registro,transaction);
                break;
            case ESTADO_BD.M:
                await this.modificarBD(registro,transaction);
                break;
            case ESTADO_BD.B:
                await this.darDeBajaBD(transaction)
                break;
            default:
                break;
        }
    }
    public static async buscarPorIDBD(id: number, transaction?: Transaction | undefined): Promise<Enlace> { 
        const bdEnlace = await BD.Enlace.findByPk(id,{transaction});
        if(!bdEnlace ) throw ERROR.ENLACE_INEXISTENTE;
        return new Enlace({
            idEnlace : bdEnlace.dataValues.idEnlace,
            link : bdEnlace.dataValues.link,
            desc : bdEnlace.dataValues.desc
        });
    } ;
    public static async buscarPorActBD(idAct: ID_ACT, transaction?: Transaction | undefined): Promise<Array<Enlace>> {

        let salida : Enlace[] = [];

        const bdEnlaces = await BD.Enlace.findAll({where : {idActividad : idAct},transaction});

        if(bdEnlaces.length > 0) {

            bdEnlaces.forEach( bdEnlace => salida.push( new Enlace({
                idEnlace : bdEnlace.dataValues.idEnlace,
                link : bdEnlace.dataValues.link,
                desc : bdEnlace.dataValues.desc
            }) ) )
        
        }

        return salida;

    }
    public static async modificarPorActBD( iActividad : Actividad ,listaEnlaces : Enlace[], transaction ?: Transaction ): Promise<void> {


        const listaBajaEnlaces = iActividad.verDatos().listaEnlaces?.filter( 
            iEnlace => listaEnlaces.every( nEnlace => nEnlace.data.idEnlace !== iEnlace.idEnlace  
        ) ) || [];
        
        if(listaBajaEnlaces.length){
            const idEnlaceOptions =  { 
                [Op.or] : listaBajaEnlaces.map( enlace => enlace.idEnlace)  
            } 
            const whereOptions =  { 
                idActividad : iActividad.verID(), 
                idEnlace : idEnlaceOptions
            } ;
            await BD.Enlace.destroy( {  where : whereOptions, transaction} )
        }

        await Promise.all( 
            listaEnlaces.map( async enlace => {
                const whereOptions = { idActividad : iActividad.verID(), idEnlace : enlace.data.idEnlace};
                const defaultOptions = {...enlace.verDatos(), idActividad : iActividad.verID()};
                const [iEnlace, creado ] = await BD.Enlace.findOrCreate( { where : whereOptions, defaults : defaultOptions, transaction } );
                if(!creado){
                    await iEnlace.update(enlace.verDatos(),{transaction : transaction});
                }
            })
         )


       

    }
}

export {ID_ENLACE,IEnlace}
export default Enlace;