import type { Sequelize } from "sequelize";
import { Actividad as _Actividad } from "./Actividad";
import type { ActividadAttributes, ActividadCreationAttributes } from "./Actividad";
import { Area as _Area } from "./Area";
import type { AreaAttributes, AreaCreationAttributes } from "./Area";
import { Categoria as _Categoria } from "./Categoria";
import type { CategoriaAttributes, CategoriaCreationAttributes } from "./Categoria";
import { Enlace as _Enlace } from "./Enlace";
import type { EnlaceAttributes, EnlaceCreationAttributes } from "./Enlace";
import { FechaPuntual as _FechaPuntual } from "./FechaPuntual";
import type { FechaPuntualAttributes, FechaPuntualCreationAttributes } from "./FechaPuntual";
import { FechaPuntualActividad as _FechaPuntualActividad } from "./FechaPuntualActividad";
import type { FechaPuntualActividadAttributes, FechaPuntualActividadCreationAttributes } from "./FechaPuntualActividad";
import { Institucion as _Institucion } from "./Institucion";
import type { InstitucionAttributes, InstitucionCreationAttributes } from "./Institucion";
import { InstitucionActividad as _InstitucionActividad } from "./InstitucionActividad";
import type { InstitucionActividadAttributes, InstitucionActividadCreationAttributes } from "./InstitucionActividad";
import { Meta as _Meta } from "./Meta";
import type { MetaAttributes, MetaCreationAttributes } from "./Meta";
import { Objetivo as _Objetivo } from "./Objetivo";
import type { ObjetivoAttributes, ObjetivoCreationAttributes } from "./Objetivo";
import { ObjetivoActividad as _ObjetivoActividad } from "./ObjetivoActividad";
import type { ObjetivoActividadAttributes, ObjetivoActividadCreationAttributes } from "./ObjetivoActividad";
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
import { Relacion as _Relacion } from "./Relacion";
import type { RelacionAttributes, RelacionCreationAttributes } from "./Relacion";
import { RelacionActividad as _RelacionActividad } from "./RelacionActividad";
import type { RelacionActividadAttributes, RelacionActividadCreationAttributes } from "./RelacionActividad";
import { TipoObjetivo as _TipoObjetivo } from "./TipoObjetivo";
import type { TipoObjetivoAttributes, TipoObjetivoCreationAttributes } from "./TipoObjetivo";
import { TipoRelacion as _TipoRelacion } from "./TipoRelacion";
import type { TipoRelacionAttributes, TipoRelacionCreationAttributes } from "./TipoRelacion";
import { Ubicacion as _Ubicacion } from "./Ubicacion";
import type { UbicacionAttributes, UbicacionCreationAttributes } from "./Ubicacion";
import { UbicacionActividad as _UbicacionActividad } from "./UbicacionActividad";
import type { UbicacionActividadAttributes, UbicacionActividadCreationAttributes } from "./UbicacionActividad";
import { Usuario as _Usuario } from "./Usuario";
import type { UsuarioAttributes, UsuarioCreationAttributes } from "./Usuario";
import { Valoracion as _Valoracion } from "./Valoracion";
import type { ValoracionAttributes, ValoracionCreationAttributes } from "./Valoracion";
import { Instancia as _Instancia } from "./Instancia";
import type { InstanciaAttributes, InstanciaCreationAttributes } from "./Instancia";
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
  _Area as Area,
  _AreaPrograma as AreaPrograma,
  _AreaProgramaUsuario as AreaProgramaUsuario,
  _Categoria as Categoria,
  _CategoriaUsuario as CategoriaUsuario,
  _Enlace as Enlace,
  _FechaPuntual as FechaPuntual,
  _FechaPuntualActividad as FechaPuntualActividad,
  _Institucion as Institucion,
  _InstitucionActividad as InstitucionActividad,
  _Instancia as Instancia,
  _Meta as Meta,
  _Objetivo as Objetivo,
  _ObjetivoActividad as ObjetivoActividad,
  _Permiso as Permiso,
  _PermisoUsuario as PermisoUsuario,
  _Persona as Persona,
  _Programa as Programa,
  _ProgramaSippe as ProgramaSippe,
  _ProgramaSippeActividad as ProgramaSippeActividad,
  _Relacion as Relacion,
  _RelacionActividad as RelacionActividad,
  _TipoObjetivo as TipoObjetivo,
  _TipoRelacion as TipoRelacion,
  _Ubicacion as Ubicacion,
  _UbicacionActividad as UbicacionActividad,
  _Usuario as Usuario,
  _Valoracion as Valoracion
};

