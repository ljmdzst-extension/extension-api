import type { Sequelize } from "sequelize";
import { Actividad as _Actividad } from "./Actividad";
import type { ActividadAttributes, ActividadCreationAttributes } from "./Actividad";
import { ActividadObjetivoEspecifico as _ActividadObjetivoEspecifico } from "./ActividadObjetivoEspecifico";
import type { ActividadObjetivoEspecificoAttributes, ActividadObjetivoEspecificoCreationAttributes } from "./ActividadObjetivoEspecifico";
import { ActividadParticipanteSocial as _ActividadParticipanteSocial } from "./ActividadParticipanteSocial";
import type { ActividadParticipanteSocialAttributes, ActividadParticipanteSocialCreationAttributes } from "./ActividadParticipanteSocial";
import { Area as _Area } from "./Area";
import type { AreaAttributes, AreaCreationAttributes } from "./Area";
import { Capacitacion as _Capacitacion } from "./Capacitacion";
import type { CapacitacionAttributes, CapacitacionCreationAttributes } from "./Capacitacion";
import { Carrera as _Carrera } from "./Carrera";
import type { CarreraAttributes, CarreraCreationAttributes } from "./Carrera";
import { Categoria as _Categoria } from "./Categoria";
import type { CategoriaAttributes, CategoriaCreationAttributes } from "./Categoria";
import { CronogramaActividad as _CronogramaActividad } from "./CronogramaActividad";
import type { CronogramaActividadAttributes, CronogramaActividadCreationAttributes } from "./CronogramaActividad";
import { Enlace as _Enlace } from "./Enlace";
import type { EnlaceAttributes, EnlaceCreationAttributes } from "./Enlace";
import { Evaluacion as _Evaluacion } from "./Evaluacion";
import type { EvaluacionAttributes, EvaluacionCreationAttributes } from "./Evaluacion";
import { EvaluacionItem as _EvaluacionItem } from "./EvaluacionItem";
import type { EvaluacionItemAttributes, EvaluacionItemCreationAttributes } from "./EvaluacionItem";
import { FechaPuntual as _FechaPuntual } from "./FechaPuntual";
import type { FechaPuntualAttributes, FechaPuntualCreationAttributes } from "./FechaPuntual";
import { FechaPuntualActividad as _FechaPuntualActividad } from "./FechaPuntualActividad";
import type { FechaPuntualActividadAttributes, FechaPuntualActividadCreationAttributes } from "./FechaPuntualActividad";
import { Institucion as _Institucion } from "./Institucion";
import type { InstitucionAttributes, InstitucionCreationAttributes } from "./Institucion";
import { InstitucionActividad as _InstitucionActividad } from "./InstitucionActividad";
import type { InstitucionActividadAttributes, InstitucionActividadCreationAttributes } from "./InstitucionActividad";
import { Integrante as _Integrante } from "./Integrante";
import type { IntegranteAttributes, IntegranteCreationAttributes } from "./Integrante";
import { LineaTematica as _LineaTematica } from "./LineaTematica";
import type { LineaTematicaAttributes, LineaTematicaCreationAttributes } from "./LineaTematica";
import { Meta as _Meta } from "./Meta";
import type { MetaAttributes, MetaCreationAttributes } from "./Meta";
import { Objetivo as _Objetivo } from "./Objetivo";
import type { ObjetivoAttributes, ObjetivoCreationAttributes } from "./Objetivo";
import { ObjetivoActividad as _ObjetivoActividad } from "./ObjetivoActividad";
import type { ObjetivoActividadAttributes, ObjetivoActividadCreationAttributes } from "./ObjetivoActividad";
import { ObjetivoEspecifico as _ObjetivoEspecifico } from "./ObjetivoEspecifico";
import type { ObjetivoEspecificoAttributes, ObjetivoEspecificoCreationAttributes } from "./ObjetivoEspecifico";
import { PalabraClave as _PalabraClave } from "./PalabraClave";
import type { PalabraClaveAttributes, PalabraClaveCreationAttributes } from "./PalabraClave";
import { ParticipanteSocial as _ParticipanteSocial } from "./ParticipanteSocial";
import type { ParticipanteSocialAttributes, ParticipanteSocialCreationAttributes } from "./ParticipanteSocial";
import { Permiso as _Permiso } from "./Permiso";
import type { PermisoAttributes, PermisoCreationAttributes } from "./Permiso";
import { PermisoCategoria as _PermisoCategoria } from "./PermisoCategoria";
import type { PermisoCategoriaAttributes, PermisoCategoriaCreationAttributes } from "./PermisoCategoria";
import { Persona as _Persona } from "./Persona";
import type { PersonaAttributes, PersonaCreationAttributes } from "./Persona";
import { Programa as _Programa } from "./Programa";
import type { ProgramaAttributes, ProgramaCreationAttributes } from "./Programa";
import { ProgramaSippe as _ProgramaSippe } from "./ProgramaSippe";
import type { ProgramaSippeAttributes, ProgramaSippeCreationAttributes } from "./ProgramaSippe";
import { ProgramaSippeActividad as _ProgramaSippeActividad } from "./ProgramaSippeActividad";
import type { ProgramaSippeActividadAttributes, ProgramaSippeActividadCreationAttributes } from "./ProgramaSippeActividad";
import { Propuesta as _Propuesta } from "./Propuesta";
import type { PropuestaAttributes, PropuestaCreationAttributes } from "./Propuesta";
import { PropuestaCapacitacion as _PropuestaCapacitacion } from "./PropuestaCapacitacion";
import type { PropuestaCapacitacionAttributes, PropuestaCapacitacionCreationAttributes } from "./PropuestaCapacitacion";
import { PropuestaInstitucion as _PropuestaInstitucion } from "./PropuestaInstitucion";
import type { PropuestaInstitucionAttributes, PropuestaInstitucionCreationAttributes } from "./PropuestaInstitucion";
import { PropuestaLineaTematica as _PropuestaLineaTematica } from "./PropuestaLineaTematica";
import type { PropuestaLineaTematicaAttributes, PropuestaLineaTematicaCreationAttributes } from "./PropuestaLineaTematica";
import { PropuestaPalabraClave as _PropuestaPalabraClave } from "./PropuestaPalabraClave";
import type { PropuestaPalabraClaveAttributes, PropuestaPalabraClaveCreationAttributes } from "./PropuestaPalabraClave";
import { PropuestaPrevia as _PropuestaPrevia } from "./PropuestaPrevia";
import type { PropuestaPreviaAttributes, PropuestaPreviaCreationAttributes } from "./PropuestaPrevia";
import { PropuestaProgramaExtension as _PropuestaProgramaExtension } from "./PropuestaProgramaExtension";
import type { PropuestaProgramaExtensionAttributes, PropuestaProgramaExtensionCreationAttributes } from "./PropuestaProgramaExtension";
import { PropuestaRelacionada as _PropuestaRelacionada } from "./PropuestaRelacionada";
import type { PropuestaRelacionadaAttributes, PropuestaRelacionadaCreationAttributes } from "./PropuestaRelacionada";
import { Relacion as _Relacion } from "./Relacion";
import type { RelacionAttributes, RelacionCreationAttributes } from "./Relacion";
import { RelacionActividad as _RelacionActividad } from "./RelacionActividad";
import type { RelacionActividadAttributes, RelacionActividadCreationAttributes } from "./RelacionActividad";
import { Responsable as _Responsable } from "./Responsable";
import type { ResponsableAttributes, ResponsableCreationAttributes } from "./Responsable";
import { Rol as _Rol } from "./Rol";
import type { RolAttributes, RolCreationAttributes } from "./Rol";
import { RolIntegrante as _RolIntegrante } from "./RolIntegrante";
import type { RolIntegranteAttributes, RolIntegranteCreationAttributes } from "./RolIntegrante";
import { TipoEvaluacion as _TipoEvaluacion } from "./TipoEvaluacion";
import type { TipoEvaluacionAttributes, TipoEvaluacionCreationAttributes } from "./TipoEvaluacion";
import { TipoObjetivo as _TipoObjetivo } from "./TipoObjetivo";
import type { TipoObjetivoAttributes, TipoObjetivoCreationAttributes } from "./TipoObjetivo";
import { TipoRelacion as _TipoRelacion } from "./TipoRelacion";
import type { TipoRelacionAttributes, TipoRelacionCreationAttributes } from "./TipoRelacion";
import { Ubicacion as _Ubicacion } from "./Ubicacion";
import type { UbicacionAttributes, UbicacionCreationAttributes } from "./Ubicacion";
import { UbicacionActividad as _UbicacionActividad } from "./UbicacionActividad";
import type { UbicacionActividadAttributes, UbicacionActividadCreationAttributes } from "./UbicacionActividad";
import { UbicacionProblematica as _UbicacionProblematica } from "./UbicacionProblematica";
import type { UbicacionProblematicaAttributes, UbicacionProblematicaCreationAttributes } from "./UbicacionProblematica";
import { Usuario as _Usuario } from "./Usuario";
import type { UsuarioAttributes, UsuarioCreationAttributes } from "./Usuario";
import { UsuarioCategoria as _UsuarioCategoria } from "./UsuarioCategoria";
import type { UsuarioCategoriaAttributes, UsuarioCategoriaCreationAttributes } from "./UsuarioCategoria";
import { Valoracion as _Valoracion } from "./Valoracion";
import type { ValoracionAttributes, ValoracionCreationAttributes } from "./Valoracion";

