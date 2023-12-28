import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import { ActividadObjetivoEspecifico, ActividadObjetivoEspecificoAttributes } from './ActividadObjetivoEspecifico';
import { splitNuevosRegistros } from '../helpers/general';

export interface ObjetivoEspecificoAttributes {
  idObjetivoEspecifico: number;
  codigoPropuesta: string;
  desc?: string;
  resEsp?: string;
  updatedAt ?: Date;
  deletedAt ?: Date;
}

export type ObjetivoEspecificoPk = "idObjetivoEspecifico";
export type ObjetivoEspecificoId = ObjetivoEspecifico[ObjetivoEspecificoPk];
export type ObjetivoEspecificoOptionalAttributes = "desc" | "resEsp" | "updatedAt" | "deletedAt" ;
export type ObjetivoEspecificoCreationAttributes = Optional<ObjetivoEspecificoAttributes, ObjetivoEspecificoOptionalAttributes>;

export class ObjetivoEspecifico extends Model<ObjetivoEspecificoAttributes, ObjetivoEspecificoCreationAttributes> implements ObjetivoEspecificoAttributes {
  idObjetivoEspecifico!: number;
  codigoPropuesta!: string;
  desc?: string;
  resEsp?: string;

  public async verActividades ( sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction) : 
  Promise< ActividadObjetivoEspecificoAttributes[] >{
    return await ActividadObjetivoEspecifico.initModel(sequelize).findAll({where : {idObjetivoEspecifico : this.idObjetivoEspecifico}, transaction});
  }

  public async editarActividades (data : ActividadObjetivoEspecificoAttributes[], sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction) : 
  Promise<void> {

    const actividadesAEditar = splitNuevosRegistros(data,'idActividadObjetivoEspecifico')

    const actualizarActividades = ActividadObjetivoEspecifico.initModel(sequelize).bulkCreate(
      data.map(act => ({...act,idObjetivoEspecifico : this.idObjetivoEspecifico})),
      {
        updateOnDuplicate : ['desc','motivoModificacion','motivoSuspension','updatedAt','deletedAt'],
        transaction
      }
    );
    
    const darDeBajaSobrantes =  ActividadObjetivoEspecifico.initModel(sequelize).destroy({
      where : {
        idObjetivoEspecifico : this.idObjetivoEspecifico,
        idActividadObjetivoEspecifico : {
          [Sequelize.Op.not] : actividadesAEditar['VIEJOS'].map( (act : any) => act.idActividadObjetivoEspecifico)
        }
      },
      transaction
    });

    await actualizarActividades;
    await darDeBajaSobrantes;

  }

  static initModel(sequelize: Sequelize.Sequelize): typeof ObjetivoEspecifico {
    return ObjetivoEspecifico.init({
    idObjetivoEspecifico: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    codigoPropuesta: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    desc: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    resEsp: {
      type: DataTypes.STRING(500),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ObjetivoEspecifico',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idObjetivoEspecifico" },
        ]
      },
      {
        name: "fkObjetivoEspecificoPropuesta1_idx",
        using: "BTREE",
        fields: [
          { name: "codigoPropuesta" },
        ]
      },
    ]
  });
  }
}