export type {
  ActividadAttributes,
  ActividadCreationAttributes,
  AreaAttributes,
  AreaCreationAttributes,
  AreaProgramaAttributes,
  AreaProgramaCreationAttributes,
  AreaProgramaUsuarioAttributes,
  AreaProgramaUsuarioCreationAttributes,
  CategoriaAttributes,
  CategoriaCreationAttributes,
  CategoriaUsuarioAttributes,
  CategoriaUsuarioCreationAttributes,
  EnlaceAttributes,
  EnlaceCreationAttributes,
  FechaPuntualAttributes,
  FechaPuntualCreationAttributes,
  FechaPuntualActividadAttributes,
  FechaPuntualActividadCreationAttributes,
  InstitucionAttributes,
  InstitucionCreationAttributes,
  InstitucionActividadAttributes,
  InstitucionActividadCreationAttributes,
  InstanciaAttributes,
  InstanciaCreationAttributes,
  MetaAttributes,
  MetaCreationAttributes,
  ObjetivoAttributes,
  ObjetivoCreationAttributes,
  ObjetivoActividadAttributes,
  ObjetivoActividadCreationAttributes,
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
  RelacionAttributes,
  RelacionCreationAttributes,
  RelacionActividadAttributes,
  RelacionActividadCreationAttributes,
  TipoObjetivoAttributes,
  TipoObjetivoCreationAttributes,
  TipoRelacionAttributes,
  TipoRelacionCreationAttributes,
  UbicacionAttributes,
  UbicacionCreationAttributes,
  UbicacionActividadAttributes,
  UbicacionActividadCreationAttributes,
  UsuarioAttributes,
  UsuarioCreationAttributes,
  ValoracionAttributes,
  ValoracionCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const Actividad = _Actividad.initModel(sequelize);
  const Area = _Area.initModel(sequelize);
  const AreaPrograma = _AreaPrograma.initModel(sequelize);
  const AreaProgramaUsuario = _AreaProgramaUsuario.initModel(sequelize);
  const Categoria = _Categoria.initModel(sequelize);
  const CategoriaUsuario = _CategoriaUsuario.initModel(sequelize);
  const Enlace = _Enlace.initModel(sequelize);
  const FechaPuntual = _FechaPuntual.initModel(sequelize);
  const FechaPuntualActividad = _FechaPuntualActividad.initModel(sequelize);
  const Institucion = _Institucion.initModel(sequelize);
  const InstitucionActividad = _InstitucionActividad.initModel(sequelize);
  const Instancia = _Instancia.initModel(sequelize);
  const Meta = _Meta.initModel(sequelize);
  const Objetivo = _Objetivo.initModel(sequelize);
  const ObjetivoActividad = _ObjetivoActividad.initModel(sequelize);
  const Permiso = _Permiso.initModel(sequelize);
  const PermisoUsuario = _PermisoUsuario.initModel(sequelize);
  const Persona = _Persona.initModel(sequelize);
  const Programa = _Programa.initModel(sequelize);
  const ProgramaSippe = _ProgramaSippe.initModel(sequelize);
  const ProgramaSippeActividad = _ProgramaSippeActividad.initModel(sequelize);
  const Relacion = _Relacion.initModel(sequelize);
  const RelacionActividad = _RelacionActividad.initModel(sequelize);
  const TipoObjetivo = _TipoObjetivo.initModel(sequelize);
  const TipoRelacion = _TipoRelacion.initModel(sequelize);
  const Ubicacion = _Ubicacion.initModel(sequelize);
  const UbicacionActividad = _UbicacionActividad.initModel(sequelize);
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
  Area.hasMany(Actividad, { foreignKey: "idArea"});
  AreaPrograma.belongsTo(Area,{ as :'area', foreignKey:'idArea' });
  AreaPrograma.belongsTo(Programa,{ as :'programa', foreignKey:'idPrograma' });
  Enlace.belongsTo(Actividad, { foreignKey: "idActividad"});
  FechaPuntual.belongsToMany(Actividad, { as: 'idActividadActividads', through: FechaPuntualActividad, foreignKey: "idFecha", otherKey: "idActividad" });
  FechaPuntual.hasMany(FechaPuntualActividad, { foreignKey: "idFecha"});
  FechaPuntualActividad.belongsTo(Actividad, { foreignKey: "idActividad"});
  FechaPuntualActividad.belongsTo(FechaPuntual, { foreignKey: "idFecha"});
  Institucion.belongsToMany(Actividad, { as: 'idActividadActividadInstitucionActividads', through: InstitucionActividad, foreignKey: "idInstitucion", otherKey: "idActividad" });
  Institucion.hasMany(InstitucionActividad, { foreignKey: "idInstitucion"});
  InstitucionActividad.belongsTo(Actividad, { foreignKey: "idActividad"});
  InstitucionActividad.belongsTo(Institucion, { foreignKey: "idInstitucion"});
  Meta.belongsTo(Actividad, { foreignKey: "idActividad"});
  Meta.belongsTo(Valoracion, { foreignKey: "idValoracion"});
  Objetivo.belongsToMany(Actividad, { as: 'idActividadActividadObjetivoActividads', through: ObjetivoActividad, foreignKey: "idObjetivo", otherKey: "idActividad" });
  Objetivo.belongsTo(TipoObjetivo, { foreignKey: "tipoObjId"});
  ObjetivoActividad.belongsTo(Actividad, { foreignKey: "idActividad"});
  ObjetivoActividad.belongsTo(Objetivo, { foreignKey: "idObjetivo"});
  Objetivo.hasMany(ObjetivoActividad, { foreignKey: "idObjetivo"});
  ProgramaSippe.belongsToMany(Actividad, { as: 'idActividadActividadProgramaSippeActividads', through: ProgramaSippeActividad, foreignKey: "idProgramaSippe", otherKey: "idActividad" });
  ProgramaSippeActividad.belongsTo(Actividad, { foreignKey: "idActividad"});

  Persona.hasMany(Usuario, { foreignKey: "nroDoc"});
  ProgramaSippeActividad.belongsTo(ProgramaSippe, { foreignKey: "idProgramaSippe"});
  ProgramaSippe.hasMany(ProgramaSippeActividad, { foreignKey: "idProgramaSippe"});
  Relacion.belongsToMany(Actividad, { as: 'idActividadActividadRelacionActividads', through: RelacionActividad, foreignKey: "idRelacion", otherKey: "idActividad" });
  RelacionActividad.belongsTo(Actividad, { foreignKey: "idActividad"});
  Relacion.hasMany(RelacionActividad, { foreignKey: "idRelacion"});
  Relacion.belongsTo(TipoRelacion, { foreignKey: "idTipoRelacion"});
  RelacionActividad.belongsTo(Relacion, { foreignKey: "idRelacion"});
  TipoObjetivo.hasMany(Objetivo, { foreignKey: "tipoObjId"});
  TipoRelacion.hasMany(Relacion, { foreignKey: "idTipoRelacion"});
  
  UbicacionActividad.belongsTo(Ubicacion, { foreignKey: "idUbicacion"});
  Ubicacion.hasMany(UbicacionActividad, { foreignKey: "idUbicacion"});
  Ubicacion.belongsToMany(Actividad, { as: 'idActividadActividadUbicacionActividads', through: UbicacionActividad, foreignKey: "idUbicacion", otherKey: "idActividad" });
  UbicacionActividad.belongsTo(Actividad, { foreignKey: "idActividad"});
  
  Usuario.belongsTo(Persona, { as : 'persona', foreignKey: "nroDoc"});
  Usuario.hasMany(Actividad, { foreignKey: "idUsuario"});
  Valoracion.hasMany(Meta, { foreignKey: "idValoracion"});
  return {
    Actividad: Actividad,
    Area: Area,
    AreaPrograma : AreaPrograma,
    AreaProgramaUsuario : AreaProgramaUsuario,
    Categoria: Categoria,
    CategoriaUsuario : CategoriaUsuario,
    Enlace: Enlace,
    FechaPuntual: FechaPuntual,
    FechaPuntualActividad: FechaPuntualActividad,
    Institucion: Institucion,
    InstitucionActividad: InstitucionActividad,
    Instancia : Instancia,
    Meta: Meta,
    Objetivo: Objetivo,
    ObjetivoActividad: ObjetivoActividad,
    Permiso: Permiso,
    PermisoUsuario : PermisoUsuario,
    Persona: Persona,
    Programa: Programa,
    ProgramaSippe: ProgramaSippe,
    ProgramaSippeActividad: ProgramaSippeActividad,
    Relacion: Relacion,
    RelacionActividad: RelacionActividad,
    TipoObjetivo: TipoObjetivo,
    TipoRelacion: TipoRelacion,
    Ubicacion: Ubicacion,
    UbicacionActividad: UbicacionActividad,
    Usuario: Usuario,
    Valoracion: Valoracion,
  };
}