export {
  _Actividad as Actividad,
  _ActividadObjetivoEspecifico as ActividadObjetivoEspecifico,
  _ActividadParticipanteSocial as ActividadParticipanteSocial,
  _Area as Area,
  _Capacitacion as Capacitacion,
  _Carrera as Carrera,
  _Categoria as Categoria,
  _CronogramaActividad as CronogramaActividad,
  _Enlace as Enlace,
  _Evaluacion as Evaluacion,
  _EvaluacionItem as EvaluacionItem,
  _FechaPuntual as FechaPuntual,
  _FechaPuntualActividad as FechaPuntualActividad,
  _Institucion as Institucion,
  _InstitucionActividad as InstitucionActividad,
  _Integrante as Integrante,
  _LineaTematica as LineaTematica,
  _Meta as Meta,
  _Objetivo as Objetivo,
  _ObjetivoActividad as ObjetivoActividad,
  _ObjetivoEspecifico as ObjetivoEspecifico,
  _PalabraClave as PalabraClave,
  _ParticipanteSocial as ParticipanteSocial,
  _Permiso as Permiso,
  _PermisoCategoria as PermisoCategoria,
  _Persona as Persona,
  _Programa as Programa,
  _ProgramaSippe as ProgramaSippe,
  _ProgramaSippeActividad as ProgramaSippeActividad,
  _Propuesta as Propuesta,
  _PropuestaCapacitacion as PropuestaCapacitacion,
  _PropuestaInstitucion as PropuestaInstitucion,
  _PropuestaLineaTematica as PropuestaLineaTematica,
  _PropuestaPalabraClave as PropuestaPalabraClave,
  _PropuestaPrevia as PropuestaPrevia,
  _PropuestaProgramaExtension as PropuestaProgramaExtension,
  _PropuestaRelacionada as PropuestaRelacionada,
  _Relacion as Relacion,
  _RelacionActividad as RelacionActividad,
  _Responsable as Responsable,
  _Rol as Rol,
  _RolIntegrante as RolIntegrante,
  _TipoEvaluacion as TipoEvaluacion,
  _TipoObjetivo as TipoObjetivo,
  _TipoRelacion as TipoRelacion,
  _Ubicacion as Ubicacion,
  _UbicacionActividad as UbicacionActividad,
  _UbicacionProblematica as UbicacionProblematica,
  _Usuario as Usuario,
  _UsuarioCategoria as UsuarioCategoria,
  _Valoracion as Valoracion,
};

