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
        console.log(this.data.idUbicacion)
        console.log(this.estadoEnBD === ESTADO_BD.M);
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

        this.data.idUbicacion = (await BD.Ubicacion.create(this.verDatos(),{transaction})).dataValues.idUbicacion;
        
        const registro = { idUbicacion : this.data.idUbicacion, idActividad : this.iActividad.verID() }

        if(await BD.UbicacionActividad.findOne({where : registro, paranoid : false,transaction})){
            await BD.UbicacionActividad.restore({where : registro, transaction });
        }else {
            await BD.UbicacionActividad.create(registro,{ transaction });
        }
        
    }
    private async darDeBajaBD(transaction ?: Transaction)
    {

       const resp =  await BD.UbicacionActividad.destroy({where : {
            idUbicacion : this.data.idUbicacion , 
            idActividad : this.iActividad?.verID()
        } , transaction });
       if(resp < 1) throw ERROR.UBICACION_BAJA_BD;
    }
    private async modificarBD(transaction ?: Transaction)
    {
        if(!this.iActividad) throw ERROR.ACTIVIDAD_UBICACION;

        if(!await BD.Ubicacion.findByPk(this.data.idUbicacion, { transaction })){
            throw ERROR.UBICACION_INEXISTENTE;
        }
        await BD.Ubicacion.update(this.verDatos(),{where : {idUbicacion : this.data.idUbicacion}, transaction});
        
                
        const registro = { idUbicacion : this.data.idUbicacion, idActividad : this.iActividad.verID() }

        if(await BD.UbicacionActividad.findOne({where : registro, paranoid : false,transaction})){
            await BD.UbicacionActividad.restore({where : registro, transaction });
        }else {
            await BD.UbicacionActividad.create(registro,{ transaction });
        }

    }
    
    public estaDeBaja() : boolean 
    { 
        return this.estadoEnBD === ESTADO_BD.B;
    }
    public static async buscarAsociadasPorActBD( iActividad : Actividad, transaction?: Transaction | undefined)
    : Promise<ID_UBICACION[]> {
        
        let salida : ID_UBICACION[] = [];

       const asociadas = await BD.UbicacionActividad.findAll({where : {idActividad : iActividad.verID()},transaction});

       if(asociadas.length > 0){
        salida.push(...asociadas.map(ubic => ubic.idUbicacion))
       }
       return salida;
    
    }
    public static async buscarPorActBD(listaIds : ID_UBICACION[], iActividad : Actividad, transaction?: Transaction | undefined): Promise<void> {

        if(process.env.NODE_ENV === "development")console.log('cargando ubicaciones')
        const ubicaciones = await BD.Ubicacion.findAll({where : {idUbicacion : listaIds}});
        iActividad.cargarUbicaciones ( ubicaciones );
    


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