import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Capacitacion, CapacitacionId } from './Capacitacion';
import type { Evaluacion, EvaluacionId } from './Evaluacion';
import type { Institucion, InstitucionId } from './Institucion';
import type { Integrante, IntegranteId } from './Integrante';
import type { LineaTematica, LineaTematicaId } from './LineaTematica';
import type { ObjetivoEspecifico, ObjetivoEspecificoId } from './ObjetivoEspecifico';
import type { PalabraClave, PalabraClaveId } from './PalabraClave';
import type { ParticipanteSocial, ParticipanteSocialId } from './ParticipanteSocial';
import type { Persona, PersonaId } from './Persona';
import type { ProgramaSippe, ProgramaSippeId } from './ProgramaSippe';
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

  // Propuesta belongsToMany Capacitacion via codigoPropuesta and idCapacitacion
  idCapacitacionCapacitacions!: Capacitacion[];
  getIdCapacitacionCapacitacions!: Sequelize.BelongsToManyGetAssociationsMixin<Capacitacion>;
  setIdCapacitacionCapacitacions!: Sequelize.BelongsToManySetAssociationsMixin<Capacitacion, CapacitacionId>;
  addIdCapacitacionCapacitacion!: Sequelize.BelongsToManyAddAssociationMixin<Capacitacion, CapacitacionId>;
  addIdCapacitacionCapacitacions!: Sequelize.BelongsToManyAddAssociationsMixin<Capacitacion, CapacitacionId>;
  createIdCapacitacionCapacitacion!: Sequelize.BelongsToManyCreateAssociationMixin<Capacitacion>;
  removeIdCapacitacionCapacitacion!: Sequelize.BelongsToManyRemoveAssociationMixin<Capacitacion, CapacitacionId>;
  removeIdCapacitacionCapacitacions!: Sequelize.BelongsToManyRemoveAssociationsMixin<Capacitacion, CapacitacionId>;
  hasIdCapacitacionCapacitacion!: Sequelize.BelongsToManyHasAssociationMixin<Capacitacion, CapacitacionId>;
  hasIdCapacitacionCapacitacions!: Sequelize.BelongsToManyHasAssociationsMixin<Capacitacion, CapacitacionId>;
  countIdCapacitacionCapacitacions!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Propuesta hasMany Evaluacion via codigoPropuesta
  evaluacions!: Evaluacion[];
  getEvaluacions!: Sequelize.HasManyGetAssociationsMixin<Evaluacion>;
  setEvaluacions!: Sequelize.HasManySetAssociationsMixin<Evaluacion, EvaluacionId>;
  addEvaluacion!: Sequelize.HasManyAddAssociationMixin<Evaluacion, EvaluacionId>;
  addEvaluacions!: Sequelize.HasManyAddAssociationsMixin<Evaluacion, EvaluacionId>;
  createEvaluacion!: Sequelize.HasManyCreateAssociationMixin<Evaluacion>;
  removeEvaluacion!: Sequelize.HasManyRemoveAssociationMixin<Evaluacion, EvaluacionId>;
  removeEvaluacions!: Sequelize.HasManyRemoveAssociationsMixin<Evaluacion, EvaluacionId>;
  hasEvaluacion!: Sequelize.HasManyHasAssociationMixin<Evaluacion, EvaluacionId>;
  hasEvaluacions!: Sequelize.HasManyHasAssociationsMixin<Evaluacion, EvaluacionId>;
  countEvaluacions!: Sequelize.HasManyCountAssociationsMixin;
  // Propuesta belongsToMany Institucion via codigoPropuesta and idInstitucion
  idInstitucionInstitucionPropuestaInstitucions!: Institucion[];
  getIdInstitucionInstitucionPropuestaInstitucions!: Sequelize.BelongsToManyGetAssociationsMixin<Institucion>;
  setIdInstitucionInstitucionPropuestaInstitucions!: Sequelize.BelongsToManySetAssociationsMixin<Institucion, InstitucionId>;
  addIdInstitucionInstitucionPropuestaInstitucion!: Sequelize.BelongsToManyAddAssociationMixin<Institucion, InstitucionId>;
  addIdInstitucionInstitucionPropuestaInstitucions!: Sequelize.BelongsToManyAddAssociationsMixin<Institucion, InstitucionId>;
  createIdInstitucionInstitucionPropuestaInstitucion!: Sequelize.BelongsToManyCreateAssociationMixin<Institucion>;
  removeIdInstitucionInstitucionPropuestaInstitucion!: Sequelize.BelongsToManyRemoveAssociationMixin<Institucion, InstitucionId>;
  removeIdInstitucionInstitucionPropuestaInstitucions!: Sequelize.BelongsToManyRemoveAssociationsMixin<Institucion, InstitucionId>;
  hasIdInstitucionInstitucionPropuestaInstitucion!: Sequelize.BelongsToManyHasAssociationMixin<Institucion, InstitucionId>;
  hasIdInstitucionInstitucionPropuestaInstitucions!: Sequelize.BelongsToManyHasAssociationsMixin<Institucion, InstitucionId>;
  countIdInstitucionInstitucionPropuestaInstitucions!: Sequelize.BelongsToManyCountAssociationsMixin;
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
  // Propuesta belongsToMany LineaTematica via codigoPropuesta and idLineaTematica
  idLineaTematicaLineaTematicas!: LineaTematica[];
  getIdLineaTematicaLineaTematicas!: Sequelize.BelongsToManyGetAssociationsMixin<LineaTematica>;
  setIdLineaTematicaLineaTematicas!: Sequelize.BelongsToManySetAssociationsMixin<LineaTematica, LineaTematicaId>;
  addIdLineaTematicaLineaTematica!: Sequelize.BelongsToManyAddAssociationMixin<LineaTematica, LineaTematicaId>;
  addIdLineaTematicaLineaTematicas!: Sequelize.BelongsToManyAddAssociationsMixin<LineaTematica, LineaTematicaId>;
  createIdLineaTematicaLineaTematica!: Sequelize.BelongsToManyCreateAssociationMixin<LineaTematica>;
  removeIdLineaTematicaLineaTematica!: Sequelize.BelongsToManyRemoveAssociationMixin<LineaTematica, LineaTematicaId>;
  removeIdLineaTematicaLineaTematicas!: Sequelize.BelongsToManyRemoveAssociationsMixin<LineaTematica, LineaTematicaId>;
  hasIdLineaTematicaLineaTematica!: Sequelize.BelongsToManyHasAssociationMixin<LineaTematica, LineaTematicaId>;
  hasIdLineaTematicaLineaTematicas!: Sequelize.BelongsToManyHasAssociationsMixin<LineaTematica, LineaTematicaId>;
  countIdLineaTematicaLineaTematicas!: Sequelize.BelongsToManyCountAssociationsMixin;
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
  // Propuesta belongsToMany PalabraClave via codigoPropuesta and idPalabraClave
  idPalabraClavePalabraClaves!: PalabraClave[];
  getIdPalabraClavePalabraClaves!: Sequelize.BelongsToManyGetAssociationsMixin<PalabraClave>;
  setIdPalabraClavePalabraClaves!: Sequelize.BelongsToManySetAssociationsMixin<PalabraClave, PalabraClaveId>;
  addIdPalabraClavePalabraClave!: Sequelize.BelongsToManyAddAssociationMixin<PalabraClave, PalabraClaveId>;
  addIdPalabraClavePalabraClaves!: Sequelize.BelongsToManyAddAssociationsMixin<PalabraClave, PalabraClaveId>;
  createIdPalabraClavePalabraClave!: Sequelize.BelongsToManyCreateAssociationMixin<PalabraClave>;
  removeIdPalabraClavePalabraClave!: Sequelize.BelongsToManyRemoveAssociationMixin<PalabraClave, PalabraClaveId>;
  removeIdPalabraClavePalabraClaves!: Sequelize.BelongsToManyRemoveAssociationsMixin<PalabraClave, PalabraClaveId>;
  hasIdPalabraClavePalabraClave!: Sequelize.BelongsToManyHasAssociationMixin<PalabraClave, PalabraClaveId>;
  hasIdPalabraClavePalabraClaves!: Sequelize.BelongsToManyHasAssociationsMixin<PalabraClave, PalabraClaveId>;
  countIdPalabraClavePalabraClaves!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Propuesta hasMany ParticipanteSocial via codigoPropuesta
  participanteSocials!: ParticipanteSocial[];
  getParticipanteSocials!: Sequelize.HasManyGetAssociationsMixin<ParticipanteSocial>;
  setParticipanteSocials!: Sequelize.HasManySetAssociationsMixin<ParticipanteSocial, ParticipanteSocialId>;
  addParticipanteSocial!: Sequelize.HasManyAddAssociationMixin<ParticipanteSocial, ParticipanteSocialId>;
  addParticipanteSocials!: Sequelize.HasManyAddAssociationsMixin<ParticipanteSocial, ParticipanteSocialId>;
  createParticipanteSocial!: Sequelize.HasManyCreateAssociationMixin<ParticipanteSocial>;
  removeParticipanteSocial!: Sequelize.HasManyRemoveAssociationMixin<ParticipanteSocial, ParticipanteSocialId>;
  removeParticipanteSocials!: Sequelize.HasManyRemoveAssociationsMixin<ParticipanteSocial, ParticipanteSocialId>;
  hasParticipanteSocial!: Sequelize.HasManyHasAssociationMixin<ParticipanteSocial, ParticipanteSocialId>;
  hasParticipanteSocials!: Sequelize.HasManyHasAssociationsMixin<ParticipanteSocial, ParticipanteSocialId>;
  countParticipanteSocials!: Sequelize.HasManyCountAssociationsMixin;
  // Propuesta belongsToMany Persona via codigoPropuesta and nroDoc
  nroDocPersonas!: Persona[];
  getNroDocPersonas!: Sequelize.BelongsToManyGetAssociationsMixin<Persona>;
  setNroDocPersonas!: Sequelize.BelongsToManySetAssociationsMixin<Persona, PersonaId>;
  addNroDocPersona!: Sequelize.BelongsToManyAddAssociationMixin<Persona, PersonaId>;
  addNroDocPersonas!: Sequelize.BelongsToManyAddAssociationsMixin<Persona, PersonaId>;
  createNroDocPersona!: Sequelize.BelongsToManyCreateAssociationMixin<Persona>;
  removeNroDocPersona!: Sequelize.BelongsToManyRemoveAssociationMixin<Persona, PersonaId>;
  removeNroDocPersonas!: Sequelize.BelongsToManyRemoveAssociationsMixin<Persona, PersonaId>;
  hasNroDocPersona!: Sequelize.BelongsToManyHasAssociationMixin<Persona, PersonaId>;
  hasNroDocPersonas!: Sequelize.BelongsToManyHasAssociationsMixin<Persona, PersonaId>;
  countNroDocPersonas!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Propuesta belongsToMany ProgramaSippe via codigoPropuesta and idProgramaExtension
  idProgramaExtensionProgramaSippes!: ProgramaSippe[];
  getIdProgramaExtensionProgramaSippes!: Sequelize.BelongsToManyGetAssociationsMixin<ProgramaSippe>;
  setIdProgramaExtensionProgramaSippes!: Sequelize.BelongsToManySetAssociationsMixin<ProgramaSippe, ProgramaSippeId>;
  addIdProgramaExtensionProgramaSippe!: Sequelize.BelongsToManyAddAssociationMixin<ProgramaSippe, ProgramaSippeId>;
  addIdProgramaExtensionProgramaSippes!: Sequelize.BelongsToManyAddAssociationsMixin<ProgramaSippe, ProgramaSippeId>;
  createIdProgramaExtensionProgramaSippe!: Sequelize.BelongsToManyCreateAssociationMixin<ProgramaSippe>;
  removeIdProgramaExtensionProgramaSippe!: Sequelize.BelongsToManyRemoveAssociationMixin<ProgramaSippe, ProgramaSippeId>;
  removeIdProgramaExtensionProgramaSippes!: Sequelize.BelongsToManyRemoveAssociationsMixin<ProgramaSippe, ProgramaSippeId>;
  hasIdProgramaExtensionProgramaSippe!: Sequelize.BelongsToManyHasAssociationMixin<ProgramaSippe, ProgramaSippeId>;
  hasIdProgramaExtensionProgramaSippes!: Sequelize.BelongsToManyHasAssociationsMixin<ProgramaSippe, ProgramaSippeId>;
  countIdProgramaExtensionProgramaSippes!: Sequelize.BelongsToManyCountAssociationsMixin;

  // Propuesta belongsToMany Propuesta via codigoPropuesta and codigoPropuestaPrevia
  propuestasPrevias!: PropuestaPrevia[];
  getPropuestasPrevias!: Sequelize.HasManyGetAssociationsMixin<PropuestaPrevia>;
  setPropuestasPrevias!: Sequelize.HasManySetAssociationsMixin<PropuestaPrevia, PropuestaPreviaId>;
  addPropuestaPrevia!: Sequelize.HasManyAddAssociationMixin<PropuestaPrevia, PropuestaPreviaId>;
  createPropuestaPrevia !: Sequelize.HasManyCreateAssociationMixin<PropuestaPrevia>;
  removePropuestaPrevia!: Sequelize.HasManyRemoveAssociationMixin<PropuestaPrevia, PropuestaPreviaId>;
  hasPropuestaPrevia!: Sequelize.HasManyHasAssociationMixin<PropuestaPrevia, PropuestaPreviaId>;
  countPropuestaPrevia!: Sequelize.HasManyCountAssociationsMixin;

  // Propuesta belongsToMany Propuesta via codigoPropuestaRelacionada and codigoPropuesta
  codigoPropuestaPropuestaPropuestaRelacionadas!: Propuesta[];
  getCodigoPropuestaPropuestaPropuestaRelacionadas!: Sequelize.BelongsToManyGetAssociationsMixin<Propuesta>;
  setCodigoPropuestaPropuestaPropuestaRelacionadas!: Sequelize.BelongsToManySetAssociationsMixin<Propuesta, PropuestaId>;
  addCodigoPropuestaPropuestaPropuestaRelacionada!: Sequelize.BelongsToManyAddAssociationMixin<Propuesta, PropuestaId>;
  addCodigoPropuestaPropuestaPropuestaRelacionadas!: Sequelize.BelongsToManyAddAssociationsMixin<Propuesta, PropuestaId>;
  createCodigoPropuestaPropuestaPropuestaRelacionada!: Sequelize.BelongsToManyCreateAssociationMixin<Propuesta>;
  removeCodigoPropuestaPropuestaPropuestaRelacionada!: Sequelize.BelongsToManyRemoveAssociationMixin<Propuesta, PropuestaId>;
  removeCodigoPropuestaPropuestaPropuestaRelacionadas!: Sequelize.BelongsToManyRemoveAssociationsMixin<Propuesta, PropuestaId>;
  hasCodigoPropuestaPropuestaPropuestaRelacionada!: Sequelize.BelongsToManyHasAssociationMixin<Propuesta, PropuestaId>;
  hasCodigoPropuestaPropuestaPropuestaRelacionadas!: Sequelize.BelongsToManyHasAssociationsMixin<Propuesta, PropuestaId>;
  countCodigoPropuestaPropuestaPropuestaRelacionadas!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Propuesta hasMany PropuestaCapacitacion via codigoPropuesta
  propuestaCapacitacions!: PropuestaCapacitacion[];
  getPropuestaCapacitacions!: Sequelize.HasManyGetAssociationsMixin<PropuestaCapacitacion>;
  setPropuestaCapacitacions!: Sequelize.HasManySetAssociationsMixin<PropuestaCapacitacion, PropuestaCapacitacionId>;
  addPropuestaCapacitacion!: Sequelize.HasManyAddAssociationMixin<PropuestaCapacitacion, PropuestaCapacitacionId>;
  addPropuestaCapacitacions!: Sequelize.HasManyAddAssociationsMixin<PropuestaCapacitacion, PropuestaCapacitacionId>;
  createPropuestaCapacitacion!: Sequelize.HasManyCreateAssociationMixin<PropuestaCapacitacion>;
  removePropuestaCapacitacion!: Sequelize.HasManyRemoveAssociationMixin<PropuestaCapacitacion, PropuestaCapacitacionId>;
  removePropuestaCapacitacions!: Sequelize.HasManyRemoveAssociationsMixin<PropuestaCapacitacion, PropuestaCapacitacionId>;
  hasPropuestaCapacitacion!: Sequelize.HasManyHasAssociationMixin<PropuestaCapacitacion, PropuestaCapacitacionId>;
  hasPropuestaCapacitacions!: Sequelize.HasManyHasAssociationsMixin<PropuestaCapacitacion, PropuestaCapacitacionId>;
  countPropuestaCapacitacions!: Sequelize.HasManyCountAssociationsMixin;
  // Propuesta hasMany PropuestaInstitucion via codigoPropuesta
  propuestaInstitucions!: PropuestaInstitucion[];
  getPropuestaInstitucions!: Sequelize.HasManyGetAssociationsMixin<PropuestaInstitucion>;
  setPropuestaInstitucions!: Sequelize.HasManySetAssociationsMixin<PropuestaInstitucion, PropuestaInstitucionId>;
  addPropuestaInstitucion!: Sequelize.HasManyAddAssociationMixin<PropuestaInstitucion, PropuestaInstitucionId>;
  addPropuestaInstitucions!: Sequelize.HasManyAddAssociationsMixin<PropuestaInstitucion, PropuestaInstitucionId>;
  createPropuestaInstitucion!: Sequelize.HasManyCreateAssociationMixin<PropuestaInstitucion>;
  removePropuestaInstitucion!: Sequelize.HasManyRemoveAssociationMixin<PropuestaInstitucion, PropuestaInstitucionId>;
  removePropuestaInstitucions!: Sequelize.HasManyRemoveAssociationsMixin<PropuestaInstitucion, PropuestaInstitucionId>;
  hasPropuestaInstitucion!: Sequelize.HasManyHasAssociationMixin<PropuestaInstitucion, PropuestaInstitucionId>;
  hasPropuestaInstitucions!: Sequelize.HasManyHasAssociationsMixin<PropuestaInstitucion, PropuestaInstitucionId>;
  countPropuestaInstitucions!: Sequelize.HasManyCountAssociationsMixin;
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
  // Propuesta hasMany PropuestaRelacionada via codigoPropuestaRelacionada
  codigoPropuestaRelacionadaPropuestaRelacionadas!: PropuestaRelacionada[];
  getCodigoPropuestaRelacionadaPropuestaRelacionadas!: Sequelize.HasManyGetAssociationsMixin<PropuestaRelacionada>;
  setCodigoPropuestaRelacionadaPropuestaRelacionadas!: Sequelize.HasManySetAssociationsMixin<PropuestaRelacionada, PropuestaRelacionadaId>;
  addCodigoPropuestaRelacionadaPropuestaRelacionada!: Sequelize.HasManyAddAssociationMixin<PropuestaRelacionada, PropuestaRelacionadaId>;
  addCodigoPropuestaRelacionadaPropuestaRelacionadas!: Sequelize.HasManyAddAssociationsMixin<PropuestaRelacionada, PropuestaRelacionadaId>;
  createCodigoPropuestaRelacionadaPropuestaRelacionada!: Sequelize.HasManyCreateAssociationMixin<PropuestaRelacionada>;
  removeCodigoPropuestaRelacionadaPropuestaRelacionada!: Sequelize.HasManyRemoveAssociationMixin<PropuestaRelacionada, PropuestaRelacionadaId>;
  removeCodigoPropuestaRelacionadaPropuestaRelacionadas!: Sequelize.HasManyRemoveAssociationsMixin<PropuestaRelacionada, PropuestaRelacionadaId>;
  hasCodigoPropuestaRelacionadaPropuestaRelacionada!: Sequelize.HasManyHasAssociationMixin<PropuestaRelacionada, PropuestaRelacionadaId>;
  hasCodigoPropuestaRelacionadaPropuestaRelacionadas!: Sequelize.HasManyHasAssociationsMixin<PropuestaRelacionada, PropuestaRelacionadaId>;
  countCodigoPropuestaRelacionadaPropuestaRelacionadas!: Sequelize.HasManyCountAssociationsMixin;
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
    }
  }, {
    sequelize,
    tableName: 'Propuesta',
    timestamps: true,
    paranoid: true
  });
  }
}
