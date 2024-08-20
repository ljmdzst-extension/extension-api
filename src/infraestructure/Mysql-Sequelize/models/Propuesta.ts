import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Integrante, IntegranteId } from './Integrante';
import type { ObjetivoEspecifico, ObjetivoEspecificoId } from './ObjetivoEspecifico';
import type { ParticipanteSocial, ParticipanteSocialId } from './ParticipanteSocial';
import type { PropuestaCapacitacion, PropuestaCapacitacionId } from './PropuestaCapacitacion';
import type { PropuestaInstitucion, PropuestaInstitucionId } from './PropuestaInstitucion';
import type { PropuestaLineaTematica, PropuestaLineaTematicaId } from './PropuestaLineaTematica';
import type { PropuestaPalabraClave, PropuestaPalabraClaveId } from './PropuestaPalabraClave';
import type { PropuestaPrevia, PropuestaPreviaId } from './PropuestaPrevia';
import type { PropuestaProgramaExtension, PropuestaProgramaExtensionId } from './PropuestaProgramaExtension';
import type { PropuestaRelacionada, PropuestaRelacionadaId } from './PropuestaRelacionada';
import type { UbicacionProblematica, UbicacionProblematicaId } from './UbicacionProblematica';
import type { Usuario, UsuarioId } from './Usuario';

export interface PropuestaAttributes {
  codigoPropuesta: string;
  idUsuario: string;
  titulo: string;
  modalidad: string;
  duracion?: string | null;
  categoriaEquipo?: string | null;
  integralidad?: string | null;
  problematicaDetalle?: string | null;
  problematicaSintesis?: string | null;
  proyectosCaid?: string | null;
  propuestaMetodologica?: string | null;
  accionesCoordinacion?: string | null;
  politicasPublicas?: string | null;
  accionesComunicacion?: string | null;
  integralidadDescripcion?: string | null;
  sustentabilidad?: string | null;
  sintesis?: string | null;
  tipoMateriales?: string | null;
  capacitacionAgentesMultip?: string | null;
  perfilAgentesMultip?: string | null;
  solicitaBecarioJustif?: string | null;
  solicitaVoluntarioJustif?: string | null;
  instanciasCapacitacionDetalle?: string | null;
  solicitaBecario?: number | null;
  ipFinalidad?: string | null;
  ipParticipantesSociales?: string | null;
  ipObserv?: string | null;
  ipPotencialesActividades?: string | null;
  ipCampoTematico?: string | null;
  ipPoliticasPublicas?: string | null;
  ipProblematica?: string | null;
  planificacionFinalidad?: string | null;
  planificacionObjetivoGeneral?: string | null
}

export type PropuestaPk = "codigoPropuesta";
export type PropuestaId = Propuesta[PropuestaPk];
export type PropuestaOptionalAttributes = "duracion" | "categoriaEquipo" | "integralidad" | "problematicaDetalle" | "problematicaSintesis" | "proyectosCaid" | "propuestaMetodologica" | "accionesCoordinacion" | "politicasPublicas" | "accionesComunicacion" | "integralidadDescripcion" | "sustentabilidad" | "sintesis" | "tipoMateriales" | "capacitacionAgentesMultip" | "perfilAgentesMultip" | "solicitaBecarioJustif" | "solicitaVoluntarioJustif" | "instanciasCapacitacionDetalle" | "solicitaBecario" | "ipFinalidad" | "ipParticipantesSociales" | "ipObserv" | "ipPotencialesActividades" | "ipCampoTematico" | "ipPoliticasPublicas" | "ipProblematica" | "planificacionFinalidad" | "planificacionObjetivoGeneral";
export type PropuestaCreationAttributes = Optional<PropuestaAttributes, PropuestaOptionalAttributes>;

export class Propuesta extends Model<PropuestaAttributes, PropuestaCreationAttributes> implements PropuestaAttributes {
  codigoPropuesta!: string;
  idUsuario!: string;
  titulo!: string;
  modalidad!: string;
  duracion?: string | null;
  categoriaEquipo?: string | null;
  integralidad?: string | null;
  problematicaDetalle?: string | null;
  problematicaSintesis?: string | null;
  proyectosCaid?: string | null;
  propuestaMetodologica?: string | null;
  accionesCoordinacion?: string | null;
  politicasPublicas?: string | null;
  accionesComunicacion?: string | null;
  integralidadDescripcion?: string | null;
  sustentabilidad?: string | null;
  sintesis?: string | null;
  tipoMateriales?: string | null;
  capacitacionAgentesMultip?: string | null;
  perfilAgentesMultip?: string | null;
  solicitaBecarioJustif?: string | null;
  solicitaVoluntarioJustif?: string | null;
  instanciasCapacitacionDetalle?: string | null;
  solicitaBecario?: number | null;
  ipFinalidad?: string | null;
  ipParticipantesSociales?: string | null;
  ipObserv?: string | null;
  ipPotencialesActividades?: string | null;
  ipCampoTematico?: string | null;
  ipPoliticasPublicas?: string | null;
  ipProblematica?: string | null;
  planificacionFinalidad?: string | null;
  planificacionObjetivoGeneral?: string | null;
  
