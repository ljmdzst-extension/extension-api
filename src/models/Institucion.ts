import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { InstitucionActividad } from './InstitucionActividad';
import { BD } from '../config/dbConfig';
import { ESTADO_BD } from '../types/general';
import { Actividad } from './Actividad';
import { ERROR } from '../logs/errores';

export interface InstitucionAttributes {
  idInstitucion: number;
  nom: string;
  dom?: string | null;
  email?: string | null;
  tel?: string | null;
  ubicacion?: string | null;
}

export type InstitucionPk = "idInstitucion";
export type InstitucionId = Institucion[InstitucionPk];
export type InstitucionOptionalAttributes = "idInstitucion" | "dom" | "email" | "tel" | "ubicacion" ;
export type InstitucionCreationAttributes = Optional<InstitucionAttributes, InstitucionOptionalAttributes>;

// type TInstitucion = InstitucionAttributes;

const INSTITUCION_ATTRIBUTES = {
  idInstitucion: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  nom: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  dom: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  tel: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  ubicacion: {
    type: DataTypes.STRING(2083),
    allowNull: true
  }
}

export class Institucion extends Model<InstitucionAttributes, InstitucionCreationAttributes> implements InstitucionAttributes {
  idInstitucion!: number;
  nom!: string;
  dom?: string;
  email?: string;
  tel?: string;
  ubicacion?: string;


  // public estadoEnBD !: number;
  
  // private lInstitucionActividad !: InstitucionActividad[];

  // public static crear( data  : TInstitucion ) {
  //   const institucion = BD.Institucion.build(data);
    
  //   institucion.lInstitucionActividad = [];
  //   return institucion;
  // }

  // public verDatos () : TInstitucion {
  //     return this.dataValues;
  // }
  // public editarDatos ( data :  TInstitucion & {lInstitucionActividad : InstitucionActividad[]} ) {
  //    const {lInstitucionActividad , ...dataInst} = data;  
  //   this.set(dataInst);

  //   this.lInstitucionActividad = lInstitucionActividad;
  // } 
  // /** Conexion BD */
  //  public darDeAltaBD()
  //  {
  //      this.estadoEnBD = ESTADO_BD.A;
  //  }
  //  public darDeBajaBD()
  //  {
  //     this.estadoEnBD = ESTADO_BD.B;
  //  }
  //  public estaDeBaja() : boolean { 
  //     return this.estadoEnBD === ESTADO_BD.B;
  // }

  // public async guardarEnBD(transaction ?: Sequelize.Transaction ) : 
  // Promise<void> {
  //      console.log('Institucion.guardarEnBD..');
       
  //      switch (this.estadoEnBD) {
  //          case ESTADO_BD.A:
  //              await this.darDeAlta(transaction);
  //              break;
  //          case ESTADO_BD.B:
  //              await this.darDeBaja(transaction);
  //              break;
  //          default:
  //              break;
  //      }
  //  }

  // private async darDeAlta(transaction?: Sequelize.Transaction | undefined) : 
  // Promise<void>{
     
  //     if(this.lInstitucionActividad.length < 1) throw {status : 500 , msg :'Error - la institucion no tiene actividad asociada'};

  //     const institucionCargada = await BD.Institucion.findOne({ where : { nom : this.nom}, transaction });
      
  //     if(institucionCargada){

         
  //         this.idInstitucion = institucionCargada.dataValues.idInstitucion;
  //     } else {
  //         this.idInstitucion = (await BD.Institucion.create(this,{ transaction})).dataValues.idInstitucion;
         
  //     }
      
  //     const registro = {
  //         idInstitucion : this.idInstitucion , 
  //         idActividad : this.lInstitucionActividad[0].idActividad 
  //     };

  //     if(await BD.InstitucionActividad.findOne({where : registro, paranoid : false, transaction})){
  //         await BD.InstitucionActividad.restore({ where :registro,transaction });
  //      } else {
  //         await BD.InstitucionActividad.create(registro, { transaction});
  //      }

     



  // };
  // private async darDeBaja(transaction?: Sequelize.Transaction | undefined): Promise<void>{
  //     if(this.lInstitucionActividad.length < 1) throw {status : 500 , msg :'Error - la institucion no tiene actividad asociada'};
  //     await BD.InstitucionActividad.destroy(
  //         {
  //             where : {
  //                 idInstitucion : this.idInstitucion,
  //                 idActividad : this.lInstitucionActividad[0].idActividad 
  //             },
  //             transaction
  //         }

  //     );
  // };

  
  // public static async buscarPorIDBD( id : InstitucionId ): 
  // Promise<Institucion>{
  //     // buscar en db_instituciones si existe una institucion con el id
  //     const institucion =await BD.Institucion.findByPk(id);
  //     if(!institucion) throw ERROR.INSTITUCION_INEXISTENTE;
  //     // crear una institucion con el mismo y devolver la data
  //     return new Institucion({
  //         ...institucion.dataValues,
  //         ubicacion : institucion.ubicacion || '#'
  //     });
  // };
  
  // public static async buscarPorActBD(iAct: Actividad, transaction?: Sequelize.Transaction | undefined): 
  // Promise<Institucion[]>{

  //     let salida : Institucion[] = [];
  //     const relaciones = await BD.InstitucionActividad.findAll({where : {idActividad : iAct.verID()},transaction});
  //     if(!relaciones.length){
  //         console.log('no se encontraron instituciones relacionadas, omitiendo...');
  //         return salida;
  //     }
   
  //     const instituciones = await BD.Institucion.findAll({ 
  //         attributes : ['idInstitucion','nom','ubicacion'],
  //         where : { idInstitucion : { [Sequelize.Op.or] :  relaciones.map(rel => rel.idInstitucion)} }, 
  //         transaction 
  //       })
   
  //     if(!instituciones.length) throw {status : 500, msg : 'no existen insituciones con esos ids'}
      
  //     instituciones.forEach(async institucion => salida.push(
  //         new Institucion({...institucion.dataValues, ubicacion : institucion.dataValues.ubicacion || '#'},iAct))
  //     )

  //     return salida;
  // };

  // public static async buscarPorPalabraClave ( query ?: string, offset ?: number, limit ?: number, transaction ?: Sequelize.Transaction ) : 
  // Promise<Institucion[]> { 

      

  //     let salida : Institucion[]  = [];

  //     let opcionesBusqueda : Sequelize.FindOptions  = { 
  //         attributes : ['idInstitucion','nom','ubicacion'],
  //         offset : Number(offset) || 0,
  //         limit : Number(limit) || 10, 
  //         transaction
  //     };

  //     if(query?.length) {
          
  //        opcionesBusqueda = {...opcionesBusqueda, where : { nom : { [Sequelize.Op.like] : `${query}%` } } }
  //     }

  //     const instituciones = await BD.Institucion.findAll( opcionesBusqueda );

  //     if(instituciones.length) {
  //         salida = instituciones.map( bdInstitucion => new Institucion(
  //                 {...bdInstitucion.dataValues, ubicacion : bdInstitucion.dataValues.ubicacion || '#'}
  //             ));
  //     }

  //     return salida;
  // }
  static initModel(sequelize: Sequelize.Sequelize): typeof Institucion {
    return Institucion.init(INSTITUCION_ATTRIBUTES, {
    sequelize,
    tableName: 'Institucion',
    timestamps: true,
    paranoid: true
  });
  }
}
