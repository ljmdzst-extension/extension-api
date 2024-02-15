import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Institucion, InstitucionId } from './Institucion';
import type { Persona, PersonaId } from './Persona';

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

  // Responsable belongsTo Institucion via idInstitucion
  idInstitucionInstitucion!: Institucion;
  getIdInstitucionInstitucion!: Sequelize.BelongsToGetAssociationMixin<Institucion>;
  setIdInstitucionInstitucion!: Sequelize.BelongsToSetAssociationMixin<Institucion, InstitucionId>;
  createIdInstitucionInstitucion!: Sequelize.BelongsToCreateAssociationMixin<Institucion>;
  // Responsable belongsTo Persona via nroDoc
  nroDocPersona!: Persona;
  getNroDocPersona!: Sequelize.BelongsToGetAssociationMixin<Persona>;
  setNroDocPersona!: Sequelize.BelongsToSetAssociationMixin<Persona, PersonaId>;
  createNroDocPersona!: Sequelize.BelongsToCreateAssociationMixin<Persona>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Responsable {
    return Responsable.init({
    idInstitucion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Institucion',
        key: 'idInstitucion'
      }
    },
    nroDoc: {
      type: DataTypes.STRING(9),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Persona',
        key: 'nroDoc'
      }
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
    paranoid: true
  });
  }
}
