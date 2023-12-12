import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import { Integrante, IntegranteCreationAttributes, IntegranteId, IntegrantePk } from './Integrante';
import { LOG_TRANSACTION } from '../types/base';
import { PropuestaInstitucion, PropuestaInstitucionCreationAttributes, PropuestaInstitucionPk } from './PropuestaInstitucion';
import fetch from 'node-fetch';
import { RolPk } from './Rol';
import { ObjetivoEspecificoCreationAttributes } from './ObjetivoEspecifico';


export interface PropuestaAttributes {
  codigoPropuesta: string;
  idUsuario: string;
  titulo: string;
  modalidad: string;
  duracion?: string;
  categoriaEquipo?: string;
  integralidad?: string;
  problematicaDetalle?: string;
  problematicaSintesis?: string;
  proyectosCaid?: string;
  propuestaMetodologica?: string;
  accionesCoordinacion?: string;
  politicasPublicas?: string;
  accionesComunicacion?: string;
  integralidadDescripcion?: string;
  sustentabilidad?: string;
  sintesis?: string;
  tipoMateriales?: string;
  capacitacionAgentesMultip?: string;
  perfilAgentesMultip?: string;
  solicitaBecarioJustif?: string;
  solicitaVoluntarioJustif?: string;
  instanciasCapacitacionDetalle?: string;
  solicitaBecario?: number;
  ipFinalidad?: string;
  ipParticipantesSociales?: string;
  ipObserv?: string;
  ipPotencialesActividades?: string;
  ipCampoTematico?: string;
  ipPoliticasPublicas?: string;
  ipProblematica?: string;
  planificacionFinalidad?: string;
  planificacionObjetivoGeneral?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type PropuestaPk = "codigoPropuesta";
export type PropuestaId = Propuesta[PropuestaPk];
export type PropuestaOptionalAttributes = "duracion" | "categoriaEquipo" | "integralidad" | "problematicaDetalle" | "problematicaSintesis" | "proyectosCaid" | "propuestaMetodologica" | "accionesCoordinacion" | "politicasPublicas" | "accionesComunicacion" | "integralidadDescripcion" | "sustentabilidad" | "sintesis" | "tipoMateriales" | "capacitacionAgentesMultip" | "perfilAgentesMultip" | "solicitaBecarioJustif" | "solicitaVoluntarioJustif" | "instanciasCapacitacionDetalle" | "solicitaBecario" | "ipFinalidad" | "ipParticipantesSociales" | "ipObserv" | "ipPotencialesActividades" | "ipCampoTematico" | "ipPoliticasPublicas" | "ipProblematica" | "planificacionFinalidad" | "planificacionObjetivoGeneral" | "createdAt" | "updatedAt" | "deletedAt";
export type PropuestaCreationAttributes = Optional<PropuestaAttributes, PropuestaOptionalAttributes>;

export class Propuesta extends Model<PropuestaAttributes, PropuestaCreationAttributes> implements PropuestaAttributes {
  codigoPropuesta!: string;
  idUsuario!: string;
  titulo!: string;
  modalidad!: string;
  duracion?: string;
  categoriaEquipo?: string;
  integralidad?: string;
  problematicaDetalle?: string;
  problematicaSintesis?: string;
  proyectosCaid?: string;
  propuestaMetodologica?: string;
  accionesCoordinacion?: string;
  politicasPublicas?: string;
  accionesComunicacion?: string;
  integralidadDescripcion?: string;
  sustentabilidad?: string;
  sintesis?: string;
  tipoMateriales?: string;
  capacitacionAgentesMultip?: string;
  perfilAgentesMultip?: string;
  solicitaBecarioJustif?: string;
  solicitaVoluntarioJustif?: string;
  instanciasCapacitacionDetalle?: string;
  solicitaBecario?: number;
  ipFinalidad?: string;
  ipParticipantesSociales?: string;
  ipObserv?: string;
  ipPotencialesActividades?: string;
  ipCampoTematico?: string;
  ipPoliticasPublicas?: string;
  ipProblematica?: string;
  planificacionFinalidad?: string;
  planificacionObjetivoGeneral?: string;
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;


  // propuestas relacionadas

  
  // propuestas previas


  // integrantes

  public async altaIntegrante ( data : IntegranteCreationAttributes, sequelize : Sequelize.Sequelize, transaction : Sequelize.Transaction  ) 
  : Promise<IntegranteCreationAttributes> {

    let salida : IntegranteCreationAttributes = { nroDoc : '', codigoPropuesta : '' }

    const [iIntegrante, creado ] = await Integrante.initModel(sequelize).findOrCreate({
      defaults : data , 
      where : {
        nroDoc : data.nroDoc , 
        codigoPropuesta : this.codigoPropuesta
      },
      paranoid: false,
      transaction
    });

    if(!creado) {
      await iIntegrante.restore({transaction});
      await iIntegrante.update({...data},{transaction});
    }

    salida = iIntegrante.dataValues;

    return salida;

  }

