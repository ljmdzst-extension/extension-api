import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import { PropuestaInstitucion, PropuestaInstitucionAttributes, PropuestaInstitucionCreationAttributes } from './PropuestaInstitucion';
import { Institucion, InstitucionAttributes } from './Institucion';
import { Integrante, IntegranteAttributes } from './Integrante';
import { Persona, PersonaAttributes } from './Persona';

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
  proyectosCAID?: string;
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
export type PropuestaOptionalAttributes = "duracion" | "categoriaEquipo" | "integralidad" | "problematicaDetalle" | "problematicaSintesis" | "proyectosCAID" | "propuestaMetodologica" | "accionesCoordinacion" | "politicasPublicas" | "accionesComunicacion" | "integralidadDescripcion" | "sustentabilidad" | "sintesis" | "tipoMateriales" | "capacitacionAgentesMultip" | "perfilAgentesMultip" | "solicitaBecarioJustif" | "solicitaVoluntarioJustif" | "instanciasCapacitacionDetalle" | "solicitaBecario" | "ipFinalidad" | "ipParticipantesSociales" | "ipObserv" | "ipPotencialesActividades" | "ipCampoTematico" | "ipPoliticasPublicas" | "ipProblematica" | "planificacionFinalidad" | "planificacionObjetivoGeneral" | "createdAt" | "updatedAt" | "deletedAt";
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
  proyectosCAID?: string;
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

  public async verInstituciones( sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction) : 
  Promise<(PropuestaInstitucionAttributes & InstitucionAttributes )[]> {

    let salida : (PropuestaInstitucionAttributes & InstitucionAttributes )[] = [];

    const lInstitucionesRelacionadas = await PropuestaInstitucion.initModel(sequelize).findAll({
      where : {codigoPropuesta : this.codigoPropuesta}, 
      transaction
    });
    if(lInstitucionesRelacionadas.length ){
      const lInstituciones = await Institucion.initModel(sequelize).findAll({
        where : {idInstitucion : lInstitucionesRelacionadas.map(inst => inst.idInstitucion)}, 
        transaction
      });
      if( lInstituciones.length < lInstitucionesRelacionadas.length ) throw { 
        status : 500, 
        message : 'Las instituciones encontradas no coinciden con la cantidad de instituciones relacionadas' 
      }
      const lInstitucionesIndexado : any = lInstituciones.reduce ( 
         (salida , inst ) => ({ 
          ...salida, 
          [inst.idInstitucion] : inst.dataValues 
        }) , {});

      salida = lInstitucionesRelacionadas.map( inst => ({ 
        ...inst,
        ...lInstitucionesIndexado[inst.idInstitucion]
      }) )
    }
   

    return salida;
  }
  public async verIntegrantes( sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction) : 
  Promise<(IntegranteAttributes & PersonaAttributes )[]> {
     let salida : (IntegranteAttributes & PersonaAttributes )[] = [];

    const lIntegrantes = await Integrante.initModel(sequelize).findAll({
      where : {codigoPropuesta : this.codigoPropuesta}, 
      transaction
    });

    if(lIntegrantes.length ){
      const lPersonas = await Persona.initModel(sequelize).findAll({
        attributes : ['ape','nom','nroDoc','tipoDoc'],
        where : {nroDoc : lIntegrantes.map(integrante => integrante.nroDoc)}, 
        transaction
      });

      if( lPersonas.length < lIntegrantes.length ) throw { 
        status : 500, 
        message : 'Las personas encontradas no coinciden con la cantidad de integrantes' 
      }
      
      const lPersonasIndexado : any = lPersonas.reduce ( 
        (salida , persona ) => ({ 
          ...salida, 
          [persona.nroDoc] : persona.dataValues 
        }) , {});

      salida = lIntegrantes.map( integrante => ({ 
        ...integrante,
        ...lPersonasIndexado[integrante.nroDoc]
      }) )
    }
   

    return salida;
  }
  public async verPlanificacion( sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction) : 
  Promise<any> {
    let salida : any = null;
    return salida;
  }
  public async verPropuestasPrevias( sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction) : 
  Promise<any> {
    let salida : any = null;
    return salida;
  }
  public async verPropuestasRelacionadas( sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction) : 
  Promise<any> {
    let salida : any = null;
    return salida;
  }
  public async verGeolocalizaciones( sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction) : 
  Promise<any> {
    let salida : any = null;
    return salida;
  }
  public async verProgramasExtension( sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction) : 
  Promise<any> {
    let salida : any = null;
    return salida;
  }
  public async verCapacitaciones( sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction) : 
  Promise<any> {
    let salida : any = null;
    return salida;
  }
  public async verLineasTematicas( sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction) : 
  Promise<any> {
    let salida : any = null;
    return salida;
  }
  public async verPalabrasClave( sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction) : 
  Promise<any> {
    let salida : any = null;
    return salida;
  }

  static initModel(sequelize: Sequelize.Sequelize): typeof Propuesta {
    return Propuesta.init({
    codigoPropuesta: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    idUsuario: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'Usuario',
        key: 'idUsuario'
      }
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
    proyectosCAID: {
      type: DataTypes.TEXT,
      allowNull: true
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
