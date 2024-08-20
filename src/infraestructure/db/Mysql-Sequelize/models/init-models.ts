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
import { Valoracion as _Valoracion } from "./Valoracion";
import type { ValoracionAttributes, ValoracionCreationAttributes } from "./Valoracion";
import { Instancia as _Instancia } from "./Instancia";
import type { InstanciaAttributes, InstanciaCreationAttributes } from "./Instancia";
import { RegistroPropuestaInstancia as _RegistroPropuestaInstancia } from "./RegistroPropuestaInstancia";
import type { RegistroPropuestaInstanciaAttributes, RegistroPropuestaInstanciaCreationAttributes } from "./RegistroPropuestaInstancia";
import { AreaPrograma as _AreaPrograma } from "./AreaPrograma";
import type { AreaProgramaAttributes, AreaProgramaCreationAttributes } from "./AreaPrograma";
import { CategoriaUsuario as _CategoriaUsuario } from "./CategoriaUsuario";
import type { CategoriaUsuarioAttributes, CategoriaUsuarioCreationAttributes } from "./CategoriaUsuario";
import {PermisoUsuario as _PermisoUsuario } from "./PermisoUsuario";
import type { PermisoUsuarioAttributes,PermisoUsuarioCreationAttributes } from "./PermisoUsuario";
import { AreaProgramaUsuario as _AreaProgramaUsuario } from "./AreaProgramaUsuario";
import type { AreaProgramaUsuarioAttributes, AreaProgramaUsuarioCreationAttributes } from './AreaProgramaUsuario';

