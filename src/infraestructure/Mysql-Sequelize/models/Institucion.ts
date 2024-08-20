import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import { domain } from '../../../domain';

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


  public static async buscarPorListaIds( listaIds : InstitucionId[] ,transaction ?: Sequelize.Transaction) : Promise<domain.TDataInstitucion[]> {
      return Institucion.findAll({where : { idInstitucion : listaIds }, transaction});
  }

  static initModel(sequelize: Sequelize.Sequelize): typeof Institucion {
    return Institucion.init(INSTITUCION_ATTRIBUTES, {
    sequelize,
    tableName: 'Institucion',
    timestamps: true,
    paranoid: true
  });
  }
}
