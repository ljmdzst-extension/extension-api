import { Transaction, where } from "sequelize";
import { BD } from "../config/dbConfig";
import Actividad, { ID_ACT } from "./Actividad";
import { ERROR } from "../logs/errores";
import validator from "validator";
import { INVALIDO } from "../logs/validaciones";
import { ESTADO_BD } from "../types/general";


type ID_UBICACION= number;

interface IUbicacion {
    idUbicacion : ID_UBICACION,
    enlace : string
}


class Ubicacion {

    public estadoEnBD !: ESTADO_BD;

    constructor (  
        private data : IUbicacion,
        private iActividad ?: Actividad
    ){
        this.estadoEnBD = ESTADO_BD.A;
     }

    public verDatos() : IUbicacion 
    { 
        return this.data;
    }
    
    public editarDatos( data : IUbicacion)
    {
        this.data = data;
        this.estadoEnBD = ESTADO_BD.M
    }
 
    public static async validar  ( data : IUbicacion) : Promise<void> 
    {
        await new BD.Ubicacion(data).validate({ skip : ['createdAt','updatedAt','deletedAt']})
    }
    
    /**------------------------ CONEXION BD---------------------- */
    public async guardarEnBD(transaction ?: Transaction ) : Promise<void> 
    {
        console.log('Ubicacion.guardarEnBD');

        switch (this.estadoEnBD) {
            case ESTADO_BD.A:
                await this.darDeAltaBD(transaction);
                break;
            case ESTADO_BD.M:
                await this.modificarBD(transaction);
                break;
            case ESTADO_BD.B:
                await this.darDeBajaBD(transaction)
            default:
                break;
        }
    }
    
    private async darDeAltaBD(transaction ?: Transaction )
    {
        if(!this.iActividad) throw ERROR.ACTIVIDAD_UBICACION;
        const registro = { ...this.verDatos(), idActividad : this.iActividad.verID() }

        this.data.idUbicacion = (await BD.Ubicacion.create(registro,{transaction})).dataValues.idUbicacion;
    }
    private async darDeBajaBD(transaction ?: Transaction)
    {
       const resp =  await BD.Ubicacion.destroy({where : {idUbicacion : this.data.idUbicacion} , transaction });
       if(resp < 1) throw ERROR.UBICACION_BAJA_BD;
    }
    private async modificarBD(transaction ?: Transaction)
    {
        if(!this.iActividad) throw ERROR.ACTIVIDAD_UBICACION;
        const registro = { ...this.verDatos(), idActividad : this.iActividad.verID() }
        if(!await BD.Ubicacion.findByPk(this.data.idUbicacion, { transaction})){
            console.log(`ubicacion ${this.data.idUbicacion} posiblemente dada de baja, restaurando...`)
            await BD.Ubicacion.restore({where : { idUbicacion : this.data.idUbicacion}, transaction});
        }
        const resp = await BD.Ubicacion.update(registro,{where : {idUbicacion : registro.idUbicacion}, transaction});
        if(resp[0] < 1) throw ERROR.UBICACION_MOD_BD;
    }
    
    public estaDeBaja() : boolean 
    { 
        return this.estadoEnBD === ESTADO_BD.B;
    }

    public static async buscarPorActBD(idAct: ID_ACT, transaction?: Transaction | undefined): Promise<Array<Ubicacion>> {

        let salida : Ubicacion[] = [];

        const bdUbicaciones = await BD.UbicacionActividad.findAll({where : {idActividad : idAct},transaction});

        if(bdUbicaciones.length > 0) {
            const ubicaciones = await BD.Ubicacion.findAll({where : {idUbicacion : bdUbicaciones.map(ubic => ubic.idUbicacion)}}) ;
            salida.push( ...ubicaciones.map( ubic => new Ubicacion(ubic.dataValues)) ) 
        
        }

        return salida;

    }
    public static async buscarPorIDBD(id: ID_UBICACION, transaction?: Transaction | undefined): Promise<Ubicacion> {
        const bdUbicacion = await BD.Ubicacion.findByPk(id,{transaction}) ;

        if(!bdUbicacion ) throw ERROR.UBICACION_INEXISTENTE;

        return new Ubicacion({
            idUbicacion : bdUbicacion.dataValues.idUbicacion,
            enlace : bdUbicacion.dataValues.enlace
            
        }) ;   
    }
}

export {ID_UBICACION,IUbicacion}
export default Ubicacion;