export {
  _Actividad as Actividad,
  _ActividadObjetivoEspecifico as ActividadObjetivoEspecifico,
  _ActividadParticipanteSocial as ActividadParticipanteSocial,
  _Area as Area,
  _AreaPrograma as AreaPrograma,
  _AreaProgramaUsuario as AreaProgramaUsuario,
  _Capacitacion as Capacitacion,
  _Carrera as Carrera,
  _Categoria as Categoria,
  _CategoriaUsuario as CategoriaUsuario,
  _CronogramaActividad as CronogramaActividad,
  _Enlace as Enlace,
  _Evaluacion as Evaluacion,
  _EvaluacionItem as EvaluacionItem,
  _FechaPuntual as FechaPuntual,
  _FechaPuntualActividad as FechaPuntualActividad,
  _Institucion as Institucion,
  _InstitucionActividad as InstitucionActividad,
  _Integrante as Integrante,
  _Instancia as Instancia,
  _LineaTematica as LineaTematica,
  _Meta as Meta,
  _Objetivo as Objetivo,
  _ObjetivoActividad as ObjetivoActividad,
  _ObjetivoEspecifico as ObjetivoEspecifico,
  _PalabraClave as PalabraClave,
  _ParticipanteSocial as ParticipanteSocial,
  _Permiso as Permiso,
  _PermisoUsuario as PermisoUsuario,
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
  _RegistroPropuestaInstancia as RegistroPropuestaInstancia,
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
  _Valoracion as Valoracion
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
  AreaProgramaAttributes,
  AreaProgramaCreationAttributes,
  AreaProgramaUsuarioAttributes,
  AreaProgramaUsuarioCreationAttributes,
  CapacitacionAttributes,
  CapacitacionCreationAttributes,
  CarreraAttributes,
  CarreraCreationAttributes,
  CategoriaAttributes,
  CategoriaCreationAttributes,
  CategoriaUsuarioAttributes,
  CategoriaUsuarioCreationAttributes,
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
  InstanciaAttributes,
  InstanciaCreationAttributes,
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
  PermisoUsuarioAttributes,
  PermisoUsuarioCreationAttributes,
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
  RegistroPropuestaInstanciaAttributes,
  RegistroPropuestaInstanciaCreationAttributes,
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
  ValoracionAttributes,
  ValoracionCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const Actividad = _Actividad.initModel(sequelize);
  const ActividadObjetivoEspecifico = _ActividadObjetivoEspecifico.initModel(sequelize);
  const ActividadParticipanteSocial = _ActividadParticipanteSocial.initModel(sequelize);
  const Area = _Area.initModel(sequelize);
  const AreaPrograma = _AreaPrograma.initModel(sequelize);
  const AreaProgramaUsuario = _AreaProgramaUsuario.initModel(sequelize);
  const Capacitacion = _Capacitacion.initModel(sequelize);
  const Carrera = _Carrera.initModel(sequelize);
  const Categoria = _Categoria.initModel(sequelize);
  const CategoriaUsuario = _CategoriaUsuario.initModel(sequelize);
  const CronogramaActividad = _CronogramaActividad.initModel(sequelize);
  const Enlace = _Enlace.initModel(sequelize);
  const Evaluacion = _Evaluacion.initModel(sequelize);
  const EvaluacionItem = _EvaluacionItem.initModel(sequelize);
  const FechaPuntual = _FechaPuntual.initModel(sequelize);
  const FechaPuntualActividad = _FechaPuntualActividad.initModel(sequelize);
  const Institucion = _Institucion.initModel(sequelize);
  const InstitucionActividad = _InstitucionActividad.initModel(sequelize);
  const Integrante = _Integrante.initModel(sequelize);
  const Instancia = _Instancia.initModel(sequelize);
  const LineaTematica = _LineaTematica.initModel(sequelize);
  const Meta = _Meta.initModel(sequelize);
  const Objetivo = _Objetivo.initModel(sequelize);
  const ObjetivoActividad = _ObjetivoActividad.initModel(sequelize);
  const ObjetivoEspecifico = _ObjetivoEspecifico.initModel(sequelize);
  const PalabraClave = _PalabraClave.initModel(sequelize);
  const ParticipanteSocial = _ParticipanteSocial.initModel(sequelize);
  const Permiso = _Permiso.initModel(sequelize);
  const PermisoUsuario = _PermisoUsuario.initModel(sequelize);
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
  const RegistroPropuestaInstancia = _RegistroPropuestaInstancia.initModel(sequelize);
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
  const Valoracion = _Valoracion.initModel(sequelize);
  
  Actividad.belongsTo(Area, { foreignKey: "idArea"});
  Actividad.belongsToMany(FechaPuntual, { as: 'idFechaFechaPuntuals', through: FechaPuntualActividad, foreignKey: "idActividad", otherKey: "idFecha" });
  Actividad.belongsToMany(Institucion, { as: 'idInstitucionInstitucions', through: InstitucionActividad, foreignKey: "idActividad", otherKey: "idInstitucion" });
  Actividad.belongsToMany(Objetivo, { as: 'idObjetivoObjetivos', through: ObjetivoActividad, foreignKey: "idActividad", otherKey: "idObjetivo" });
  Actividad.belongsToMany(ProgramaSippe, { as: 'idProgramaSippeProgramaSippes', through: ProgramaSippeActividad, foreignKey: "idActividad", otherKey: "idProgramaSippe" });
  Actividad.belongsToMany(Relacion, { as: 'idRelacionRelacions', through: RelacionActividad, foreignKey: "idActividad", otherKey: "idRelacion" });
  Actividad.belongsToMany(Ubicacion, { as: 'idUbicacionUbicacions', through: UbicacionActividad, foreignKey: "idActividad", otherKey: "idUbicacion" });
  Actividad.hasMany(Enlace, { foreignKey: "idActividad"});
  Actividad.hasMany(FechaPuntualActividad, { foreignKey: "idActividad"});
  Actividad.hasMany(InstitucionActividad, { foreignKey: "idActividad"});
  Actividad.hasMany(Meta, { foreignKey: "idActividad"});
  Actividad.hasMany(ObjetivoActividad, { foreignKey: "idActividad"});
  Actividad.hasMany(ProgramaSippeActividad, { foreignKey: "idActividad"});
  Actividad.hasMany(RelacionActividad, { foreignKey: "idActividad"});
  Actividad.hasMany(UbicacionActividad, { foreignKey: "idActividad"});
  Actividad.belongsTo(Usuario, { foreignKey: "idUsuario"});
  ActividadObjetivoEspecifico.hasMany(CronogramaActividad, { foreignKey: "idActividadObjetivoEspecifico"});
  ActividadObjetivoEspecifico.belongsTo(ObjetivoEspecifico, { foreignKey: "idObjetivoEspecifico"});
  
  ActividadParticipanteSocial.belongsTo(ParticipanteSocial, { foreignKey: "idParticipanteSocial"});

  Area.hasMany(Actividad, { foreignKey: "idArea"});
  AreaPrograma.belongsTo(Area,{ as :'area', foreignKey:'idArea' });
  AreaPrograma.belongsTo(Programa,{ as :'programa', foreignKey:'idPrograma' });
  Capacitacion.belongsToMany(Propuesta, { as: 'codigoPropuestaPropuestaPropuestaCapacitacions', through: PropuestaCapacitacion, foreignKey: "idCapacitacion", otherKey: "codigoPropuesta" });
  Capacitacion.hasMany(PropuestaCapacitacion, { foreignKey: "idCapacitacion"});
  Carrera.belongsTo(Relacion, { foreignKey: "idUnidadAcademica"});
  Carrera.hasMany(Integrante, { foreignKey: "idCarrera"});

  CronogramaActividad.belongsTo(ActividadObjetivoEspecifico, { foreignKey: "idActividadObjetivoEspecifico"});
  Enlace.belongsTo(Actividad, { foreignKey: "idActividad"});
  Evaluacion.hasMany(EvaluacionItem, { foreignKey: "idEvaluacion"});
  Evaluacion.belongsTo(Propuesta, { foreignKey: "codigoPropuesta"});
  Evaluacion.belongsToMany(Usuario, { as: 'idUsuarioUsuarios', through: EvaluacionItem, foreignKey: "idEvaluacion", otherKey: "idUsuario" });
  Evaluacion.belongsTo(TipoEvaluacion, { foreignKey: "idTipoEvaluacion"});
  EvaluacionItem.belongsTo(Usuario, { foreignKey: "idUsuario"});
  EvaluacionItem.belongsTo(Evaluacion, { foreignKey: "idEvaluacion"});
  FechaPuntual.belongsToMany(Actividad, { as: 'idActividadActividads', through: FechaPuntualActividad, foreignKey: "idFecha", otherKey: "idActividad" });
  FechaPuntual.hasMany(FechaPuntualActividad, { foreignKey: "idFecha"});
  FechaPuntualActividad.belongsTo(Actividad, { foreignKey: "idActividad"});
  FechaPuntualActividad.belongsTo(FechaPuntual, { foreignKey: "idFecha"});
  Institucion.belongsToMany(Actividad, { as: 'idActividadActividadInstitucionActividads', through: InstitucionActividad, foreignKey: "idInstitucion", otherKey: "idActividad" });
  Institucion.belongsToMany(Persona, { as: 'nroDocPersonaResponsables', through: Responsable, foreignKey: "idInstitucion", otherKey: "nroDoc" });
  Institucion.belongsToMany(Propuesta, { as: 'codigoPropuestaPropuestaPropuestaInstitucions', through: PropuestaInstitucion, foreignKey: "idInstitucion", otherKey: "codigoPropuesta" });
  Institucion.hasMany(InstitucionActividad, { foreignKey: "idInstitucion"});
  Institucion.hasMany(PropuestaInstitucion, { foreignKey: "idInstitucion"});
  Institucion.hasMany(Responsable, { as : 'responsables', foreignKey: "idInstitucion"});
  InstitucionActividad.belongsTo(Actividad, { foreignKey: "idActividad"});
  InstitucionActividad.belongsTo(Institucion, { foreignKey: "idInstitucion"});
  Instancia.hasMany( RegistroPropuestaInstancia, {foreignKey : 'idInstancia'});
  Integrante.belongsTo(Carrera, { foreignKey: "idCarrera"});
  Integrante.hasMany(RolIntegrante, {as :'roles' ,foreignKey: "nroDoc"});
  Integrante.belongsTo(Persona, { as : 'persona', foreignKey: "nroDoc"});
  Integrante.belongsTo(Propuesta, { foreignKey: "codigoPropuesta"});
  Integrante.belongsTo(Relacion, { foreignKey: "idAreaUnl"});
  LineaTematica.belongsToMany(Propuesta, { as: 'codigoPropuestaPropuestaPropuestaLineaTematicas', through: PropuestaLineaTematica, foreignKey: "idLineaTematica", otherKey: "codigoPropuesta" });
  LineaTematica.hasMany(PropuestaLineaTematica, { foreignKey: "idLineaTematica"});
  Meta.belongsTo(Actividad, { foreignKey: "idActividad"});
  Meta.belongsTo(Valoracion, { foreignKey: "idValoracion"});
  Objetivo.belongsToMany(Actividad, { as: 'idActividadActividadObjetivoActividads', through: ObjetivoActividad, foreignKey: "idObjetivo", otherKey: "idActividad" });
  Objetivo.belongsTo(TipoObjetivo, { foreignKey: "tipoObjId"});
  ObjetivoActividad.belongsTo(Actividad, { foreignKey: "idActividad"});
  ObjetivoActividad.belongsTo(Objetivo, { foreignKey: "idObjetivo"});
  ObjetivoEspecifico.hasMany(ActividadObjetivoEspecifico, { foreignKey: "idObjetivoEspecifico"});
  ObjetivoEspecifico.belongsTo(Propuesta, { foreignKey: "codigoPropuesta"});
  Objetivo.hasMany(ObjetivoActividad, { foreignKey: "idObjetivo"});
  PalabraClave.belongsToMany(Propuesta, { as: 'codigoPropuestaPropuestaPropuestaPalabraClaves', through: PropuestaPalabraClave, foreignKey: "idPalabraClave", otherKey: "codigoPropuesta" });

  Persona.belongsToMany(Institucion, { as: 'idInstitucionInstitucionResponsables', through: Responsable, foreignKey: "nroDoc", otherKey: "idInstitucion" });
  Persona.belongsToMany(Propuesta, { as: 'codigoPropuestaPropuesta', through: Integrante, foreignKey: "nroDoc", otherKey: "codigoPropuesta" });
  ProgramaSippe.belongsToMany(Actividad, { as: 'idActividadActividadProgramaSippeActividads', through: ProgramaSippeActividad, foreignKey: "idProgramaSippe", otherKey: "idActividad" });
  ProgramaSippe.belongsToMany(Propuesta, { as: 'codigoPropuestaPropuestaPropuestaProgramaExtensions', through: PropuestaProgramaExtension, foreignKey: "idProgramaExtension", otherKey: "codigoPropuesta" });
  ProgramaSippeActividad.belongsTo(Actividad, { foreignKey: "idActividad"});
  Propuesta.belongsToMany(Capacitacion, { as: 'idCapacitacionCapacitacions', through: PropuestaCapacitacion, foreignKey: "codigoPropuesta", otherKey: "idCapacitacion" });
  Propuesta.belongsToMany(Institucion, { as: 'idInstitucionInstitucionPropuestaInstitucions', through: PropuestaInstitucion, foreignKey: "codigoPropuesta", otherKey: "idInstitucion" });
  Propuesta.belongsToMany(LineaTematica, { as: 'idLineaTematicaLineaTematicas', through: PropuestaLineaTematica, foreignKey: "codigoPropuesta", otherKey: "idLineaTematica" });
  Propuesta.belongsToMany(PalabraClave, { as: 'idPalabraClavePalabraClaves', through: PropuestaPalabraClave, foreignKey: "codigoPropuesta", otherKey: "idPalabraClave" });
  Propuesta.belongsToMany(Persona, { as: 'nroDocPersonas', through: Integrante, foreignKey: "codigoPropuesta", otherKey: "nroDoc" });
  Propuesta.belongsToMany(ProgramaSippe, { as: 'idProgramaExtensionProgramaSippes', through: PropuestaProgramaExtension, foreignKey: "codigoPropuesta", otherKey: "idProgramaExtension" });
  Propuesta.belongsToMany(Propuesta, { as: 'codigoPropuestaRelacionadaPropuesta', through: PropuestaRelacionada, foreignKey: "codigoPropuesta", otherKey: "codigoPropuestaRelacionada" });
  Propuesta.belongsToMany(Propuesta, { as: 'codigoPropuestaPropuestaPropuestaRelacionadas', through: PropuestaRelacionada, foreignKey: "codigoPropuestaRelacionada", otherKey: "codigoPropuesta" });
  Propuesta.hasMany(RegistroPropuestaInstancia, {as : 'propuestaInstancias', foreignKey : 'codigoPropuesta'});
  Propuesta.hasMany(Evaluacion, { foreignKey: "codigoPropuesta"});
  Propuesta.hasMany(Integrante, { as : 'integrantes', foreignKey: "codigoPropuesta"});
  Propuesta.hasMany(ObjetivoEspecifico, {as : 'objetivoEspecificos', foreignKey: "codigoPropuesta"});
  Propuesta.hasMany(ParticipanteSocial, { as : 'participanteSociales', foreignKey: "codigoPropuesta"});
  Propuesta.hasMany(PropuestaCapacitacion, { as : 'propuestaCapacitaciones', foreignKey: "codigoPropuesta"});
  Propuesta.hasMany(PropuestaInstitucion, { as : 'propuestaInstituciones', foreignKey: "codigoPropuesta"});
  Propuesta.hasMany(PropuestaLineaTematica, { as : 'propuestaLineaTematicas', foreignKey: "codigoPropuesta"});
  Propuesta.hasMany(PropuestaPalabraClave, { as : 'propuestaPalabraClaves', foreignKey: "codigoPropuesta"});
  Propuesta.hasMany(PropuestaPrevia, {as : 'propuestasPrevias', foreignKey: "codigoPropuesta"});
  Propuesta.hasMany(PropuestaProgramaExtension, {as : 'propuestaProgramaExtensions', foreignKey: "codigoPropuesta"});
  Propuesta.hasMany(PropuestaRelacionada, {as : 'propuestaRelacionadas', foreignKey: "codigoPropuesta"});
  Propuesta.hasMany(UbicacionProblematica, {as : 'ubicacionProblematicas', foreignKey: "codigoPropuesta"});
  PropuestaLineaTematica.belongsTo(LineaTematica, { foreignKey: "idLineaTematica"});
  PropuestaCapacitacion.belongsTo(Propuesta, { foreignKey: "codigoPropuesta"});
  PropuestaInstitucion.belongsTo(Propuesta, { as : 'propuesta', foreignKey: "codigoPropuesta"});
  PropuestaInstitucion.belongsTo(Institucion, { as : 'institucion', foreignKey: "idInstitucion", targetKey : 'idInstitucion'});
  PropuestaLineaTematica.belongsTo(Propuesta, { foreignKey: "codigoPropuesta"});
  PropuestaPalabraClave.belongsTo(Propuesta, {  foreignKey: "codigoPropuesta"});
  PropuestaPrevia.belongsTo(Propuesta, { foreignKey: "codigoPropuestaPrevia"});
  PropuestaProgramaExtension.belongsTo(Propuesta, { foreignKey: "codigoPropuesta"});
  PropuestaRelacionada.belongsTo(Propuesta, { foreignKey: "codigoPropuesta"});
  PropuestaRelacionada.belongsTo(Propuesta, { foreignKey: "codigoPropuestaRelacionada"});
  PropuestaPalabraClave.belongsTo(PalabraClave, { as : 'palabraClave', foreignKey: "idPalabraClave"});
  
  PropuestaCapacitacion.belongsTo(Capacitacion, { foreignKey: "idCapacitacion"});

  PalabraClave.hasMany(PropuestaPalabraClave, { foreignKey: "idPalabraClave"});
  ParticipanteSocial.hasMany(ActividadParticipanteSocial, { foreignKey: "idParticipanteSocial"});
  ParticipanteSocial.belongsTo(Propuesta, { foreignKey: "codigoPropuesta"});
  Persona.hasMany(Integrante, { foreignKey: "nroDoc"});
  Persona.hasMany(Responsable, { foreignKey: "nroDoc"});


  Persona.hasMany(Usuario, { foreignKey: "nroDoc"});
  ProgramaSippeActividad.belongsTo(ProgramaSippe, { foreignKey: "idProgramaSippe"});
  ProgramaSippe.hasMany(ProgramaSippeActividad, { foreignKey: "idProgramaSippe"});
  PropuestaProgramaExtension.belongsTo(ProgramaSippe, { foreignKey: "idProgramaExtension"});
  Propuesta.belongsTo(Usuario, { foreignKey: "idUsuario"});
  ProgramaSippe.hasMany(PropuestaProgramaExtension, { foreignKey: "idProgramaExtension"});
  RegistroPropuestaInstancia.belongsTo( Instancia , { as : 'instancia', foreignKey : 'idInstancia' });
  RegistroPropuestaInstancia.belongsTo( Propuesta , { as : 'propuesta', foreignKey : 'codigoPropuesta' });
  Relacion.belongsToMany(Actividad, { as: 'idActividadActividadRelacionActividads', through: RelacionActividad, foreignKey: "idRelacion", otherKey: "idActividad" });
  RelacionActividad.belongsTo(Actividad, { foreignKey: "idActividad"});
  
  Responsable.belongsTo(Institucion, { foreignKey: "idInstitucion"});
  RolIntegrante.belongsTo(Integrante, { foreignKey: "nroDoc"});
  RolIntegrante.belongsTo(Integrante, { foreignKey: "codigoPropuesta"});
 


  Relacion.hasMany(Carrera, { foreignKey: "idUnidadAcademica"});

  Relacion.hasMany(Integrante, { foreignKey: "idAreaUnl"});
  Relacion.hasMany(RelacionActividad, { foreignKey: "idRelacion"});
  Relacion.belongsTo(TipoRelacion, { foreignKey: "idTipoRelacion"});
  RelacionActividad.belongsTo(Relacion, { foreignKey: "idRelacion"});
  RolIntegrante.belongsTo(Rol, { foreignKey: "idRolIntegrante"});
  Responsable.belongsTo(Persona, { foreignKey: "nroDoc"});
  Rol.hasMany(RolIntegrante, { foreignKey: "idRolIntegrante"});
  TipoEvaluacion.hasMany(Evaluacion, { foreignKey: "idTipoEvaluacion"});
  TipoObjetivo.hasMany(Objetivo, { foreignKey: "tipoObjId"});
  TipoRelacion.hasMany(Relacion, { foreignKey: "idTipoRelacion"});
  
  UbicacionActividad.belongsTo(Ubicacion, { foreignKey: "idUbicacion"});
  Ubicacion.hasMany(UbicacionActividad, { foreignKey: "idUbicacion"});
  UbicacionProblematica.belongsTo(Ubicacion, { foreignKey: "idUbicacion"});
  Ubicacion.hasOne(UbicacionProblematica, { foreignKey: "idUbicacion"});
  Ubicacion.belongsToMany(Actividad, { as: 'idActividadActividadUbicacionActividads', through: UbicacionActividad, foreignKey: "idUbicacion", otherKey: "idActividad" });
  UbicacionActividad.belongsTo(Actividad, { foreignKey: "idActividad"});
  UbicacionProblematica.belongsTo(Propuesta, { foreignKey: "codigoPropuesta"});
  Usuario.belongsTo(Persona, { as : 'persona', foreignKey: "nroDoc"});
  Usuario.belongsToMany(Evaluacion, { as: 'idEvaluacionEvaluacions', through: EvaluacionItem, foreignKey: "idUsuario", otherKey: "idEvaluacion" });
  Usuario.hasMany(Actividad, { foreignKey: "idUsuario"});
  Usuario.hasMany(EvaluacionItem, { foreignKey: "idUsuario"});
  Usuario.hasMany(Propuesta, { as : 'propuestas', foreignKey: "idUsuario"});
  Valoracion.hasMany(Meta, { foreignKey: "idValoracion"});
  return {
    Actividad: Actividad,
    ActividadObjetivoEspecifico: ActividadObjetivoEspecifico,
    ActividadParticipanteSocial: ActividadParticipanteSocial,
    Area: Area,
    AreaPrograma : AreaPrograma,
    AreaProgramaUsuario : AreaProgramaUsuario,
    Capacitacion: Capacitacion,
    Carrera: Carrera,
    Categoria: Categoria,
    CategoriaUsuario : CategoriaUsuario,
    CronogramaActividad: CronogramaActividad,
    Enlace: Enlace,
    Evaluacion: Evaluacion,
    EvaluacionItem: EvaluacionItem,
    FechaPuntual: FechaPuntual,
    FechaPuntualActividad: FechaPuntualActividad,
    Institucion: Institucion,
    InstitucionActividad: InstitucionActividad,
    Integrante: Integrante,
    Instancia : Instancia,
    LineaTematica: LineaTematica,
    Meta: Meta,
    Objetivo: Objetivo,
    ObjetivoActividad: ObjetivoActividad,
    ObjetivoEspecifico: ObjetivoEspecifico,
    PalabraClave: PalabraClave,
    ParticipanteSocial: ParticipanteSocial,
    Permiso: Permiso,
    PermisoUsuario : PermisoUsuario,
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
    RegistroPropuestaInstancia : RegistroPropuestaInstancia,
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
    Valoracion: Valoracion,
  };
}
