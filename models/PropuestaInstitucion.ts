import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Propuesta, PropuestaId } from './Propuesta';

export interface PropuestaInstitucionAttributes {
  idInstitucion: number;
  codigoPropuesta: string;
  antecedentes?: string;
  valoracion?: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type PropuestaInstitucionPk = "idInstitucion" | "codigoPropuesta";
export type PropuestaInstitucionId = PropuestaInstitucion[PropuestaInstitucionPk];
export type PropuestaInstitucionOptionalAttributes = "antecedentes" | "valoracion" | "createdAt" | "updatedAt" | "deletedAt";
export type PropuestaInstitucionCreationAttributes = Optional<PropuestaInstitucionAttributes, PropuestaInstitucionOptionalAttributes>;

export class PropuestaInstitucion extends Model<PropuestaInstitucionAttributes, PropuestaInstitucionCreationAttributes> implements PropuestaInstitucionAttributes {
  idInstitucion!: number;
  codigoPropuesta!: string;
  antecedentes?: string;
  valoracion?: number;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof PropuestaInstitucion {
    return PropuestaInstitucion.init({
    idInstitucion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Institucion',
        key: 'idInstitucion'
      }
    },
    codigoPropuesta: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Propuesta',
        key: 'codigoPropuesta'
      }
    },
    antecedentes: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    valoracion: {
      type: DataTypes.INTEGER,
      allowNull: true
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
    tableName: 'PropuestaInstitucion',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idInstitucion" },
          { name: "codigoPropuesta" },
        ]
      },
      {
        name: "fk_PropuestaInstitucion_Institucion1_idx",
        using: "BTREE",
        fields: [
          { name: "idInstitucion" },
        ]
      },
      {
        name: "fkPropuestaInstitucionPropuesta1_idx",
        using: "BTREE",
        fields: [
          { name: "codigoPropuesta" },
        ]
      },
    ]
  });
  }
}
