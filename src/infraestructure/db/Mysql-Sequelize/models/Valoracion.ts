import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import validator from 'validator';
import { ERROR } from '../infraestructure/Express/logs/errores';
import { INVALIDO } from '../infraestructure/Express/logs/validaciones';

export interface ValoracionAttributes {
  idValoracion: number;
  nom: string;
}

export type ValoracionPk = "idValoracion";
export type ValoracionId = Valoracion[ValoracionPk];
export type ValoracionOptionalAttributes = "idValoracion";
export type ValoracionCreationAttributes = Optional<ValoracionAttributes, ValoracionOptionalAttributes>;

export type TValoracion = ValoracionAttributes;
const CONSTRAINT_ATTRIBUTES = {
  idValoracion: {
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
const CONSTRAINT_OPTIONS = (sequelize : Sequelize.Sequelize)=>( {
  sequelize,
  tableName: 'Valoracion',
  timestamps: false
})
export class Valoracion extends Model<ValoracionAttributes, ValoracionCreationAttributes> implements ValoracionAttributes {
  idValoracion!: number;
  nom!: string;

  public verDatos() : TValoracion 
    {
        return this.dataValues;
    }
    
  public verID() : ValoracionId 
  { 
      return this.idValoracion;
  }

  public static validar( data : TValoracion ) : void {
      if(!validator.isLength(data.nom,{min : 1, max : 256})) throw INVALIDO.NOM_VALORACION;
      if(!(data.idValoracion > 0) ) throw INVALIDO.ID_VALORACION;
  }

    /**------------------ CONEXION BD ---------------------*/
    
  public static async buscarPorIDBD(id: ValoracionId, transaction?: Sequelize.Transaction ): Promise<Valoracion> {
      const bdValoracion = await this.findByPk(id,{transaction}) ;

      if(!bdValoracion ) throw ERROR.VALORACION_INEXISTENTE;

      return new Valoracion(bdValoracion.dataValues);    
  }

  public static async verListaBD(transaction?: Sequelize.Transaction ): Promise<TValoracion[]> { 
      let salida : TValoracion[] = [];

      salida = await this.findAll({transaction});

      return salida;
  } ;


  static initModel(sequelize: Sequelize.Sequelize): typeof Valoracion {
    return Valoracion.init(CONSTRAINT_ATTRIBUTES,CONSTRAINT_OPTIONS(sequelize));
  }
}
