import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Relacion, RelacionId } from './Relacion';
import { INVALIDO } from '../infraestructure/Express/logs/validaciones';
import { ERROR } from '../infraestructure/Express/logs/errores';

export interface TipoRelacionAttributes {
  idTipoRelacion: number;
  nom: string;
}

export type TipoRelacionPk = "idTipoRelacion";
export type TipoRelacionId = TipoRelacion[TipoRelacionPk];
export type TipoRelacionOptionalAttributes = "idTipoRelacion";
export type TipoRelacionCreationAttributes = Optional<TipoRelacionAttributes, TipoRelacionOptionalAttributes>;
export type TTipoRelacion = TipoRelacionAttributes;

const CONSTRAINT_ATTRIBUTES = {
  idTipoRelacion: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  nom: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}
const CONSTRAINT_OPTIONS = (sequelize : Sequelize.Sequelize) =>({
  sequelize,
  tableName: 'TipoRelacion',
  timestamps: false
})
export class TipoRelacion extends Model<TipoRelacionAttributes, TipoRelacionCreationAttributes> implements TipoRelacionAttributes {
  idTipoRelacion!: number;
  nom!: string;

  public verDatos () : TTipoRelacion {
    return {
        idTipoRelacion : this.idTipoRelacion,
        nom : this.nom
    }
  }

  public static async validar(data : TTipoRelacion, transaction ?: Sequelize.Transaction) : Promise<void> {
      if(data.idTipoRelacion < 1 ) throw INVALIDO.ID_TIPO_REL; 
      if(! await this.findByPk(data.idTipoRelacion,{transaction}) ) throw INVALIDO.ID_TIPO_REL;
  }

  public static async verListaBD(transaction ?: Sequelize.Transaction | undefined): Promise<TTipoRelacion[]> { 
      let salida : TTipoRelacion[] = [];

      const bdListaTipoRelacion = await this.findAll({transaction});

      if(bdListaTipoRelacion.length > 0) {
          bdListaTipoRelacion.forEach( tipoRel => {
              salida.push(tipoRel.dataValues);
          } )
      }

      return salida;
  } ;

  public static async buscarPorIDBD(id: TipoRelacionId, transaction ?: Sequelize.Transaction | undefined): Promise<TipoRelacion> {
      const bdTipoRelacion = await this.findByPk(id,{transaction}) ;

      if(!bdTipoRelacion ) throw ERROR.TIPO_RELACION_INEXISTENTE;

      return new TipoRelacion(bdTipoRelacion.dataValues) ;   
  }

  static initModel(sequelize: Sequelize.Sequelize): typeof TipoRelacion {
    return TipoRelacion.init(CONSTRAINT_ATTRIBUTES,CONSTRAINT_OPTIONS(sequelize) );
  }
}