  // Propuesta hasMany Integrante via codigoPropuesta
  integrantes!: Integrante[];
  getIntegrantes!: Sequelize.HasManyGetAssociationsMixin<Integrante>;
  setIntegrantes!: Sequelize.HasManySetAssociationsMixin<Integrante, IntegranteId>;
  addIntegrante!: Sequelize.HasManyAddAssociationMixin<Integrante, IntegranteId>;
  addIntegrantes!: Sequelize.HasManyAddAssociationsMixin<Integrante, IntegranteId>;
  createIntegrante!: Sequelize.HasManyCreateAssociationMixin<Integrante>;
  removeIntegrante!: Sequelize.HasManyRemoveAssociationMixin<Integrante, IntegranteId>;
  removeIntegrantes!: Sequelize.HasManyRemoveAssociationsMixin<Integrante, IntegranteId>;
  hasIntegrante!: Sequelize.HasManyHasAssociationMixin<Integrante, IntegranteId>;
  hasIntegrantes!: Sequelize.HasManyHasAssociationsMixin<Integrante, IntegranteId>;
  countIntegrantes!: Sequelize.HasManyCountAssociationsMixin;

  // Propuesta hasMany ObjetivoEspecifico via codigoPropuesta
  objetivoEspecificos!: ObjetivoEspecifico[];
  getObjetivoEspecificos!: Sequelize.HasManyGetAssociationsMixin<ObjetivoEspecifico>;
  setObjetivoEspecificos!: Sequelize.HasManySetAssociationsMixin<ObjetivoEspecifico, ObjetivoEspecificoId>;
  addObjetivoEspecifico!: Sequelize.HasManyAddAssociationMixin<ObjetivoEspecifico, ObjetivoEspecificoId>;
  addObjetivoEspecificos!: Sequelize.HasManyAddAssociationsMixin<ObjetivoEspecifico, ObjetivoEspecificoId>;
  createObjetivoEspecifico!: Sequelize.HasManyCreateAssociationMixin<ObjetivoEspecifico>;
  removeObjetivoEspecifico!: Sequelize.HasManyRemoveAssociationMixin<ObjetivoEspecifico, ObjetivoEspecificoId>;
  removeObjetivoEspecificos!: Sequelize.HasManyRemoveAssociationsMixin<ObjetivoEspecifico, ObjetivoEspecificoId>;
  hasObjetivoEspecifico!: Sequelize.HasManyHasAssociationMixin<ObjetivoEspecifico, ObjetivoEspecificoId>;
  hasObjetivoEspecificos!: Sequelize.HasManyHasAssociationsMixin<ObjetivoEspecifico, ObjetivoEspecificoId>;
  countObjetivoEspecificos!: Sequelize.HasManyCountAssociationsMixin;


  // Propuesta hasMany ParticipanteSocial via codigoPropuesta
  participanteSociales!: ParticipanteSocial[];
  getParticipanteSociales!: Sequelize.HasManyGetAssociationsMixin<ParticipanteSocial>;
  setParticipanteSociales!: Sequelize.HasManySetAssociationsMixin<ParticipanteSocial, ParticipanteSocialId>;
  addParticipanteSocial!: Sequelize.HasManyAddAssociationMixin<ParticipanteSocial, ParticipanteSocialId>;
  addParticipanteSociales!: Sequelize.HasManyAddAssociationsMixin<ParticipanteSocial, ParticipanteSocialId>;
  createParticipanteSocial!: Sequelize.HasManyCreateAssociationMixin<ParticipanteSocial>;
  removeParticipanteSocial!: Sequelize.HasManyRemoveAssociationMixin<ParticipanteSocial, ParticipanteSocialId>;
  removeParticipanteSociales!: Sequelize.HasManyRemoveAssociationsMixin<ParticipanteSocial, ParticipanteSocialId>;
  hasParticipanteSocial!: Sequelize.HasManyHasAssociationMixin<ParticipanteSocial, ParticipanteSocialId>;
  hasParticipanteSociales!: Sequelize.HasManyHasAssociationsMixin<ParticipanteSocial, ParticipanteSocialId>;
  countParticipanteSociales!: Sequelize.HasManyCountAssociationsMixin;

