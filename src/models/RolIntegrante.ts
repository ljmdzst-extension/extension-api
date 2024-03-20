import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Integrante, IntegranteId } from './Integrante';
import type { Rol, RolId } from './Rol';
import { ESTADO_BD } from '../types/general';

export interface RolIntegranteAttributes {
  idRolIntegrante: number;
  nroDoc: string;
  codigoPropuesta: string;
}

export type RolIntegrantePk = "idRolIntegrante" | "nroDoc" | "codigoPropuesta";
export type RolIntegranteId = RolIntegrante[RolIntegrantePk];
export type RolIntegranteCreationAttributes = RolIntegranteAttributes;
export type TRolIn = RolIntegranteCreationAttributes;
export type TRolOut = RolIntegranteAttributes;

const CONSTRAINTS_ATTRIBUTES = {
  idRolIntegrante: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'Rol',
      key: 'idRolIntegrante'
    }
  },
  nroDoc: {
    type: DataTypes.STRING(9),
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'Integrante',
      key: 'nroDoc'
    }
  },
  codigoPropuesta: {
    type: DataTypes.STRING(255),
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'Integrante',
      key: 'codigoPropuesta'
    }
  }
}
const CONSTRAINTS_OPTIONS = (sequelize : Sequelize.Sequelize)=>( {
  sequelize,
  tableName: 'RolIntegrante',
  timestamps: true,
  paranoid: true
})
export class RolIntegrante extends Model<RolIntegranteAttributes, RolIntegranteCreationAttributes> implements RolIntegranteAttributes {
  idRolIntegrante!: number;
  nroDoc!: string;
  codigoPropuesta!: string;

  public estadoEnBD !: ESTADO_BD;

  public compararDatos( dataRol : TRolIn ) {
     return this.idRolIntegrante === dataRol.idRolIntegrante && 
                this.codigoPropuesta === dataRol.codigoPropuesta &&
                this.nroDoc === dataRol.nroDoc;
    }

    verDatos() {
        return {
            codigoPropuesta : this.codigoPropuesta,
            idRolIntegrante : this.idRolIntegrante,
            nroDoc : this.nroDoc
        }
    }

    async determinarEstadoEnBD( transaction ?: Sequelize.Transaction) : Promise<void> {
      return RolIntegrante.findOne({
            where : {
                ...this.dataValues
            },
            transaction
        }).then( resp => {
          this.isNewRecord  = resp === null;
          if(!this.isNewRecord) this.estadoEnBD = ESTADO_BD.M;
        });

       
    }

    darDeBaja() {
        this.estadoEnBD = ESTADO_BD.B;
    }

    async guardarDatos(transaction ?: Sequelize.Transaction) : Promise<TRolOut>{
        if(this.estadoEnBD === ESTADO_BD.B) {
            await this.destroy({transaction});
        }
        else {
            this.isNewRecord = this.estadoEnBD === ESTADO_BD.A;

            await this.save({transaction});
        }
        
        return this.verDatos();
    }

    static initModel(sequelize: Sequelize.Sequelize): typeof RolIntegrante {
      return RolIntegrante.init(CONSTRAINTS_ATTRIBUTES,CONSTRAINTS_OPTIONS(sequelize));
    }
}
