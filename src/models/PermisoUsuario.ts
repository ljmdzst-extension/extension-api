import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import type { Usuario, UsuarioId } from './Usuario';
import type { Permiso, PermisoId } from './Permiso';

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

  // PermisoUsuario belongsTo Usuario via idUsuario
  usuario!: Usuario;
  getUsuario!: Sequelize.BelongsToGetAssociationMixin<Usuario>;
  setUsuario!: Sequelize.BelongsToSetAssociationMixin<Usuario, UsuarioId>;
  createUsuario!: Sequelize.BelongsToCreateAssociationMixin<Usuario>;

  // PermisoUsuario belongsTo Permiso via idPermiso
  Permiso!: Permiso;
  getPermiso!: Sequelize.BelongsToGetAssociationMixin<Permiso>;
  setPermiso!: Sequelize.BelongsToSetAssociationMixin<Permiso, PermisoId>;
  createPermiso!: Sequelize.BelongsToCreateAssociationMixin<Permiso>;

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