  // Propuesta hasMany PropuestaCapacitacion via codigoPropuesta
  propuestaCapacitaciones!: PropuestaCapacitacion[];
  getPropuestaCapacitaciones!: Sequelize.HasManyGetAssociationsMixin<PropuestaCapacitacion>;
  setPropuestaCapacitaciones!: Sequelize.HasManySetAssociationsMixin<PropuestaCapacitacion, PropuestaCapacitacionId>;
  addPropuestaCapacitacion!: Sequelize.HasManyAddAssociationMixin<PropuestaCapacitacion, PropuestaCapacitacionId>;
  addPropuestaCapacitaciones!: Sequelize.HasManyAddAssociationsMixin<PropuestaCapacitacion, PropuestaCapacitacionId>;
  createPropuestaCapacitacion!: Sequelize.HasManyCreateAssociationMixin<PropuestaCapacitacion>;
  removePropuestaCapacitacion!: Sequelize.HasManyRemoveAssociationMixin<PropuestaCapacitacion, PropuestaCapacitacionId>;
  removePropuestaCapacitaciones!: Sequelize.HasManyRemoveAssociationsMixin<PropuestaCapacitacion, PropuestaCapacitacionId>;
  hasPropuestaCapacitacion!: Sequelize.HasManyHasAssociationMixin<PropuestaCapacitacion, PropuestaCapacitacionId>;
  hasPropuestaCapacitaciones!: Sequelize.HasManyHasAssociationsMixin<PropuestaCapacitacion, PropuestaCapacitacionId>;
  countPropuestaCapacitaciones!: Sequelize.HasManyCountAssociationsMixin;

  // Propuesta hasMany PropuestaInstitucion via codigoPropuesta
  propuestaInstituciones!: PropuestaInstitucion[];
  getPropuestaInstituciones!: Sequelize.HasManyGetAssociationsMixin<PropuestaInstitucion>;
  setPropuestaInstituciones!: Sequelize.HasManySetAssociationsMixin<PropuestaInstitucion, PropuestaInstitucionId>;
  addPropuestaInstitucioen!: Sequelize.HasManyAddAssociationMixin<PropuestaInstitucion, PropuestaInstitucionId>;
  addPropuestaInstituciones!: Sequelize.HasManyAddAssociationsMixin<PropuestaInstitucion, PropuestaInstitucionId>;
  createPropuestaInstitucioen!: Sequelize.HasManyCreateAssociationMixin<PropuestaInstitucion>;
  removePropuestaInstitucioen!: Sequelize.HasManyRemoveAssociationMixin<PropuestaInstitucion, PropuestaInstitucionId>;
  removePropuestaInstituciones!: Sequelize.HasManyRemoveAssociationsMixin<PropuestaInstitucion, PropuestaInstitucionId>;
  hasPropuestaInstitucioen!: Sequelize.HasManyHasAssociationMixin<PropuestaInstitucion, PropuestaInstitucionId>;
  hasPropuestaInstituciones!: Sequelize.HasManyHasAssociationsMixin<PropuestaInstitucion, PropuestaInstitucionId>;
  countPropuestaInstituciones!: Sequelize.HasManyCountAssociationsMixin;

  // Propuesta hasMany PropuestaLineaTematica via codigoPropuesta
  propuestaLineaTematicas!: PropuestaLineaTematica[];
  getPropuestaLineaTematicas!: Sequelize.HasManyGetAssociationsMixin<PropuestaLineaTematica>;
  setPropuestaLineaTematicas!: Sequelize.HasManySetAssociationsMixin<PropuestaLineaTematica, PropuestaLineaTematicaId>;
  addPropuestaLineaTematica!: Sequelize.HasManyAddAssociationMixin<PropuestaLineaTematica, PropuestaLineaTematicaId>;
  addPropuestaLineaTematicas!: Sequelize.HasManyAddAssociationsMixin<PropuestaLineaTematica, PropuestaLineaTematicaId>;
  createPropuestaLineaTematica!: Sequelize.HasManyCreateAssociationMixin<PropuestaLineaTematica>;
  removePropuestaLineaTematica!: Sequelize.HasManyRemoveAssociationMixin<PropuestaLineaTematica, PropuestaLineaTematicaId>;
  removePropuestaLineaTematicas!: Sequelize.HasManyRemoveAssociationsMixin<PropuestaLineaTematica, PropuestaLineaTematicaId>;
  hasPropuestaLineaTematica!: Sequelize.HasManyHasAssociationMixin<PropuestaLineaTematica, PropuestaLineaTematicaId>;
  hasPropuestaLineaTematicas!: Sequelize.HasManyHasAssociationsMixin<PropuestaLineaTematica, PropuestaLineaTematicaId>;
  countPropuestaLineaTematicas!: Sequelize.HasManyCountAssociationsMixin;

