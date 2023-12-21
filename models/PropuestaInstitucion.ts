import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface PropuestaInstitucionAttributes {
  idInstitucion: number;
  codigoPropuesta: string;
  antecedentes?: string;
  valoracion?: number;
}

export type PropuestaInstitucionPk = "idInstitucion" | "codigoPropuesta";
export type PropuestaInstitucionId = PropuestaInstitucion[PropuestaInstitucionPk];
export type PropuestaInstitucionOptionalAttributes = "antecedentes" | "valoracion" ;
export type PropuestaInstitucionCreationAttributes = Optional<PropuestaInstitucionAttributes, PropuestaInstitucionOptionalAttributes>;

export class PropuestaInstitucion extends Model<PropuestaInstitucionAttributes, PropuestaInstitucionCreationAttributes> implements PropuestaInstitucionAttributes {
  idInstitucion!: number;
  codigoPropuesta!: string;
  antecedentes?: string;
  valoracion?: number;



  static initModel(sequelize: Sequelize.Sequelize): typeof PropuestaInstitucion {
    return PropuestaInstitucion.init({
    idInstitucion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    codigoPropuesta: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    antecedentes: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    valoracion: {
      type: DataTypes.INTEGER,
      allowNull: true
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
