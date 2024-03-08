import { FindOptions, Op, Transaction } from "sequelize";
import Actividad from "./Actividad";
import { BD } from "../config/dbConfig";
import validator from "validator";
import { INVALIDO } from "../logs/validaciones";
import { ESTADO_BD } from "../types/general";
import { ERROR } from "../logs/errores";

export type ID_INSTITUCION = number;

export interface IInstitucion {
    idInstitucion : ID_INSTITUCION,
    nom : string,
    ubicacion : string
}

/* 
  IMPLEMENTAR CONEXION A api db_instituciones 
  .....
*/

class Institucion {
    
    public estadoEnBD !: number;

    constructor 
    ( 
        private  data : IInstitucion,
        private iActividad ?: Actividad
    ){
        this.estadoEnBD = ESTADO_BD.A;
    }

    public verDatos () :IInstitucion {
        return {...this.data}
    }
    public editarDatos ( data : IInstitucion ) {
        this.data = data;
    } 
    public static validar( data : IInstitucion) : void {
        if(!(validator.isLength(data.nom,{ min : 1, max : 256 }))) throw INVALIDO.NOM_INSTITUCION;
        if(!(validator.isURL(data.ubicacion))) throw INVALIDO.UBIC_INSTITUCION;
    }
    /** Conexion BD */
     public darDeAltaBD()
     {
         this.estadoEnBD = ESTADO_BD.A;
     }
     public darDeBajaBD()
     {
        this.estadoEnBD = ESTADO_BD.B;
     }
     public estaDeBaja() : boolean { 
        return this.estadoEnBD === ESTADO_BD.B;
    }
 
    public async guardarEnBD(transaction ?: Transaction,transactionInstituciones ?: Transaction ) : 
    Promise<void> {
         console.log('Institucion.guardarEnBD..');
         
         switch (this.estadoEnBD) {
             case ESTADO_BD.A:
                 await this.darDeAlta(transaction,transactionInstituciones);
                 break;
             case ESTADO_BD.B:
                 await this.darDeBaja(transaction,transactionInstituciones);
                 break;
             default:
                 break;
         }
     }

    private async darDeAlta(transaction?: Transaction | undefined, transactionInstituciones ?: Transaction | undefined) : 
    Promise<void>{
       
        if(!this.iActividad) throw {status : 500 , msg :'Error - la institucion no tiene actividad asociada'};

        const institucionCargada = await BD.Institucion.findOne({ where : { nom : this.data.nom}, transaction : transactionInstituciones});
        
        if(institucionCargada){

           
            this.data.idInstitucion = institucionCargada.dataValues.idInstitucion;
        } else {
            this.data.idInstitucion = (await BD.Institucion.create(this.data,{transaction : transactionInstituciones})).dataValues.idInstitucion;
           
        }
        
        const registro = {
            idInstitucion : this.data.idInstitucion , 
            idActividad : this.iActividad.verID()  
        };

        if(await BD.InstitucionActividad.findOne({where : registro, paranoid : false, transaction})){
            await BD.InstitucionActividad.restore({ where :registro, transaction });
         } else {
            await BD.InstitucionActividad.create(registro, { transaction});
         }

       



    };
    private async darDeBaja(transaction?: Transaction | undefined, transactionInstituciones ?: Transaction | undefined): Promise<void>{
        if(!this.iActividad) throw {status : 500 , msg :'Error - la institucion no tiene actividad asociada'};
        await BD.InstitucionActividad.destroy(
            {
                where : {
                    idInstitucion : this.data.idInstitucion,
                    idActividad : this.iActividad.verID()    
                },
                transaction
            }

        );
    };
  
    
    public static async buscarPorIDBD( id : ID_INSTITUCION ): 
    Promise<Institucion>{
        // buscar en db_instituciones si existe una institucion con el id
        const institucion =await BD.Institucion.findByPk(id);
        if(!institucion) throw ERROR.INSTITUCION_INEXISTENTE;
        // crear una institucion con el mismo y devolver la data
        return new Institucion({
            ...institucion.dataValues,
            ubicacion : institucion.ubicacion || '#'
        });
    };
    
    public static async buscarPorActBD(iAct: Actividad, transaction?: Transaction | undefined, transactionInstituciones ?: Transaction | undefined): 
    Promise<Institucion[]>{
        // buscar en db_Institucionsv2 si existen relaciones
        // obtener de firestore cada institucion por id encontrado
        let salida : Institucion[] = [];
        const relaciones = await BD.InstitucionActividad.findAll({where : {idActividad : iAct.verID()},transaction});
        if(!relaciones.length){
            console.log('no se encontraron instituciones relacionadas, omitiendo...');
            return salida;
        }
     
        const instituciones = await BD.Institucion.findAll({ 
            attributes : ['idInstitucion','nom','ubicacion'],
            where : { idInstitucion : { [Op.or] :  relaciones.map(rel => rel.idInstitucion)} }, 
            transaction : transactionInstituciones})
     
        if(!instituciones.length) throw {status : 500, msg : 'no existen insituciones con esos ids'}
        
        instituciones.forEach(async institucion => salida.push(
            new Institucion({...institucion.dataValues, ubicacion : institucion.dataValues.ubicacion || '#'},iAct))
        )

        return salida;
    };

    public static async buscarPorPalabraClave ( query ?: string, offset ?: number, limit ?: number, transactionInstituciones ?: Transaction ) : 
    Promise<Institucion[]> { 

        

        let salida : Institucion[]  = [];

        let opcionesBusqueda : FindOptions  = { 
            attributes : ['idInstitucion','nom','ubicacion'],
            offset : Number(offset) || 0,
            limit : Number(limit) || 10, 
            transaction : transactionInstituciones
        };

        if(query?.length) {
            
           opcionesBusqueda = {...opcionesBusqueda, where : { nom : { [Op.like] : `${query}%` } } }
        }

        const instituciones = await BD.Institucion.findAll( opcionesBusqueda );

        if(instituciones.length) {
            salida = instituciones.map( bdInstitucion => new Institucion(
                    {...bdInstitucion.dataValues, ubicacion : bdInstitucion.dataValues.ubicacion || '#'}
                ));
        }

        return salida;
    }
    
}

export default Institucion;