import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import { ActividadObjetivoEspecifico, ActividadObjetivoEspecificoAttributes, ActividadObjetivoEspecificoCreationAttributes, ActividadObjetivoEspecificoId } from './ActividadObjetivoEspecifico';

export interface ObjetivoEspecificoAttributes {
  idObjetivoEspecifico: number;
  codigoPropuesta: string;
  desc?: string;
  resEsp?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type ObjetivoEspecificoPk = "idObjetivoEspecifico";
export type ObjetivoEspecificoId = ObjetivoEspecifico[ObjetivoEspecificoPk];
export type ObjetivoEspecificoOptionalAttributes = "desc" | "resEsp" | "createdAt" | "updatedAt" | "deletedAt";
export type ObjetivoEspecificoCreationAttributes = Optional<ObjetivoEspecificoAttributes, ObjetivoEspecificoOptionalAttributes>;

export class ObjetivoEspecifico extends Model<ObjetivoEspecificoAttributes, ObjetivoEspecificoCreationAttributes> implements ObjetivoEspecificoAttributes {
  idObjetivoEspecifico!: number;
  codigoPropuesta!: string;
  desc?: string;
  resEsp?: string;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;


  public async altaActividad ( data : ActividadObjetivoEspecificoCreationAttributes, sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction )
  : Promise<ActividadObjetivoEspecificoAttributes> {
    return (await ActividadObjetivoEspecifico.initModel(sequelize).create( data , {transaction})).dataValues;
  }

  public async bajaActividad ( data : ActividadObjetivoEspecificoId, sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction)
  : Promise<boolean>{
    let salida = false;
    const cantEliminados = await ActividadObjetivoEspecifico.initModel(sequelize).destroy( {
      where : { 
        idActividadObjetivoEspecifico: data,
        idObjetivoEspecifico : this.idObjetivoEspecifico
      },
      transaction
    } );
    salida = cantEliminados > 0;
    return salida;
  }

  public async editarActividad ( data : ActividadObjetivoEspecificoCreationAttributes ,  sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction)
  : Promise<ActividadObjetivoEspecificoAttributes> {
    let salida : ActividadObjetivoEspecificoAttributes = {idActividadObjetivoEspecifico : 0, idObjetivoEspecifico : 0, createdAt : new Date(), updatedAt : new Date()}
    const iActividad = await ActividadObjetivoEspecifico.initModel(sequelize).findOne({
      where : {
        idActividadObjetivoEspecifico : data.idActividadObjetivoEspecifico,
        idObjetivoEspecifico : this.idObjetivoEspecifico
      },
      transaction
    })

    if(!iActividad) console.log(`actividad ${data.idActividadObjetivoEspecifico} no encontrada , salteando ..`);

    if(iActividad){
      await iActividad.update(data,{transaction});
      salida = iActividad.dataValues;
    }
    return salida;
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
    },
    createdAt : {
      type : DataTypes.DATE,
      allowNull : false
    },
    updatedAt : {
      type : DataTypes.DATE,
      allowNull : false
    },
    deletedAt : {
      type : DataTypes.DATE,
      allowNull : true
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
    ]
  });
  }
}
