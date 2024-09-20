import * as Sequelize from 'sequelize';
import { domain } from '../../../domain';

import { InstitucionActividad } from './models/InstitucionActividad';
import { Institucion,InstitucionCreationAttributes } from './models/Institucion';

export default class MInstitucion implements domain.IModelInstitucion {
    constructor(
      private sequelize : Sequelize.Sequelize,
      private transaction ?: Sequelize.Transaction
    ){}

    public async findByPk(pk: number): Promise<domain.Institucion | null> {
      let salida : domain.Institucion | null= null;

      await Institucion.initModel(this.sequelize)
        .findOne({where : {idInstitucion : pk},transaction : this.transaction})
        .then( resp => {
          if(resp){
            salida =  new domain.Institucion(resp.dataValues) 
          }
        });


      return salida;
    }
    public async findAll(): Promise<domain.Institucion[]> {
      let salida : domain.Institucion[] = [];

      await Institucion.initModel(this.sequelize)
        .findAll({transaction : this.transaction})
        .then( resp => {
          if(resp.length > 0){
            salida = resp.map( i =>  new domain.Institucion(i.dataValues) )
          }
        });


      return salida;
    }
    public async findOne(params: InstitucionCreationAttributes): Promise<domain.Institucion | null> {
      let salida : domain.Institucion | null= null;

      await Institucion.initModel(this.sequelize)
        .findOne({where : { ...params},transaction : this.transaction})
        .then( resp => {
          if(resp){
            salida =  new domain.Institucion(resp.dataValues) 
          }
        });


      return salida;
    }
    public async findBy(params: InstitucionCreationAttributes,offset?: number, limit?: number): Promise<domain.Institucion[]> {
      let salida : domain.Institucion[] = [];

      await Institucion.initModel(this.sequelize)
        .findAll({
          where : { 
            [Sequelize.Op.or] : {
              idInstitucion : params.idInstitucion,
              nom : { [Sequelize.Op.like] : `${params.nom}%` }, 
              dom : { [Sequelize.Op.like] : `${params.dom}%` }, 
              email : { [Sequelize.Op.like] : `${params.email}%` }, 
              tel : { [Sequelize.Op.like] : `${params.tel}%` }, 
              ubicacion : { [Sequelize.Op.like] : `${params.ubicacion}%` }, 
            }
           
          },
          offset ,
          limit ,
          transaction : this.transaction
        })
        .then( resp => {
          if(resp.length > 0){
            salida = resp.map( i =>  new domain.Institucion(i.dataValues) )
          }
        });


      return salida;
    }
    public async save( i : domain.Institucion ): Promise<domain.Institucion> {
       const dbInstitucion = Institucion.initModel(this.sequelize).build(i.verDatos());
       dbInstitucion.isNewRecord = i.verDatos().idInstitucion > 0;
       await dbInstitucion.save({transaction : this.transaction})
        .then( resp => {
            i.editarDatos( resp.dataValues )
        });
       return i;
    }
    public async destroy( i : domain.Institucion ): Promise<boolean> {
      const resp = await Institucion.initModel(this.sequelize).destroy({where : { idInstitucion : i.verDatos().idInstitucion}, transaction : this.transaction});

      return resp > 0;
    }
    public async update( i : domain.Institucion ): Promise<domain.Institucion> {
      const dbInstitucion = Institucion.initModel(this.sequelize).build(i.verDatos());
       dbInstitucion.isNewRecord = i.verDatos().idInstitucion > 0;
       await dbInstitucion.save({transaction : this.transaction})
        .then( resp => {
            i.editarDatos( resp.dataValues )
        });
       return i;
    }

    public async buscarPorActividad(a : domain.Actividad) : Promise<domain.TDataInstitucion[]> {
        let salida : domain.TDataInstitucion[] = [];
        const instAsociadas = await InstitucionActividad.initModel(this.sequelize).findAll({where : {idActividad : a.verDatos().idActividad},transaction : this.transaction});
        if(instAsociadas.length > 0) {
           salida = await Institucion.initModel(this.sequelize).findAll({where : { idInstitucion : instAsociadas.map( inst => inst.idInstitucion ) }, transaction : this.transaction});
        }
        return salida;
    
      }
}