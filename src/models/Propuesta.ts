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
import { PROPUESTA_VACIA, TPropuesta } from '../types/propuesta';

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
}

export type PropuestaPk = "codigoPropuesta";
export type PropuestaId = Propuesta[PropuestaPk];
export type PropuestaOptionalAttributes = "duracion" | "categoriaEquipo" | "integralidad" | "problematicaDetalle" | "problematicaSintesis" | "proyectosCAID" | "propuestaMetodologica" | "accionesCoordinacion" | "politicasPublicas" | "accionesComunicacion" | "integralidadDescripcion" | "sustentabilidad" | "sintesis" | "tipoMateriales" | "capacitacionAgentesMultip" | "perfilAgentesMultip" | "solicitaBecarioJustif" | "solicitaVoluntarioJustif" | "instanciasCapacitacionDetalle" | "solicitaBecario" | "ipFinalidad" | "ipParticipantesSociales" | "ipObserv" | "ipPotencialesActividades" | "ipCampoTematico" | "ipPoliticasPublicas" | "ipProblematica" | "planificacionFinalidad" | "planificacionObjetivoGeneral" ;
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

  // Propuesta belongsToMany Capacitacion via codigoPropuesta and idCapacitacion
  idCapacitacion_Capacitacions!: Capacitacion[];
  getIdCapacitacion_Capacitacions!: Sequelize.BelongsToManyGetAssociationsMixin<Capacitacion>;
  setIdCapacitacion_Capacitacions!: Sequelize.BelongsToManySetAssociationsMixin<Capacitacion, CapacitacionId>;
  addIdCapacitacion_Capacitacion!: Sequelize.BelongsToManyAddAssociationMixin<Capacitacion, CapacitacionId>;
  addIdCapacitacion_Capacitacions!: Sequelize.BelongsToManyAddAssociationsMixin<Capacitacion, CapacitacionId>;
  createIdCapacitacion_Capacitacion!: Sequelize.BelongsToManyCreateAssociationMixin<Capacitacion>;
  removeIdCapacitacion_Capacitacion!: Sequelize.BelongsToManyRemoveAssociationMixin<Capacitacion, CapacitacionId>;
  removeIdCapacitacion_Capacitacions!: Sequelize.BelongsToManyRemoveAssociationsMixin<Capacitacion, CapacitacionId>;
  hasIdCapacitacion_Capacitacion!: Sequelize.BelongsToManyHasAssociationMixin<Capacitacion, CapacitacionId>;
  hasIdCapacitacion_Capacitacions!: Sequelize.BelongsToManyHasAssociationsMixin<Capacitacion, CapacitacionId>;
  countIdCapacitacion_Capacitacions!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Propuesta hasMany Evaluacion via codigoPropuesta
  Evaluacions!: Evaluacion[];
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
  idInstitucion_Institucion_PropuestaInstitucions!: Institucion[];
  getIdInstitucion_Institucion_PropuestaInstitucions!: Sequelize.BelongsToManyGetAssociationsMixin<Institucion>;
  setIdInstitucion_Institucion_PropuestaInstitucions!: Sequelize.BelongsToManySetAssociationsMixin<Institucion, InstitucionId>;
  addIdInstitucion_Institucion_PropuestaInstitucion!: Sequelize.BelongsToManyAddAssociationMixin<Institucion, InstitucionId>;
  addIdInstitucion_Institucion_PropuestaInstitucions!: Sequelize.BelongsToManyAddAssociationsMixin<Institucion, InstitucionId>;
  createIdInstitucion_Institucion_PropuestaInstitucion!: Sequelize.BelongsToManyCreateAssociationMixin<Institucion>;
  removeIdInstitucion_Institucion_PropuestaInstitucion!: Sequelize.BelongsToManyRemoveAssociationMixin<Institucion, InstitucionId>;
  removeIdInstitucion_Institucion_PropuestaInstitucions!: Sequelize.BelongsToManyRemoveAssociationsMixin<Institucion, InstitucionId>;
  hasIdInstitucion_Institucion_PropuestaInstitucion!: Sequelize.BelongsToManyHasAssociationMixin<Institucion, InstitucionId>;
  hasIdInstitucion_Institucion_PropuestaInstitucions!: Sequelize.BelongsToManyHasAssociationsMixin<Institucion, InstitucionId>;
  countIdInstitucion_Institucion_PropuestaInstitucions!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Propuesta hasMany Integrante via codigoPropuesta
  Integrantes!: Integrante[];
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
  idLineaTematica_LineaTematicas!: LineaTematica[];
  getIdLineaTematica_LineaTematicas!: Sequelize.BelongsToManyGetAssociationsMixin<LineaTematica>;
  setIdLineaTematica_LineaTematicas!: Sequelize.BelongsToManySetAssociationsMixin<LineaTematica, LineaTematicaId>;
  addIdLineaTematica_LineaTematica!: Sequelize.BelongsToManyAddAssociationMixin<LineaTematica, LineaTematicaId>;
  addIdLineaTematica_LineaTematicas!: Sequelize.BelongsToManyAddAssociationsMixin<LineaTematica, LineaTematicaId>;
  createIdLineaTematica_LineaTematica!: Sequelize.BelongsToManyCreateAssociationMixin<LineaTematica>;
  removeIdLineaTematica_LineaTematica!: Sequelize.BelongsToManyRemoveAssociationMixin<LineaTematica, LineaTematicaId>;
  removeIdLineaTematica_LineaTematicas!: Sequelize.BelongsToManyRemoveAssociationsMixin<LineaTematica, LineaTematicaId>;
  hasIdLineaTematica_LineaTematica!: Sequelize.BelongsToManyHasAssociationMixin<LineaTematica, LineaTematicaId>;
  hasIdLineaTematica_LineaTematicas!: Sequelize.BelongsToManyHasAssociationsMixin<LineaTematica, LineaTematicaId>;
  countIdLineaTematica_LineaTematicas!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Propuesta hasMany ObjetivoEspecifico via codigoPropuesta
  ObjetivoEspecificos!: ObjetivoEspecifico[];
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
  idPalabraClave_PalabraClaves!: PalabraClave[];
  getIdPalabraClave_PalabraClaves!: Sequelize.BelongsToManyGetAssociationsMixin<PalabraClave>;
  setIdPalabraClave_PalabraClaves!: Sequelize.BelongsToManySetAssociationsMixin<PalabraClave, PalabraClaveId>;
  addIdPalabraClave_PalabraClave!: Sequelize.BelongsToManyAddAssociationMixin<PalabraClave, PalabraClaveId>;
  addIdPalabraClave_PalabraClaves!: Sequelize.BelongsToManyAddAssociationsMixin<PalabraClave, PalabraClaveId>;
  createIdPalabraClave_PalabraClave!: Sequelize.BelongsToManyCreateAssociationMixin<PalabraClave>;
  removeIdPalabraClave_PalabraClave!: Sequelize.BelongsToManyRemoveAssociationMixin<PalabraClave, PalabraClaveId>;
  removeIdPalabraClave_PalabraClaves!: Sequelize.BelongsToManyRemoveAssociationsMixin<PalabraClave, PalabraClaveId>;
  hasIdPalabraClave_PalabraClave!: Sequelize.BelongsToManyHasAssociationMixin<PalabraClave, PalabraClaveId>;
  hasIdPalabraClave_PalabraClaves!: Sequelize.BelongsToManyHasAssociationsMixin<PalabraClave, PalabraClaveId>;
  countIdPalabraClave_PalabraClaves!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Propuesta hasMany ParticipanteSocial via codigoPropuesta
  ParticipanteSocials!: ParticipanteSocial[];
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
  nroDoc_Personas!: Persona[];
  getNroDoc_Personas!: Sequelize.BelongsToManyGetAssociationsMixin<Persona>;
  setNroDoc_Personas!: Sequelize.BelongsToManySetAssociationsMixin<Persona, PersonaId>;
  addNroDoc_Persona!: Sequelize.BelongsToManyAddAssociationMixin<Persona, PersonaId>;
  addNroDoc_Personas!: Sequelize.BelongsToManyAddAssociationsMixin<Persona, PersonaId>;
  createNroDoc_Persona!: Sequelize.BelongsToManyCreateAssociationMixin<Persona>;
  removeNroDoc_Persona!: Sequelize.BelongsToManyRemoveAssociationMixin<Persona, PersonaId>;
  removeNroDoc_Personas!: Sequelize.BelongsToManyRemoveAssociationsMixin<Persona, PersonaId>;
  hasNroDoc_Persona!: Sequelize.BelongsToManyHasAssociationMixin<Persona, PersonaId>;
  hasNroDoc_Personas!: Sequelize.BelongsToManyHasAssociationsMixin<Persona, PersonaId>;
  countNroDoc_Personas!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Propuesta belongsToMany ProgramaSippe via codigoPropuesta and idProgramaExtension
  idProgramaExtension_ProgramaSIPPEs!: ProgramaSippe[];
  getIdProgramaExtension_ProgramaSIPPEs!: Sequelize.BelongsToManyGetAssociationsMixin<ProgramaSippe>;
  setIdProgramaExtension_ProgramaSIPPEs!: Sequelize.BelongsToManySetAssociationsMixin<ProgramaSippe, ProgramaSippeId>;
  addIdProgramaExtension_ProgramaSIPPE!: Sequelize.BelongsToManyAddAssociationMixin<ProgramaSippe, ProgramaSippeId>;
  addIdProgramaExtension_ProgramaSIPPEs!: Sequelize.BelongsToManyAddAssociationsMixin<ProgramaSippe, ProgramaSippeId>;
  createIdProgramaExtension_ProgramaSIPPE!: Sequelize.BelongsToManyCreateAssociationMixin<ProgramaSippe>;
  removeIdProgramaExtension_ProgramaSIPPE!: Sequelize.BelongsToManyRemoveAssociationMixin<ProgramaSippe, ProgramaSippeId>;
  removeIdProgramaExtension_ProgramaSIPPEs!: Sequelize.BelongsToManyRemoveAssociationsMixin<ProgramaSippe, ProgramaSippeId>;
  hasIdProgramaExtension_ProgramaSIPPE!: Sequelize.BelongsToManyHasAssociationMixin<ProgramaSippe, ProgramaSippeId>;
  hasIdProgramaExtension_ProgramaSIPPEs!: Sequelize.BelongsToManyHasAssociationsMixin<ProgramaSippe, ProgramaSippeId>;
  countIdProgramaExtension_ProgramaSIPPEs!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Propuesta belongsToMany Propuesta via codigoPropuesta and codigoPropuestaPrevia
  codigoPropuestaPrevia_Propuesta!: Propuesta[];
  getCodigoPropuestaPrevia_Propuesta!: Sequelize.BelongsToManyGetAssociationsMixin<Propuesta>;
  setCodigoPropuestaPrevia_Propuesta!: Sequelize.BelongsToManySetAssociationsMixin<Propuesta, PropuestaId>;
  addCodigoPropuestaPrevia_Propuestum!: Sequelize.BelongsToManyAddAssociationMixin<Propuesta, PropuestaId>;
  addCodigoPropuestaPrevia_Propuesta!: Sequelize.BelongsToManyAddAssociationsMixin<Propuesta, PropuestaId>;
  createCodigoPropuestaPrevia_Propuestum!: Sequelize.BelongsToManyCreateAssociationMixin<Propuesta>;
  removeCodigoPropuestaPrevia_Propuestum!: Sequelize.BelongsToManyRemoveAssociationMixin<Propuesta, PropuestaId>;
  removeCodigoPropuestaPrevia_Propuesta!: Sequelize.BelongsToManyRemoveAssociationsMixin<Propuesta, PropuestaId>;
  hasCodigoPropuestaPrevia_Propuestum!: Sequelize.BelongsToManyHasAssociationMixin<Propuesta, PropuestaId>;
  hasCodigoPropuestaPrevia_Propuesta!: Sequelize.BelongsToManyHasAssociationsMixin<Propuesta, PropuestaId>;
  countCodigoPropuestaPrevia_Propuesta!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Propuesta belongsToMany Propuesta via codigoPropuestaPrevia and codigoPropuesta
  codigoPropuesta_Propuesta_PropuestaPrevia!: Propuesta[];
  getCodigoPropuesta_Propuesta_PropuestaPrevia!: Sequelize.BelongsToManyGetAssociationsMixin<Propuesta>;
  setCodigoPropuesta_Propuesta_PropuestaPrevia!: Sequelize.BelongsToManySetAssociationsMixin<Propuesta, PropuestaId>;
  addCodigoPropuesta_Propuesta_PropuestaPrevium!: Sequelize.BelongsToManyAddAssociationMixin<Propuesta, PropuestaId>;
  addCodigoPropuesta_Propuesta_PropuestaPrevia!: Sequelize.BelongsToManyAddAssociationsMixin<Propuesta, PropuestaId>;
  createCodigoPropuesta_Propuesta_PropuestaPrevium!: Sequelize.BelongsToManyCreateAssociationMixin<Propuesta>;
  removeCodigoPropuesta_Propuesta_PropuestaPrevium!: Sequelize.BelongsToManyRemoveAssociationMixin<Propuesta, PropuestaId>;
  removeCodigoPropuesta_Propuesta_PropuestaPrevia!: Sequelize.BelongsToManyRemoveAssociationsMixin<Propuesta, PropuestaId>;
  hasCodigoPropuesta_Propuesta_PropuestaPrevium!: Sequelize.BelongsToManyHasAssociationMixin<Propuesta, PropuestaId>;
  hasCodigoPropuesta_Propuesta_PropuestaPrevia!: Sequelize.BelongsToManyHasAssociationsMixin<Propuesta, PropuestaId>;
  countCodigoPropuesta_Propuesta_PropuestaPrevia!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Propuesta belongsToMany Propuesta via codigoPropuesta and codigoPropuestaRelacionada
  codigoPropuestaRelacionada_Propuesta!: Propuesta[];
  getCodigoPropuestaRelacionada_Propuesta!: Sequelize.BelongsToManyGetAssociationsMixin<Propuesta>;
  setCodigoPropuestaRelacionada_Propuesta!: Sequelize.BelongsToManySetAssociationsMixin<Propuesta, PropuestaId>;
  addCodigoPropuestaRelacionada_Propuestum!: Sequelize.BelongsToManyAddAssociationMixin<Propuesta, PropuestaId>;
  addCodigoPropuestaRelacionada_Propuesta!: Sequelize.BelongsToManyAddAssociationsMixin<Propuesta, PropuestaId>;
  createCodigoPropuestaRelacionada_Propuestum!: Sequelize.BelongsToManyCreateAssociationMixin<Propuesta>;
  removeCodigoPropuestaRelacionada_Propuestum!: Sequelize.BelongsToManyRemoveAssociationMixin<Propuesta, PropuestaId>;
  removeCodigoPropuestaRelacionada_Propuesta!: Sequelize.BelongsToManyRemoveAssociationsMixin<Propuesta, PropuestaId>;
  hasCodigoPropuestaRelacionada_Propuestum!: Sequelize.BelongsToManyHasAssociationMixin<Propuesta, PropuestaId>;
  hasCodigoPropuestaRelacionada_Propuesta!: Sequelize.BelongsToManyHasAssociationsMixin<Propuesta, PropuestaId>;
  countCodigoPropuestaRelacionada_Propuesta!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Propuesta belongsToMany Propuesta via codigoPropuestaRelacionada and codigoPropuesta
  codigoPropuesta_Propuesta_PropuestaRelacionadas!: Propuesta[];
  getCodigoPropuesta_Propuesta_PropuestaRelacionadas!: Sequelize.BelongsToManyGetAssociationsMixin<Propuesta>;
  setCodigoPropuesta_Propuesta_PropuestaRelacionadas!: Sequelize.BelongsToManySetAssociationsMixin<Propuesta, PropuestaId>;
  addCodigoPropuesta_Propuesta_PropuestaRelacionada!: Sequelize.BelongsToManyAddAssociationMixin<Propuesta, PropuestaId>;
  addCodigoPropuesta_Propuesta_PropuestaRelacionadas!: Sequelize.BelongsToManyAddAssociationsMixin<Propuesta, PropuestaId>;
  createCodigoPropuesta_Propuesta_PropuestaRelacionada!: Sequelize.BelongsToManyCreateAssociationMixin<Propuesta>;
  removeCodigoPropuesta_Propuesta_PropuestaRelacionada!: Sequelize.BelongsToManyRemoveAssociationMixin<Propuesta, PropuestaId>;
  removeCodigoPropuesta_Propuesta_PropuestaRelacionadas!: Sequelize.BelongsToManyRemoveAssociationsMixin<Propuesta, PropuestaId>;
  hasCodigoPropuesta_Propuesta_PropuestaRelacionada!: Sequelize.BelongsToManyHasAssociationMixin<Propuesta, PropuestaId>;
  hasCodigoPropuesta_Propuesta_PropuestaRelacionadas!: Sequelize.BelongsToManyHasAssociationsMixin<Propuesta, PropuestaId>;
  countCodigoPropuesta_Propuesta_PropuestaRelacionadas!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Propuesta hasMany PropuestaCapacitacion via codigoPropuesta
  PropuestaCapacitacions!: PropuestaCapacitacion[];
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
  PropuestaInstitucions!: PropuestaInstitucion[];
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
  PropuestaLineaTematicas!: PropuestaLineaTematica[];
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
  PropuestaPalabraClaves!: PropuestaPalabraClave[];
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
  // Propuesta hasMany PropuestaPrevia via codigoPropuesta
  PropuestaPrevia!: PropuestaPrevia[];
  getPropuestaPrevia!: Sequelize.HasManyGetAssociationsMixin<PropuestaPrevia>;
  setPropuestaPrevia!: Sequelize.HasManySetAssociationsMixin<PropuestaPrevia, PropuestaPreviaId>;
  addPropuestaPrevium!: Sequelize.HasManyAddAssociationMixin<PropuestaPrevia, PropuestaPreviaId>;
  addPropuestaPrevia!: Sequelize.HasManyAddAssociationsMixin<PropuestaPrevia, PropuestaPreviaId>;
  createPropuestaPrevium!: Sequelize.HasManyCreateAssociationMixin<PropuestaPrevia>;
  removePropuestaPrevium!: Sequelize.HasManyRemoveAssociationMixin<PropuestaPrevia, PropuestaPreviaId>;
  removePropuestaPrevia!: Sequelize.HasManyRemoveAssociationsMixin<PropuestaPrevia, PropuestaPreviaId>;
  hasPropuestaPrevium!: Sequelize.HasManyHasAssociationMixin<PropuestaPrevia, PropuestaPreviaId>;
  hasPropuestaPrevia!: Sequelize.HasManyHasAssociationsMixin<PropuestaPrevia, PropuestaPreviaId>;
  countPropuestaPrevia!: Sequelize.HasManyCountAssociationsMixin;
  // Propuesta hasMany PropuestaPrevia via codigoPropuestaPrevia
  codigoPropuestaPrevia_PropuestaPrevia!: PropuestaPrevia[];
  getCodigoPropuestaPrevia_PropuestaPrevia!: Sequelize.HasManyGetAssociationsMixin<PropuestaPrevia>;
  setCodigoPropuestaPrevia_PropuestaPrevia!: Sequelize.HasManySetAssociationsMixin<PropuestaPrevia, PropuestaPreviaId>;
  addCodigoPropuestaPrevia_PropuestaPrevium!: Sequelize.HasManyAddAssociationMixin<PropuestaPrevia, PropuestaPreviaId>;
  addCodigoPropuestaPrevia_PropuestaPrevia!: Sequelize.HasManyAddAssociationsMixin<PropuestaPrevia, PropuestaPreviaId>;
  createCodigoPropuestaPrevia_PropuestaPrevium!: Sequelize.HasManyCreateAssociationMixin<PropuestaPrevia>;
  removeCodigoPropuestaPrevia_PropuestaPrevium!: Sequelize.HasManyRemoveAssociationMixin<PropuestaPrevia, PropuestaPreviaId>;
  removeCodigoPropuestaPrevia_PropuestaPrevia!: Sequelize.HasManyRemoveAssociationsMixin<PropuestaPrevia, PropuestaPreviaId>;
  hasCodigoPropuestaPrevia_PropuestaPrevium!: Sequelize.HasManyHasAssociationMixin<PropuestaPrevia, PropuestaPreviaId>;
  hasCodigoPropuestaPrevia_PropuestaPrevia!: Sequelize.HasManyHasAssociationsMixin<PropuestaPrevia, PropuestaPreviaId>;
  countCodigoPropuestaPrevia_PropuestaPrevia!: Sequelize.HasManyCountAssociationsMixin;
  // Propuesta hasMany PropuestaProgramaExtension via codigoPropuesta
  PropuestaProgramaExtensions!: PropuestaProgramaExtension[];
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
  PropuestaRelacionadas!: PropuestaRelacionada[];
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
  codigoPropuestaRelacionada_PropuestaRelacionadas!: PropuestaRelacionada[];
  getCodigoPropuestaRelacionada_PropuestaRelacionadas!: Sequelize.HasManyGetAssociationsMixin<PropuestaRelacionada>;
  setCodigoPropuestaRelacionada_PropuestaRelacionadas!: Sequelize.HasManySetAssociationsMixin<PropuestaRelacionada, PropuestaRelacionadaId>;
  addCodigoPropuestaRelacionada_PropuestaRelacionada!: Sequelize.HasManyAddAssociationMixin<PropuestaRelacionada, PropuestaRelacionadaId>;
  addCodigoPropuestaRelacionada_PropuestaRelacionadas!: Sequelize.HasManyAddAssociationsMixin<PropuestaRelacionada, PropuestaRelacionadaId>;
  createCodigoPropuestaRelacionada_PropuestaRelacionada!: Sequelize.HasManyCreateAssociationMixin<PropuestaRelacionada>;
  removeCodigoPropuestaRelacionada_PropuestaRelacionada!: Sequelize.HasManyRemoveAssociationMixin<PropuestaRelacionada, PropuestaRelacionadaId>;
  removeCodigoPropuestaRelacionada_PropuestaRelacionadas!: Sequelize.HasManyRemoveAssociationsMixin<PropuestaRelacionada, PropuestaRelacionadaId>;
  hasCodigoPropuestaRelacionada_PropuestaRelacionada!: Sequelize.HasManyHasAssociationMixin<PropuestaRelacionada, PropuestaRelacionadaId>;
  hasCodigoPropuestaRelacionada_PropuestaRelacionadas!: Sequelize.HasManyHasAssociationsMixin<PropuestaRelacionada, PropuestaRelacionadaId>;
  countCodigoPropuestaRelacionada_PropuestaRelacionadas!: Sequelize.HasManyCountAssociationsMixin;
  // Propuesta hasMany UbicacionProblematica via codigoPropuesta
  UbicacionProblematicas!: UbicacionProblematica[];
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
  idUsuario_Usuario!: Usuario;
  getIdUsuario_Usuario!: Sequelize.BelongsToGetAssociationMixin<Usuario>;
  setIdUsuario_Usuario!: Sequelize.BelongsToSetAssociationMixin<Usuario, UsuarioId>;
  createIdUsuario_Usuario!: Sequelize.BelongsToCreateAssociationMixin<Usuario>;


  public async leerDatosDeBD( ) : Promise<TPropuesta> {
    let salida : TPropuesta = PROPUESTA_VACIA;
    
    const transaction = await this.sequelize.transaction(
      {
        logging : msg => console.log(msg)
      }
    );
    
    try {
      
      const obteniendoInstituciones = await this.getIns


      await transaction.commit();
    } catch (error) {
      
      await transaction.rollback();
      throw error;    
    }

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
    }
  }, {
    sequelize,
    tableName: 'Propuesta',
    timestamps: true,
    paranoid: true
  });
  }
}
