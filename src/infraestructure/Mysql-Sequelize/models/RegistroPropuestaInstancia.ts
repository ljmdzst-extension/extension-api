import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Institucion, InstitucionId } from './Institucion';
import type { Persona, PersonaId } from './Persona';

export interface RegistroPropuestaInstanciaAttributes {
  idInstancia: number;
  codigoPropuesta: string;
  detalle ?: string;
}

export type RegistroPropuestaInstanciaPk = "idInstancia" | "codigoPropuesta";
export type RegistroPropuestaInstanciaId = RegistroPropuestaInstancia[RegistroPropuestaInstanciaPk];
export type RegistroPropuestaInstanciaOptionalAttributes = "detalle" ;
export type RegistroPropuestaInstanciaCreationAttributes = Optional<RegistroPropuestaInstanciaAttributes, RegistroPropuestaInstanciaOptionalAttributes>;

export class RegistroPropuestaInstancia extends Model<RegistroPropuestaInstanciaAttributes, RegistroPropuestaInstanciaCreationAttributes> implements RegistroPropuestaInstanciaAttributes {
  idInstancia!: number;
  codigoPropuesta!: string;
  detalle ?: string;

  // RegistroPropuestaInstancia belongsTo Institucion via idInstancia
  institucion!: Institucion;
  getInstitucion!: Sequelize.BelongsToGetAssociationMixin<Institucion>;
  setInstitucion!: Sequelize.BelongsToSetAssociationMixin<Institucion, InstitucionId>;
  createInstitucion!: Sequelize.BelongsToCreateAssociationMixin<Institucion>;
  // RegistroPropuestaInstancia belongsTo Persona via codigoPropuesta
  persona!: Persona;
  getPersona!: Sequelize.BelongsToGetAssociationMixin<Persona>;
  setPersona!: Sequelize.BelongsToSetAssociationMixin<Persona, PersonaId>;
  createPersona!: Sequelize.BelongsToCreateAssociationMixin<Persona>;

  static initModel(sequelize: Sequelize.Sequelize): typeof RegistroPropuestaInstancia {
    return RegistroPropuestaInstancia.init({
    idInstancia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Institucion',
        key: 'idInstancia'
      }
    },
    codigoPropuesta: {
      type: DataTypes.STRING(9),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Persona',
        key: 'codigoPropuesta'
      }
    },
    detalle: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'RegistroPropuestaInstancia',
    timestamps: true,
    paranoid: true
  });
  }
}