  // Propuesta hasMany PropuestaPalabraClave via codigoPropuesta
  propuestaPalabraClaves!: PropuestaPalabraClave[];
  getPropuestaPalabraClaves!: Sequelize.HasManyGetAssociationsMixin<PropuestaPalabraClave>;
  setPropuestaPalabraClaves!: Sequelize.HasManySetAssociationsMixin<PropuestaPalabraClave, PropuestaPalabraClaveId>;
  addPropuestaPalabraClave!: Sequelize.HasManyAddAssociationMixin<PropuestaPalabraClave, PropuestaPalabraClaveId>;
  addPropuestaPalabraClaves!: Sequelize.HasManyAddAssociationsMixin<PropuestaPalabraClave, PropuestaPalabraClaveId>;
  createPropuestaPalabraClave!: Sequelize.HasManyCreateAssociationMixin<PropuestaPalabraClave>;
  removePropuestaPalabraClave!: Sequelize.HasManyRemoveAssociationMixin<PropuestaPalabraClave, PropuestaPalabraClaveId>;
  removePropuestaPalabraClaves!: Sequelize.HasManyRemoveAssociationsMixin<PropuestaPalabraClave, PropuestaPalabraClaveId>;
  hasPropuestaPalabraClave!: Sequelize.HasManyHasAssociationMixin<PropuestaPalabraClave, PropuestaPalabraClaveId>;
  hasPropuestaPalabraClaves!: Sequelize.HasManyHasAssociationsMixin<PropuestaPalabraClave, PropuestaPalabraClaveId>;
  countPropuestaPalabraClaves!: Sequelize.HasManyCountAssociationsMixin;
  
  // Propuesta hasMany PropuestaProgramaExtension via codigoPropuesta
  propuestaProgramaExtensions!: PropuestaProgramaExtension[];
  getPropuestaProgramaExtensions!: Sequelize.HasManyGetAssociationsMixin<PropuestaProgramaExtension>;
  setPropuestaProgramaExtensions!: Sequelize.HasManySetAssociationsMixin<PropuestaProgramaExtension, PropuestaProgramaExtensionId>;
  addPropuestaProgramaExtension!: Sequelize.HasManyAddAssociationMixin<PropuestaProgramaExtension, PropuestaProgramaExtensionId>;
  addPropuestaProgramaExtensions!: Sequelize.HasManyAddAssociationsMixin<PropuestaProgramaExtension, PropuestaProgramaExtensionId>;
  createPropuestaProgramaExtension!: Sequelize.HasManyCreateAssociationMixin<PropuestaProgramaExtension>;
  removePropuestaProgramaExtension!: Sequelize.HasManyRemoveAssociationMixin<PropuestaProgramaExtension, PropuestaProgramaExtensionId>;
  removePropuestaProgramaExtensions!: Sequelize.HasManyRemoveAssociationsMixin<PropuestaProgramaExtension, PropuestaProgramaExtensionId>;
  hasPropuestaProgramaExtension!: Sequelize.HasManyHasAssociationMixin<PropuestaProgramaExtension, PropuestaProgramaExtensionId>;
  hasPropuestaProgramaExtensions!: Sequelize.HasManyHasAssociationsMixin<PropuestaProgramaExtension, PropuestaProgramaExtensionId>;
  countPropuestaProgramaExtensions!: Sequelize.HasManyCountAssociationsMixin;

  // Propuesta hasMany PropuestaRelacionada via codigoPropuesta
  propuestaRelacionadas!: PropuestaRelacionada[];
  getPropuestaRelacionadas!: Sequelize.HasManyGetAssociationsMixin<PropuestaRelacionada>;
  setPropuestaRelacionadas!: Sequelize.HasManySetAssociationsMixin<PropuestaRelacionada, PropuestaRelacionadaId>;
  addPropuestaRelacionada!: Sequelize.HasManyAddAssociationMixin<PropuestaRelacionada, PropuestaRelacionadaId>;
  addPropuestaRelacionadas!: Sequelize.HasManyAddAssociationsMixin<PropuestaRelacionada, PropuestaRelacionadaId>;
  createPropuestaRelacionada!: Sequelize.HasManyCreateAssociationMixin<PropuestaRelacionada>;
  removePropuestaRelacionada!: Sequelize.HasManyRemoveAssociationMixin<PropuestaRelacionada, PropuestaRelacionadaId>;
  removePropuestaRelacionadas!: Sequelize.HasManyRemoveAssociationsMixin<PropuestaRelacionada, PropuestaRelacionadaId>;
  hasPropuestaRelacionada!: Sequelize.HasManyHasAssociationMixin<PropuestaRelacionada, PropuestaRelacionadaId>;
  hasPropuestaRelacionadas!: Sequelize.HasManyHasAssociationsMixin<PropuestaRelacionada, PropuestaRelacionadaId>;
  countPropuestaRelacionadas!: Sequelize.HasManyCountAssociationsMixin;

