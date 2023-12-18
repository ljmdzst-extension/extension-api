import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Propuesta, PropuestaId } from './Propuesta';

export interface UsuarioAttributes {
  idUsuario: string;
  nroDoc: string;
  email: string;
  pass: string;
  idUnidadAcademica: number;
  pendiente: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type UsuarioPk = "idUsuario";
export type UsuarioId = Usuario[UsuarioPk];
export type UsuarioOptionalAttributes = "pendiente" | "createdAt" | "updatedAt" | "deletedAt";
export type UsuarioCreationAttributes = Optional<UsuarioAttributes, UsuarioOptionalAttributes>;

export class Usuario extends Model<UsuarioAttributes, UsuarioCreationAttributes> implements UsuarioAttributes {
  idUsuario!: string;
  nroDoc!: string;
  email!: string;
  pass!: string;
  idUnidadAcademica!: number;
  pendiente!: number;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;

  // Usuario hasMany Propuesta via idUsuario
  Propuesta!: Propuesta[];
  getPropuesta!: Sequelize.HasManyGetAssociationsMixin<Propuesta>;
  setPropuesta!: Sequelize.HasManySetAssociationsMixin<Propuesta, PropuestaId>;
  addPropuestum!: Sequelize.HasManyAddAssociationMixin<Propuesta, PropuestaId>;
  addPropuesta!: Sequelize.HasManyAddAssociationsMixin<Propuesta, PropuestaId>;
  createPropuestum!: Sequelize.HasManyCreateAssociationMixin<Propuesta>;
  removePropuestum!: Sequelize.HasManyRemoveAssociationMixin<Propuesta, PropuestaId>;
  removePropuesta!: Sequelize.HasManyRemoveAssociationsMixin<Propuesta, PropuestaId>;
  hasPropuestum!: Sequelize.HasManyHasAssociationMixin<Propuesta, PropuestaId>;
  hasPropuesta!: Sequelize.HasManyHasAssociationsMixin<Propuesta, PropuestaId>;
  countPropuesta!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Usuario {
    return Usuario.init({
    idUsuario: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    nroDoc: {
      type: DataTypes.STRING(9),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    pass: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    idUnidadAcademica: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pendiente: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1
    },
    createdAt : {
      type : DataTypes.DATE,
      allowNull : false
    },
    updatedAt : {
      type : DataTypes.DATE,
      allowNull : false
    },
    deletedAt : {
      type : DataTypes.DATE,
      allowNull : true
    }
  }, {
    sequelize,
    tableName: 'Usuario',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idUsuario" },
        ]
      },
      {
        name: "fkUsuarioPersona1_idx",
        using: "BTREE",
        fields: [
          { name: "nroDoc" },
        ]
      },
    ]
  });
  }
}
