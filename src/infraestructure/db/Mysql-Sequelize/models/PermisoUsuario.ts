import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import  { Permiso, PermisoId } from './Permiso';
import { domain } from '../../../../domain';

export interface PermisoUsuarioAttributes {
  idUsuario: string;
  idPermiso: number;

}

export type PermisoUsuarioPk = "idUsuario" | "idPermiso" ;
export type PermisoUsuarioId = PermisoUsuario[PermisoUsuarioPk];
export type PermisoUsuarioCreationAttributes = PermisoUsuarioAttributes;

export class PermisoUsuario extends Model<PermisoUsuarioAttributes, PermisoUsuarioCreationAttributes> implements PermisoUsuarioAttributes {
  idUsuario!: string;
  idPermiso!: number;

  static async verPermisos( idUsuario : string, transaction ?: Sequelize.Transaction ) : Promise<domain.Permiso[]> {
    let salida : domain.Permiso[] = [];
    const cDbAsociaciones = await PermisoUsuario.findAll({where : { idUsuario : idUsuario },transaction});
    
    if(cDbAsociaciones.length > 0) {
       const cDbPermisos = await Permiso.findAll({where : { idPermiso : cDbAsociaciones.map( p => p.idPermiso) },transaction});
       if(cDbPermisos) {
        salida = cDbPermisos.map( dbP =>  new domain.Permiso(dbP.dataValues) ) ;
       }
    }
    return salida;
  }


  static initModel(sequelize: Sequelize.Sequelize): typeof PermisoUsuario {
    return PermisoUsuario.init({
    idUsuario: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Usuario',
        key: 'idUsuario'
      }
    },
    idPermiso: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Permiso',
            key: 'idPermiso'
        }
    }
  }, {
    sequelize,
    tableName: 'PermisoUsuario',
    timestamps: true,
    paranoid : true
  });
  }
}
