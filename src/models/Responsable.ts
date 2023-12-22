import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface ResponsableAttributes {
  idInstitucion: number;
  nroDoc: string;
  desde: string;
  hasta?: string;
}

export type ResponsablePk = "idInstitucion" | "nroDoc";
export type ResponsableId = Responsable[ResponsablePk];
export type ResponsableOptionalAttributes = "hasta" ;
export type ResponsableCreationAttributes = Optional<ResponsableAttributes, ResponsableOptionalAttributes>;

export class Responsable extends Model<ResponsableAttributes, ResponsableCreationAttributes> implements ResponsableAttributes {
  idInstitucion!: number;
  nroDoc!: string;
  desde!: string;
  hasta?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof Responsable {
    return Responsable.init({
    idInstitucion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nroDoc: {
      type: DataTypes.STRING(9),
      allowNull: false,
      primaryKey: true
    },
    desde: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    hasta: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Responsable',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idInstitucion" },
          { name: "nroDoc" },
        ]
      },
      {
        name: "fkResponsablePersona1_idx",
        using: "BTREE",
        fields: [
          { name: "nroDoc" },
        ]
      },
    ]
  });
  }
}