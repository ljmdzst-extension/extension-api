import * as Sequelize from 'sequelize';
import { domain } from '../../../../domain';
import { DataTypes, Model } from 'sequelize';
import { Categoria } from './Categoria';

export interface CategoriaUsuarioAttributes {
  idUsuario: string;
  idCategoria: number;
}

export type CategoriaUsuarioPk = "idUsuario" | "idCategoria" ;
export type CategoriaUsuarioId = CategoriaUsuario[CategoriaUsuarioPk];
export type CategoriaUsuarioCreationAttributes = CategoriaUsuarioAttributes;

export class CategoriaUsuario extends Model<CategoriaUsuarioAttributes, CategoriaUsuarioCreationAttributes> implements CategoriaUsuarioAttributes {
  idUsuario!: string;
  idCategoria!: number;

  static async verCategoria( idUsuario : string, transaction ?: Sequelize.Transaction ) : Promise<domain.Categoria | null > {
    let salida : domain.Categoria | null  = null;
    const dbCategAsoc = await CategoriaUsuario.findOne({where : { idUsuario : idUsuario },transaction});
    
    if(dbCategAsoc) {
       const dbCateg = await Categoria.findByPk(dbCategAsoc.idCategoria,{transaction});
       if(dbCateg) {
        salida = new domain.Categoria(dbCateg.dataValues);
       }
    }
    return salida;
  }

  static initModel(sequelize: Sequelize.Sequelize): typeof CategoriaUsuario {
    return CategoriaUsuario.init({
    idUsuario: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Usuario',
        key: 'idUsuario'
      }
    },
    idCategoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Categoria',
            key: 'idCategoria'
        }
    }
  }, {
    sequelize,
    tableName: 'CategoriaUsuario',
    timestamps: true,
    paranoid : true
  });
  }
}
