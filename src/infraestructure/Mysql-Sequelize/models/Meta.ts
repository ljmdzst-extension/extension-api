import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import { domain } from '../../../domain';

export interface MetaAttributes {
  idMeta: number;
  descripcion: string;
  resultado?: string;
  observaciones?: string;
  idValoracion?: number;
  idActividad: number;
}

export type MetaPk = "idMeta";
export type MetaId = Meta[MetaPk];
export type MetaOptionalAttributes = "idMeta" | "resultado" | "observaciones" | "idValoracion" ;
export type MetaCreationAttributes = Optional<MetaAttributes, MetaOptionalAttributes>;

// export type TMeta = MetaAttributes

export class Meta extends Model<MetaAttributes, MetaCreationAttributes> implements MetaAttributes {
  idMeta!: number;
  descripcion!: string;
  resultado?: string;
  observaciones?: string;
  idValoracion?: number;
  idActividad!: number;

  public static async buscarPorActividad( a  : domain.Actividad, transaction ?: Sequelize.Transaction  ) : Promise<domain.TDataMeta[]> {
     
      return  Meta.findAll({where : { idActividad : a.verDatos().idActividad}, transaction});;
  }


  static initModel(sequelize: Sequelize.Sequelize): typeof Meta {
    return Meta.init({
    idMeta: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    descripcion: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    resultado: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    observaciones: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    idValoracion: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Valoracion',
        key: 'idValoracion'
      }
    },
    idActividad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Actividad',
        key: 'idActividad'
      }
    }
  }, {
    sequelize,
    tableName: 'Meta',
    timestamps: true,
    paranoid: true
  });
  }
}