  // Propuesta hasMany PropuestaRelacionada via codigoPropuesta
  propuestasPrevias!: PropuestaPrevia[];
  getPropuestasPrevias!: Sequelize.HasManyGetAssociationsMixin<PropuestaPrevia>;
  setPropuestasPrevias!: Sequelize.HasManySetAssociationsMixin<PropuestaPrevia, PropuestaPreviaId>;
  addPropuestasPrevias!: Sequelize.HasManyAddAssociationMixin<PropuestaPrevia, PropuestaPreviaId>;
  createPropuestasPrevias!: Sequelize.HasManyCreateAssociationMixin<PropuestaPrevia>;
  removePropuestasPrevias!: Sequelize.HasManyRemoveAssociationMixin<PropuestaPrevia, PropuestaPreviaId>;
  hasproPropuestasPrevias!: Sequelize.HasManyHasAssociationMixin<PropuestaPrevia, PropuestaPreviaId>;
  countPropuestasPrevias!: Sequelize.HasManyCountAssociationsMixin;

  // Propuesta hasMany UbicacionProblematica via codigoPropuesta
  ubicacionProblematicas!: UbicacionProblematica[];
  getUbicacionProblematicas!: Sequelize.HasManyGetAssociationsMixin<UbicacionProblematica>;
  setUbicacionProblematicas!: Sequelize.HasManySetAssociationsMixin<UbicacionProblematica, UbicacionProblematicaId>;
  addUbicacionProblematica!: Sequelize.HasManyAddAssociationMixin<UbicacionProblematica, UbicacionProblematicaId>;
  addUbicacionProblematicas!: Sequelize.HasManyAddAssociationsMixin<UbicacionProblematica, UbicacionProblematicaId>;
  createUbicacionProblematica!: Sequelize.HasManyCreateAssociationMixin<UbicacionProblematica>;
  removeUbicacionProblematica!: Sequelize.HasManyRemoveAssociationMixin<UbicacionProblematica, UbicacionProblematicaId>;
  removeUbicacionProblematicas!: Sequelize.HasManyRemoveAssociationsMixin<UbicacionProblematica, UbicacionProblematicaId>;
  hasUbicacionProblematica!: Sequelize.HasManyHasAssociationMixin<UbicacionProblematica, UbicacionProblematicaId>;
  hasUbicacionProblematicas!: Sequelize.HasManyHasAssociationsMixin<UbicacionProblematica, UbicacionProblematicaId>;
  countUbicacionProblematicas!: Sequelize.HasManyCountAssociationsMixin;

  // Propuesta belongsTo Usuario via idUsuario
  idUsuarioUsuario!: Usuario;
  getIdUsuarioUsuario!: Sequelize.BelongsToGetAssociationMixin<Usuario>;
  setIdUsuarioUsuario!: Sequelize.BelongsToSetAssociationMixin<Usuario, UsuarioId>;
  createIdUsuarioUsuario!: Sequelize.BelongsToCreateAssociationMixin<Usuario>;

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
      allowNull: false,
      validate : {
        len : {
          args : [1,500],
          msg : 'título max. 500 caracteres'
        }
      }
    },
    modalidad: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate : {
        isIn : {
          args : [['AET','PEIS']],
          msg : 'Modalidad debe ser AET, PEIS o PEEE'
        }
      }
    },
    duracion: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate : {
        isIn : {
          args : [['ANUAL','BIANUAL']],
          msg : 'Duración debe ser ANUAL O BIANUAL'
        }
      }
    },
    categoriaEquipo: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate : {
        isIn : {
          args : [['INICIO','EXPERIENCIA','TRAYECTORIA']],
          msg : 'categoriaEquipo debe ser INICIO , EXPERIENCIA O TRAYECTORIA'
        }
      }
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
    }
  }, {
    sequelize,
    tableName: 'Propuesta',
    timestamps: true,
    paranoid: true
  });
  }
}