  public async bajaIntegrante ( data : IntegrantePk , sequelize : Sequelize.Sequelize, transaction : Sequelize.Transaction ) 
  : Promise<boolean> {
    let salida : boolean = false;

    const cantRegistros = await Integrante.initModel(sequelize).destroy({where : {nroDoc : data },transaction});

    if(cantRegistros) {

      salida = true;

    }

    return salida;
  }

  public async editarIntegrante ( data : IntegranteCreationAttributes, sequelize : Sequelize.Sequelize, transaction : Sequelize.Transaction ) 
  : Promise<IntegranteCreationAttributes> {
    let salida : IntegranteCreationAttributes = { nroDoc : '', codigoPropuesta : '' }
    

    const iIntegrante = await Integrante.initModel(sequelize).findOne( { 
      where : {
        nroDoc : data.nroDoc,
        codigoPropuesta : this.codigoPropuesta
      },
      transaction  
    } );

    if(!iIntegrante ) throw { status : 400 , message : 'No existe un usuario con ese documento.' }

    await iIntegrante.update(data,{transaction});
    
    salida = iIntegrante.dataValues;
    
    return salida;
  }

  public async verIntegrantes ( sequelize : Sequelize.Sequelize ) 
  : Promise<IntegranteCreationAttributes[]> {
    
    let salida : IntegranteCreationAttributes[] = [];

    salida = await Integrante.initModel(sequelize).findAll({where : {
      codigoPropuesta : this.codigoPropuesta
    }})
    
    
    return salida;

  }

  public async asignarRol ( data : { nroDoc : IntegrantePk , rol : RolPk }, sequelize : Sequelize.Sequelize, transaction : Sequelize.Transaction )
  : Promise<boolean> {
    let salida = false;

    const iIntegrante = await Integrante.initModel(sequelize).findOne({ 
      where : {
        nroDoc : data.nroDoc,
        codigoPropuesta : this.codigoPropuesta
      },
      transaction 
    });

    if(iIntegrante){
      // salida = await iIntegrante.asignarRol( data.rol, sequelize, transaction )
    }

    return salida;
  }
  // instituciones

  public async altaInstitucion ( data : PropuestaInstitucionCreationAttributes , sequelize : Sequelize.Sequelize ) 
  : Promise<PropuestaInstitucionCreationAttributes> {

    let salida : PropuestaInstitucionCreationAttributes = { idInstitucion : 0, codigoPropuesta : '' }

    const iInstitucion = await PropuestaInstitucion.initModel(sequelize).create(data);

    salida = iInstitucion.dataValues;
    

    return salida;

  }

  public async bajaInstitucion ( data : PropuestaInstitucionPk, sequelize : Sequelize.Sequelize ) 
  : Promise<boolean> {

    let salida = false;

    const cantEliminados = await PropuestaInstitucion.initModel(sequelize).destroy({where : { 
      idInstitucion : data , 
      codigoPropuesta : this.codigoPropuesta
    }});

    if(cantEliminados > 0 ) {
      salida = true;
    }

    return salida;

  }

  // planificacion


  // select multiples


  //--------------------------------------------------------------------

  static initModel(sequelize: Sequelize.Sequelize): typeof Propuesta {
    return Propuesta.init({
    codigoPropuesta: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    idUsuario: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    titulo: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    modalidad: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    duracion: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    categoriaEquipo: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    integralidad: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    problematicaDetalle: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    problematicaSintesis: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    proyectosCaid: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'proyectosCAID'
    },
    propuestaMetodologica: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    accionesCoordinacion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    politicasPublicas: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    accionesComunicacion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    integralidadDescripcion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    sustentabilidad: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    sintesis: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    tipoMateriales: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    capacitacionAgentesMultip: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    perfilAgentesMultip: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    solicitaBecarioJustif: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    solicitaVoluntarioJustif: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    instanciasCapacitacionDetalle: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    solicitaBecario: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ipFinalidad: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ipParticipantesSociales: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ipObserv: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ipPotencialesActividades: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ipCampoTematico: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ipPoliticasPublicas: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ipProblematica: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    planificacionFinalidad: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    planificacionObjetivoGeneral: {
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
    tableName: 'Propuesta',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "codigoPropuesta" },
        ]
      },
      {
        name: "codigo_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "codigoPropuesta" },
        ]
      },
      {
        name: "fk_Propuesta_Usuario1_idx",
        using: "BTREE",
        fields: [
          { name: "idUsuario" },
        ]
      },
    ]
  });
  }
}