export type {
  ActividadAttributes,
  ActividadCreationAttributes,
  ActividadObjetivoEspecificoAttributes,
  ActividadObjetivoEspecificoCreationAttributes,
  ActividadParticipanteSocialAttributes,
  ActividadParticipanteSocialCreationAttributes,
  AreaAttributes,
  AreaCreationAttributes,
  CapacitacionAttributes,
  CapacitacionCreationAttributes,
  CarreraAttributes,
  CarreraCreationAttributes,
  CategoriaAttributes,
  CategoriaCreationAttributes,
  CronogramaActividadAttributes,
  CronogramaActividadCreationAttributes,
  EnlaceAttributes,
  EnlaceCreationAttributes,
  EvaluacionAttributes,
  EvaluacionCreationAttributes,
  EvaluacionItemAttributes,
  EvaluacionItemCreationAttributes,
  FechaPuntualAttributes,
  FechaPuntualCreationAttributes,
  FechaPuntualActividadAttributes,
  FechaPuntualActividadCreationAttributes,
  InstitucionAttributes,
  InstitucionCreationAttributes,
  InstitucionActividadAttributes,
  InstitucionActividadCreationAttributes,
  IntegranteAttributes,
  IntegranteCreationAttributes,
  LineaTematicaAttributes,
  LineaTematicaCreationAttributes,
  MetaAttributes,
  MetaCreationAttributes,
  ObjetivoAttributes,
  ObjetivoCreationAttributes,
  ObjetivoActividadAttributes,
  ObjetivoActividadCreationAttributes,
  ObjetivoEspecificoAttributes,
  ObjetivoEspecificoCreationAttributes,
  PalabraClaveAttributes,
  PalabraClaveCreationAttributes,
  ParticipanteSocialAttributes,
  ParticipanteSocialCreationAttributes,
  PermisoAttributes,
  PermisoCreationAttributes,
  PermisoCategoriaAttributes,
  PermisoCategoriaCreationAttributes,
  PersonaAttributes,
  PersonaCreationAttributes,
  ProgramaAttributes,
  ProgramaCreationAttributes,
  ProgramaSippeAttributes,
  ProgramaSippeCreationAttributes,
  ProgramaSippeActividadAttributes,
  ProgramaSippeActividadCreationAttributes,
  PropuestaAttributes,
  PropuestaCreationAttributes,
  PropuestaCapacitacionAttributes,
  PropuestaCapacitacionCreationAttributes,
  PropuestaInstitucionAttributes,
  PropuestaInstitucionCreationAttributes,
  PropuestaLineaTematicaAttributes,
  PropuestaLineaTematicaCreationAttributes,
  PropuestaPalabraClaveAttributes,
  PropuestaPalabraClaveCreationAttributes,
  PropuestaPreviaAttributes,
  PropuestaPreviaCreationAttributes,
  PropuestaProgramaExtensionAttributes,
  PropuestaProgramaExtensionCreationAttributes,
  PropuestaRelacionadaAttributes,
  PropuestaRelacionadaCreationAttributes,
  RelacionAttributes,
  RelacionCreationAttributes,
  RelacionActividadAttributes,
  RelacionActividadCreationAttributes,
  ResponsableAttributes,
  ResponsableCreationAttributes,
  RolAttributes,
  RolCreationAttributes,
  RolIntegranteAttributes,
  RolIntegranteCreationAttributes,
  TipoEvaluacionAttributes,
  TipoEvaluacionCreationAttributes,
  TipoObjetivoAttributes,
  TipoObjetivoCreationAttributes,
  TipoRelacionAttributes,
  TipoRelacionCreationAttributes,
  UbicacionAttributes,
  UbicacionCreationAttributes,
  UbicacionActividadAttributes,
  UbicacionActividadCreationAttributes,
  UbicacionProblematicaAttributes,
  UbicacionProblematicaCreationAttributes,
  UsuarioAttributes,
  UsuarioCreationAttributes,
  UsuarioCategoriaAttributes,
  UsuarioCategoriaCreationAttributes,
  ValoracionAttributes,
  ValoracionCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const Actividad = _Actividad.initModel(sequelize);
  const ActividadObjetivoEspecifico = _ActividadObjetivoEspecifico.initModel(sequelize);
  const ActividadParticipanteSocial = _ActividadParticipanteSocial.initModel(sequelize);
  const Area = _Area.initModel(sequelize);
  const Capacitacion = _Capacitacion.initModel(sequelize);
  const Carrera = _Carrera.initModel(sequelize);
  const Categoria = _Categoria.initModel(sequelize);
  const CronogramaActividad = _CronogramaActividad.initModel(sequelize);
  const Enlace = _Enlace.initModel(sequelize);
  const Evaluacion = _Evaluacion.initModel(sequelize);
  const EvaluacionItem = _EvaluacionItem.initModel(sequelize);
  const FechaPuntual = _FechaPuntual.initModel(sequelize);
  const FechaPuntualActividad = _FechaPuntualActividad.initModel(sequelize);
  const Institucion = _Institucion.initModel(sequelize);
  const InstitucionActividad = _InstitucionActividad.initModel(sequelize);
  const Integrante = _Integrante.initModel(sequelize);
  const LineaTematica = _LineaTematica.initModel(sequelize);
  const Meta = _Meta.initModel(sequelize);
  const Objetivo = _Objetivo.initModel(sequelize);
  const ObjetivoActividad = _ObjetivoActividad.initModel(sequelize);
  const ObjetivoEspecifico = _ObjetivoEspecifico.initModel(sequelize);
  const PalabraClave = _PalabraClave.initModel(sequelize);
  const ParticipanteSocial = _ParticipanteSocial.initModel(sequelize);
  const Permiso = _Permiso.initModel(sequelize);
  const PermisoCategoria = _PermisoCategoria.initModel(sequelize);
  const Persona = _Persona.initModel(sequelize);
  const Programa = _Programa.initModel(sequelize);
  const ProgramaSippe = _ProgramaSippe.initModel(sequelize);
  const ProgramaSippeActividad = _ProgramaSippeActividad.initModel(sequelize);
  const Propuesta = _Propuesta.initModel(sequelize);
  const PropuestaCapacitacion = _PropuestaCapacitacion.initModel(sequelize);
  const PropuestaInstitucion = _PropuestaInstitucion.initModel(sequelize);
  const PropuestaLineaTematica = _PropuestaLineaTematica.initModel(sequelize);
  const PropuestaPalabraClave = _PropuestaPalabraClave.initModel(sequelize);
  const PropuestaPrevia = _PropuestaPrevia.initModel(sequelize);
  const PropuestaProgramaExtension = _PropuestaProgramaExtension.initModel(sequelize);
  const PropuestaRelacionada = _PropuestaRelacionada.initModel(sequelize);
  const Relacion = _Relacion.initModel(sequelize);
  const RelacionActividad = _RelacionActividad.initModel(sequelize);
  const Responsable = _Responsable.initModel(sequelize);
  const Rol = _Rol.initModel(sequelize);
  const RolIntegrante = _RolIntegrante.initModel(sequelize);
  const TipoEvaluacion = _TipoEvaluacion.initModel(sequelize);
  const TipoObjetivo = _TipoObjetivo.initModel(sequelize);
  const TipoRelacion = _TipoRelacion.initModel(sequelize);
  const Ubicacion = _Ubicacion.initModel(sequelize);
  const UbicacionActividad = _UbicacionActividad.initModel(sequelize);
  const UbicacionProblematica = _UbicacionProblematica.initModel(sequelize);
  const Usuario = _Usuario.initModel(sequelize);
  const UsuarioCategoria = _UsuarioCategoria.initModel(sequelize);
  const Valoracion = _Valoracion.initModel(sequelize);

  Actividad.belongsToMany(FechaPuntual, { as: 'idFechaFechaPuntuals', through: FechaPuntualActividad, foreignKey: "idActividad", otherKey: "idFecha" });
  Actividad.belongsToMany(Institucion, { as: 'idInstitucionInstitucions', through: InstitucionActividad, foreignKey: "idActividad", otherKey: "idInstitucion" });
  Actividad.belongsToMany(Objetivo, { as: 'idObjetivoObjetivos', through: ObjetivoActividad, foreignKey: "idActividad", otherKey: "idObjetivo" });
  Actividad.belongsToMany(ProgramaSippe, { as: 'idProgramaSippeProgramaSippes', through: ProgramaSippeActividad, foreignKey: "idActividad", otherKey: "idProgramaSippe" });
  Actividad.belongsToMany(Relacion, { as: 'idRelacionRelacions', through: RelacionActividad, foreignKey: "idActividad", otherKey: "idRelacion" });
  Actividad.belongsToMany(Ubicacion, { as: 'idUbicacionUbicacions', through: UbicacionActividad, foreignKey: "idActividad", otherKey: "idUbicacion" });
  Capacitacion.belongsToMany(Propuesta, { as: 'codigoPropuestaPropuestaPropuestaCapacitacions', through: PropuestaCapacitacion, foreignKey: "idCapacitacion", otherKey: "codigoPropuesta" });
  Categoria.belongsToMany(Permiso, { as: 'idPermisoPermisos', through: PermisoCategoria, foreignKey: "idCategoria", otherKey: "idPermiso" });
  Categoria.belongsToMany(Usuario, { as: 'idUsuarioUsuarioUsuarioCategoria', through: UsuarioCategoria, foreignKey: "idCategoria", otherKey: "idUsuario" });
  Evaluacion.belongsToMany(Usuario, { as: 'idUsuarioUsuarios', through: EvaluacionItem, foreignKey: "idEvaluacion", otherKey: "idUsuario" });
  FechaPuntual.belongsToMany(Actividad, { as: 'idActividadActividads', through: FechaPuntualActividad, foreignKey: "idFecha", otherKey: "idActividad" });
  Institucion.belongsToMany(Actividad, { as: 'idActividadActividadInstitucionActividads', through: InstitucionActividad, foreignKey: "idInstitucion", otherKey: "idActividad" });
  Institucion.belongsToMany(Persona, { as: 'nroDocPersonaResponsables', through: Responsable, foreignKey: "idInstitucion", otherKey: "nroDoc" });
  Institucion.belongsToMany(Propuesta, { as: 'codigoPropuestaPropuestaPropuestaInstitucions', through: PropuestaInstitucion, foreignKey: "idInstitucion", otherKey: "codigoPropuesta" });
  LineaTematica.belongsToMany(Propuesta, { as: 'codigoPropuestaPropuestaPropuestaLineaTematicas', through: PropuestaLineaTematica, foreignKey: "idLineaTematica", otherKey: "codigoPropuesta" });
  Objetivo.belongsToMany(Actividad, { as: 'idActividadActividadObjetivoActividads', through: ObjetivoActividad, foreignKey: "idObjetivo", otherKey: "idActividad" });
  PalabraClave.belongsToMany(Propuesta, { as: 'codigoPropuestaPropuestaPropuestaPalabraClaves', through: PropuestaPalabraClave, foreignKey: "idPalabraClave", otherKey: "codigoPropuesta" });
  Permiso.belongsToMany(Categoria, { as: 'idCategoriaCategoria', through: PermisoCategoria, foreignKey: "idPermiso", otherKey: "idCategoria" });
  Persona.belongsToMany(Institucion, { as: 'idInstitucionInstitucionResponsables', through: Responsable, foreignKey: "nroDoc", otherKey: "idInstitucion" });
  Persona.belongsToMany(Propuesta, { as: 'codigoPropuestaPropuesta', through: Integrante, foreignKey: "nroDoc", otherKey: "codigoPropuesta" });
  ProgramaSippe.belongsToMany(Actividad, { as: 'idActividadActividadProgramaSippeActividads', through: ProgramaSippeActividad, foreignKey: "idProgramaSippe", otherKey: "idActividad" });
  ProgramaSippe.belongsToMany(Propuesta, { as: 'codigoPropuestaPropuestaPropuestaProgramaExtensions', through: PropuestaProgramaExtension, foreignKey: "idProgramaExtension", otherKey: "codigoPropuesta" });
  Propuesta.belongsToMany(Capacitacion, { as: 'idCapacitacionCapacitacions', through: PropuestaCapacitacion, foreignKey: "codigoPropuesta", otherKey: "idCapacitacion" });
  Propuesta.belongsToMany(Institucion, { as: 'idInstitucionInstitucionPropuestaInstitucions', through: PropuestaInstitucion, foreignKey: "codigoPropuesta", otherKey: "idInstitucion" });
  Propuesta.belongsToMany(LineaTematica, { as: 'idLineaTematicaLineaTematicas', through: PropuestaLineaTematica, foreignKey: "codigoPropuesta", otherKey: "idLineaTematica" });
  Propuesta.belongsToMany(PalabraClave, { as: 'idPalabraClavePalabraClaves', through: PropuestaPalabraClave, foreignKey: "codigoPropuesta", otherKey: "idPalabraClave" });
  Propuesta.belongsToMany(Persona, { as: 'nroDocPersonas', through: Integrante, foreignKey: "codigoPropuesta", otherKey: "nroDoc" });
  Propuesta.belongsToMany(ProgramaSippe, { as: 'idProgramaExtensionProgramaSippes', through: PropuestaProgramaExtension, foreignKey: "codigoPropuesta", otherKey: "idProgramaExtension" });
  Propuesta.belongsToMany(Propuesta, { as: 'codigoPropuestaPreviaPropuesta', through: PropuestaPrevia, foreignKey: "codigoPropuesta", otherKey: "codigoPropuestaPrevia" });
  Propuesta.belongsToMany(Propuesta, { as: 'codigoPropuestaPropuestaPropuestaPrevia', through: PropuestaPrevia, foreignKey: "codigoPropuestaPrevia", otherKey: "codigoPropuesta" });
  Propuesta.belongsToMany(Propuesta, { as: 'codigoPropuestaRelacionadaPropuesta', through: PropuestaRelacionada, foreignKey: "codigoPropuesta", otherKey: "codigoPropuestaRelacionada" });
  Propuesta.belongsToMany(Propuesta, { as: 'codigoPropuestaPropuestaPropuestaRelacionadas', through: PropuestaRelacionada, foreignKey: "codigoPropuestaRelacionada", otherKey: "codigoPropuesta" });
  Relacion.belongsToMany(Actividad, { as: 'idActividadActividadRelacionActividads', through: RelacionActividad, foreignKey: "idRelacion", otherKey: "idActividad" });
  Ubicacion.belongsToMany(Actividad, { as: 'idActividadActividadUbicacionActividads', through: UbicacionActividad, foreignKey: "idUbicacion", otherKey: "idActividad" });
  Usuario.belongsToMany(Categoria, { as: 'idCategoriaCategoriaUsuarioCategoria', through: UsuarioCategoria, foreignKey: "idUsuario", otherKey: "idCategoria" });
  Usuario.belongsToMany(Evaluacion, { as: 'idEvaluacionEvaluacions', through: EvaluacionItem, foreignKey: "idUsuario", otherKey: "idEvaluacion" });
  Enlace.belongsTo(Actividad, { foreignKey: "idActividad"});
  Actividad.hasMany(Enlace, { foreignKey: "idActividad"});
  FechaPuntualActividad.belongsTo(Actividad, { foreignKey: "idActividad"});
  Actividad.hasMany(FechaPuntualActividad, { foreignKey: "idActividad"});
  InstitucionActividad.belongsTo(Actividad, { foreignKey: "idActividad"});
  Actividad.hasMany(InstitucionActividad, { foreignKey: "idActividad"});
  Meta.belongsTo(Actividad, { foreignKey: "idActividad"});
  Actividad.hasMany(Meta, { foreignKey: "idActividad"});
  ObjetivoActividad.belongsTo(Actividad, { foreignKey: "idActividad"});
  Actividad.hasMany(ObjetivoActividad, { foreignKey: "idActividad"});
  ProgramaSippeActividad.belongsTo(Actividad, { foreignKey: "idActividad"});
  Actividad.hasMany(ProgramaSippeActividad, { foreignKey: "idActividad"});
  RelacionActividad.belongsTo(Actividad, { foreignKey: "idActividad"});
  Actividad.hasMany(RelacionActividad, { foreignKey: "idActividad"});
  UbicacionActividad.belongsTo(Actividad, { foreignKey: "idActividad"});
  Actividad.hasMany(UbicacionActividad, { foreignKey: "idActividad"});
  CronogramaActividad.belongsTo(ActividadObjetivoEspecifico, { foreignKey: "idActividadObjetivoEspecifico"});
  ActividadObjetivoEspecifico.hasMany(CronogramaActividad, { foreignKey: "idActividadObjetivoEspecifico"});
  Actividad.belongsTo(Area, { foreignKey: "idArea"});
  Area.hasMany(Actividad, { foreignKey: "idArea"});
  PropuestaCapacitacion.belongsTo(Capacitacion, { foreignKey: "idCapacitacion"});
  Capacitacion.hasMany(PropuestaCapacitacion, { foreignKey: "idCapacitacion"});
  Integrante.belongsTo(Carrera, { foreignKey: "idCarrera"});
  Carrera.hasMany(Integrante, { foreignKey: "idCarrera"});
  PermisoCategoria.belongsTo(Categoria, { foreignKey: "idCategoria"});
  Categoria.hasMany(PermisoCategoria, { foreignKey: "idCategoria"});
  UsuarioCategoria.belongsTo(Categoria, { foreignKey: "idCategoria"});
  Categoria.hasMany(UsuarioCategoria, { foreignKey: "idCategoria"});
  EvaluacionItem.belongsTo(Evaluacion, { foreignKey: "idEvaluacion"});
  Evaluacion.hasMany(EvaluacionItem, { foreignKey: "idEvaluacion"});
  FechaPuntualActividad.belongsTo(FechaPuntual, { foreignKey: "idFecha"});
  FechaPuntual.hasMany(FechaPuntualActividad, { foreignKey: "idFecha"});
  InstitucionActividad.belongsTo(Institucion, { foreignKey: "idInstitucion"});
  Institucion.hasMany(InstitucionActividad, { foreignKey: "idInstitucion"});
  PropuestaInstitucion.belongsTo(Institucion, { foreignKey: "idInstitucion"});
  Institucion.hasMany(PropuestaInstitucion, { foreignKey: "idInstitucion"});
  Responsable.belongsTo(Institucion, { foreignKey: "idInstitucion"});
  Institucion.hasMany(Responsable, { foreignKey: "idInstitucion"});
  RolIntegrante.belongsTo(Integrante, { foreignKey: "nroDoc"});
  Integrante.hasMany(RolIntegrante, { foreignKey: "nroDoc"});
  RolIntegrante.belongsTo(Integrante, { foreignKey: "codigoPropuesta"});
  Integrante.hasMany(RolIntegrante, { foreignKey: "codigoPropuesta"});
  PropuestaLineaTematica.belongsTo(LineaTematica, { foreignKey: "idLineaTematica"});
  LineaTematica.hasMany(PropuestaLineaTematica, { foreignKey: "idLineaTematica"});
  ObjetivoActividad.belongsTo(Objetivo, { foreignKey: "idObjetivo"});
  Objetivo.hasMany(ObjetivoActividad, { foreignKey: "idObjetivo"});
  ActividadObjetivoEspecifico.belongsTo(ObjetivoEspecifico, { foreignKey: "idObjetivoEspecifico"});
  ObjetivoEspecifico.hasMany(ActividadObjetivoEspecifico, { foreignKey: "idObjetivoEspecifico"});
  PropuestaPalabraClave.belongsTo(PalabraClave, { foreignKey: "idPalabraClave"});
  PalabraClave.hasMany(PropuestaPalabraClave, { foreignKey: "idPalabraClave"});
  ActividadParticipanteSocial.belongsTo(ParticipanteSocial, { foreignKey: "idParticipanteSocial"});
  ParticipanteSocial.hasMany(ActividadParticipanteSocial, { foreignKey: "idParticipanteSocial"});
  PermisoCategoria.belongsTo(Permiso, { foreignKey: "idPermiso"});
  Permiso.hasMany(PermisoCategoria, { foreignKey: "idPermiso"});
  Integrante.belongsTo(Persona, { foreignKey: "nroDoc"});
  Persona.hasMany(Integrante, { foreignKey: "nroDoc"});
  Responsable.belongsTo(Persona, { foreignKey: "nroDoc"});
  Persona.hasMany(Responsable, { foreignKey: "nroDoc"});
  Usuario.belongsTo(Persona, { foreignKey: "nroDoc"});
  Persona.hasMany(Usuario, { foreignKey: "nroDoc"});
  Area.belongsTo(Programa, { foreignKey: "idPrograma"});
  Programa.hasMany(Area, { foreignKey: "idPrograma"});
  ProgramaSippeActividad.belongsTo(ProgramaSippe, { foreignKey: "idProgramaSippe"});
  ProgramaSippe.hasMany(ProgramaSippeActividad, { foreignKey: "idProgramaSippe"});
  PropuestaProgramaExtension.belongsTo(ProgramaSippe, { foreignKey: "idProgramaExtension"});
  ProgramaSippe.hasMany(PropuestaProgramaExtension, { foreignKey: "idProgramaExtension"});
  Evaluacion.belongsTo(Propuesta, { foreignKey: "codigoPropuesta"});
  Propuesta.hasMany(Evaluacion, { foreignKey: "codigoPropuesta"});
  Integrante.belongsTo(Propuesta, { foreignKey: "codigoPropuesta"});
  Propuesta.hasMany(Integrante, { foreignKey: "codigoPropuesta"});
  ObjetivoEspecifico.belongsTo(Propuesta, { foreignKey: "codigoPropuesta"});
  Propuesta.hasMany(ObjetivoEspecifico, { foreignKey: "codigoPropuesta"});
  ParticipanteSocial.belongsTo(Propuesta, { foreignKey: "codigoPropuesta"});
  Propuesta.hasMany(ParticipanteSocial, { foreignKey: "codigoPropuesta"});
  PropuestaCapacitacion.belongsTo(Propuesta, { foreignKey: "codigoPropuesta"});
  Propuesta.hasMany(PropuestaCapacitacion, { foreignKey: "codigoPropuesta"});
  PropuestaInstitucion.belongsTo(Propuesta, { foreignKey: "codigoPropuesta"});
  Propuesta.hasMany(PropuestaInstitucion, { foreignKey: "codigoPropuesta"});
  PropuestaLineaTematica.belongsTo(Propuesta, { foreignKey: "codigoPropuesta"});
  Propuesta.hasMany(PropuestaLineaTematica, { foreignKey: "codigoPropuesta"});
  PropuestaPalabraClave.belongsTo(Propuesta, { foreignKey: "codigoPropuesta"});
  Propuesta.hasMany(PropuestaPalabraClave, { foreignKey: "codigoPropuesta"});
  PropuestaPrevia.belongsTo(Propuesta, { foreignKey: "codigoPropuesta"});
  Propuesta.hasMany(PropuestaPrevia, { foreignKey: "codigoPropuesta"});
  PropuestaPrevia.belongsTo(Propuesta, { foreignKey: "codigoPropuestaPrevia"});
  Propuesta.hasMany(PropuestaPrevia, { foreignKey: "codigoPropuestaPrevia"});
  PropuestaProgramaExtension.belongsTo(Propuesta, { foreignKey: "codigoPropuesta"});
  Propuesta.hasMany(PropuestaProgramaExtension, { foreignKey: "codigoPropuesta"});
  PropuestaRelacionada.belongsTo(Propuesta, { foreignKey: "codigoPropuesta"});
  Propuesta.hasMany(PropuestaRelacionada, { foreignKey: "codigoPropuesta"});
  PropuestaRelacionada.belongsTo(Propuesta, { foreignKey: "codigoPropuestaRelacionada"});
  Propuesta.hasMany(PropuestaRelacionada, { foreignKey: "codigoPropuestaRelacionada"});
  UbicacionProblematica.belongsTo(Propuesta, { foreignKey: "codigoPropuesta"});
  Propuesta.hasMany(UbicacionProblematica, { foreignKey: "codigoPropuesta"});
  Carrera.belongsTo(Relacion, { foreignKey: "idUnidadAcademica"});
  Relacion.hasMany(Carrera, { foreignKey: "idUnidadAcademica"});
  Integrante.belongsTo(Relacion, { foreignKey: "idAreaUnl"});
  Relacion.hasMany(Integrante, { foreignKey: "idAreaUnl"});
  RelacionActividad.belongsTo(Relacion, { foreignKey: "idRelacion"});
  Relacion.hasMany(RelacionActividad, { foreignKey: "idRelacion"});
  RolIntegrante.belongsTo(Rol, { foreignKey: "idRolIntegrante"});
  Rol.hasMany(RolIntegrante, { foreignKey: "idRolIntegrante"});
  Evaluacion.belongsTo(TipoEvaluacion, { foreignKey: "idTipoEvaluacion"});
  TipoEvaluacion.hasMany(Evaluacion, { foreignKey: "idTipoEvaluacion"});
  Objetivo.belongsTo(TipoObjetivo, { foreignKey: "tipoObjId"});
  TipoObjetivo.hasMany(Objetivo, { foreignKey: "tipoObjId"});
  Relacion.belongsTo(TipoRelacion, { foreignKey: "idTipoRelacion"});
  TipoRelacion.hasMany(Relacion, { foreignKey: "idTipoRelacion"});
  UbicacionActividad.belongsTo(Ubicacion, { foreignKey: "idUbicacion"});
  Ubicacion.hasMany(UbicacionActividad, { foreignKey: "idUbicacion"});
  UbicacionProblematica.belongsTo(Ubicacion, { foreignKey: "idUbicacion"});
  Ubicacion.hasOne(UbicacionProblematica, { foreignKey: "idUbicacion"});
  Actividad.belongsTo(Usuario, { foreignKey: "idUsuario"});
  Usuario.hasMany(Actividad, { foreignKey: "idUsuario"});
  EvaluacionItem.belongsTo(Usuario, { foreignKey: "idUsuario"});
  Usuario.hasMany(EvaluacionItem, { foreignKey: "idUsuario"});
  Propuesta.belongsTo(Usuario, { foreignKey: "idUsuario"});
  Usuario.hasMany(Propuesta, { foreignKey: "idUsuario"});
  UsuarioCategoria.belongsTo(Usuario, { foreignKey: "idUsuario"});
  Usuario.hasMany(UsuarioCategoria, { foreignKey: "idUsuario"});
  Meta.belongsTo(Valoracion, { foreignKey: "idValoracion"});
  Valoracion.hasMany(Meta, { foreignKey: "idValoracion"});

  return {
    Actividad: Actividad,
    ActividadObjetivoEspecifico: ActividadObjetivoEspecifico,
    ActividadParticipanteSocial: ActividadParticipanteSocial,
    Area: Area,
    Capacitacion: Capacitacion,
    Carrera: Carrera,
    Categoria: Categoria,
    CronogramaActividad: CronogramaActividad,
    Enlace: Enlace,
    Evaluacion: Evaluacion,
    EvaluacionItem: EvaluacionItem,
    FechaPuntual: FechaPuntual,
    FechaPuntualActividad: FechaPuntualActividad,
    Institucion: Institucion,
    InstitucionActividad: InstitucionActividad,
    Integrante: Integrante,
    LineaTematica: LineaTematica,
    Meta: Meta,
    Objetivo: Objetivo,
    ObjetivoActividad: ObjetivoActividad,
    ObjetivoEspecifico: ObjetivoEspecifico,
    PalabraClave: PalabraClave,
    ParticipanteSocial: ParticipanteSocial,
    Permiso: Permiso,
    PermisoCategoria: PermisoCategoria,
    Persona: Persona,
    Programa: Programa,
    ProgramaSippe: ProgramaSippe,
    ProgramaSippeActividad: ProgramaSippeActividad,
    Propuesta: Propuesta,
    PropuestaCapacitacion: PropuestaCapacitacion,
    PropuestaInstitucion: PropuestaInstitucion,
    PropuestaLineaTematica: PropuestaLineaTematica,
    PropuestaPalabraClave: PropuestaPalabraClave,
    PropuestaPrevia: PropuestaPrevia,
    PropuestaProgramaExtension: PropuestaProgramaExtension,
    PropuestaRelacionada: PropuestaRelacionada,
    Relacion: Relacion,
    RelacionActividad: RelacionActividad,
    Responsable: Responsable,
    Rol: Rol,
    RolIntegrante: RolIntegrante,
    TipoEvaluacion: TipoEvaluacion,
    TipoObjetivo: TipoObjetivo,
    TipoRelacion: TipoRelacion,
    Ubicacion: Ubicacion,
    UbicacionActividad: UbicacionActividad,
    UbicacionProblematica: UbicacionProblematica,
    Usuario: Usuario,
    UsuarioCategoria: UsuarioCategoria,
    Valoracion: Valoracion,
  };
}
