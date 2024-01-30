import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Area, AreaId } from './Area';
import type { Enlace, EnlaceId } from './Enlace';
import type { FechaPuntual, FechaPuntualId } from './FechaPuntual';
import type { FechaPuntualActividad, FechaPuntualActividadId } from './FechaPuntualActividad';
import type { Institucion, InstitucionId } from './Institucion';
import type { InstitucionActividad, InstitucionActividadId } from './InstitucionActividad';
import type { Meta, MetaId } from './Meta';
import type { Objetivo, ObjetivoId } from './Objetivo';
import type { ObjetivoActividad, ObjetivoActividadId } from './ObjetivoActividad';
import type { ProgramaSippe, ProgramaSippeId } from './ProgramaSippe';
import type { ProgramaSippeActividad, ProgramaSippeActividadId } from './ProgramaSippeActividad';
import type { Relacion, RelacionId } from './Relacion';
import type { RelacionActividad, RelacionActividadId } from './RelacionActividad';
import type { Ubicacion, UbicacionId } from './Ubicacion';
import type { UbicacionActividad, UbicacionActividadId } from './UbicacionActividad';
import type { Usuario, UsuarioId } from './Usuario';

export interface ActividadAttributes {
  idActividad: number;
  idArea: number;
  idUsuario?: string;
  nro?: number;
  desc: string;
  motivoCancel?: string;
  fechaDesde?: string;
  fechaHasta?: string;
}

export type ActividadPk = "idActividad";
export type ActividadId = Actividad[ActividadPk];
export type ActividadOptionalAttributes = "idActividad" | "idUsuario" | "nro" | "motivoCancel" | "fechaDesde" | "fechaHasta";
export type ActividadCreationAttributes = Optional<ActividadAttributes, ActividadOptionalAttributes>;

export class Actividad extends Model<ActividadAttributes, ActividadCreationAttributes> implements ActividadAttributes {
  idActividad!: number;
  idArea!: number;
  idUsuario?: string;
  nro?: number;
  desc!: string;
  motivoCancel?: string;
  fechaDesde?: string;
  fechaHasta?: string;

  // Actividad hasMany Enlace via idActividad
  Enlaces!: Enlace[];
  getEnlaces!: Sequelize.HasManyGetAssociationsMixin<Enlace>;
  setEnlaces!: Sequelize.HasManySetAssociationsMixin<Enlace, EnlaceId>;
  addEnlace!: Sequelize.HasManyAddAssociationMixin<Enlace, EnlaceId>;
  addEnlaces!: Sequelize.HasManyAddAssociationsMixin<Enlace, EnlaceId>;
  createEnlace!: Sequelize.HasManyCreateAssociationMixin<Enlace>;
  removeEnlace!: Sequelize.HasManyRemoveAssociationMixin<Enlace, EnlaceId>;
  removeEnlaces!: Sequelize.HasManyRemoveAssociationsMixin<Enlace, EnlaceId>;
  hasEnlace!: Sequelize.HasManyHasAssociationMixin<Enlace, EnlaceId>;
  hasEnlaces!: Sequelize.HasManyHasAssociationsMixin<Enlace, EnlaceId>;
  countEnlaces!: Sequelize.HasManyCountAssociationsMixin;
  // Actividad belongsToMany FechaPuntual via idActividad and idFecha
  idFecha_FechaPuntuals!: FechaPuntual[];
  getIdFecha_FechaPuntuals!: Sequelize.BelongsToManyGetAssociationsMixin<FechaPuntual>;
  setIdFecha_FechaPuntuals!: Sequelize.BelongsToManySetAssociationsMixin<FechaPuntual, FechaPuntualId>;
  addIdFecha_FechaPuntual!: Sequelize.BelongsToManyAddAssociationMixin<FechaPuntual, FechaPuntualId>;
  addIdFecha_FechaPuntuals!: Sequelize.BelongsToManyAddAssociationsMixin<FechaPuntual, FechaPuntualId>;
  createIdFecha_FechaPuntual!: Sequelize.BelongsToManyCreateAssociationMixin<FechaPuntual>;
  removeIdFecha_FechaPuntual!: Sequelize.BelongsToManyRemoveAssociationMixin<FechaPuntual, FechaPuntualId>;
  removeIdFecha_FechaPuntuals!: Sequelize.BelongsToManyRemoveAssociationsMixin<FechaPuntual, FechaPuntualId>;
  hasIdFecha_FechaPuntual!: Sequelize.BelongsToManyHasAssociationMixin<FechaPuntual, FechaPuntualId>;
  hasIdFecha_FechaPuntuals!: Sequelize.BelongsToManyHasAssociationsMixin<FechaPuntual, FechaPuntualId>;
  countIdFecha_FechaPuntuals!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Actividad hasMany FechaPuntualActividad via idActividad
  FechaPuntualActividads!: FechaPuntualActividad[];
  getFechaPuntualActividads!: Sequelize.HasManyGetAssociationsMixin<FechaPuntualActividad>;
  setFechaPuntualActividads!: Sequelize.HasManySetAssociationsMixin<FechaPuntualActividad, FechaPuntualActividadId>;
  addFechaPuntualActividad!: Sequelize.HasManyAddAssociationMixin<FechaPuntualActividad, FechaPuntualActividadId>;
  addFechaPuntualActividads!: Sequelize.HasManyAddAssociationsMixin<FechaPuntualActividad, FechaPuntualActividadId>;
  createFechaPuntualActividad!: Sequelize.HasManyCreateAssociationMixin<FechaPuntualActividad>;
  removeFechaPuntualActividad!: Sequelize.HasManyRemoveAssociationMixin<FechaPuntualActividad, FechaPuntualActividadId>;
  removeFechaPuntualActividads!: Sequelize.HasManyRemoveAssociationsMixin<FechaPuntualActividad, FechaPuntualActividadId>;
  hasFechaPuntualActividad!: Sequelize.HasManyHasAssociationMixin<FechaPuntualActividad, FechaPuntualActividadId>;
  hasFechaPuntualActividads!: Sequelize.HasManyHasAssociationsMixin<FechaPuntualActividad, FechaPuntualActividadId>;
  countFechaPuntualActividads!: Sequelize.HasManyCountAssociationsMixin;
  // Actividad belongsToMany Institucion via idActividad and idInstitucion
  idInstitucion_Institucions!: Institucion[];
  getIdInstitucion_Institucions!: Sequelize.BelongsToManyGetAssociationsMixin<Institucion>;
  setIdInstitucion_Institucions!: Sequelize.BelongsToManySetAssociationsMixin<Institucion, InstitucionId>;
  addIdInstitucion_Institucion!: Sequelize.BelongsToManyAddAssociationMixin<Institucion, InstitucionId>;
  addIdInstitucion_Institucions!: Sequelize.BelongsToManyAddAssociationsMixin<Institucion, InstitucionId>;
  createIdInstitucion_Institucion!: Sequelize.BelongsToManyCreateAssociationMixin<Institucion>;
  removeIdInstitucion_Institucion!: Sequelize.BelongsToManyRemoveAssociationMixin<Institucion, InstitucionId>;
  removeIdInstitucion_Institucions!: Sequelize.BelongsToManyRemoveAssociationsMixin<Institucion, InstitucionId>;
  hasIdInstitucion_Institucion!: Sequelize.BelongsToManyHasAssociationMixin<Institucion, InstitucionId>;
  hasIdInstitucion_Institucions!: Sequelize.BelongsToManyHasAssociationsMixin<Institucion, InstitucionId>;
  countIdInstitucion_Institucions!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Actividad hasMany InstitucionActividad via idActividad
  InstitucionActividads!: InstitucionActividad[];
  getInstitucionActividads!: Sequelize.HasManyGetAssociationsMixin<InstitucionActividad>;
  setInstitucionActividads!: Sequelize.HasManySetAssociationsMixin<InstitucionActividad, InstitucionActividadId>;
  addInstitucionActividad!: Sequelize.HasManyAddAssociationMixin<InstitucionActividad, InstitucionActividadId>;
  addInstitucionActividads!: Sequelize.HasManyAddAssociationsMixin<InstitucionActividad, InstitucionActividadId>;
  createInstitucionActividad!: Sequelize.HasManyCreateAssociationMixin<InstitucionActividad>;
  removeInstitucionActividad!: Sequelize.HasManyRemoveAssociationMixin<InstitucionActividad, InstitucionActividadId>;
  removeInstitucionActividads!: Sequelize.HasManyRemoveAssociationsMixin<InstitucionActividad, InstitucionActividadId>;
  hasInstitucionActividad!: Sequelize.HasManyHasAssociationMixin<InstitucionActividad, InstitucionActividadId>;
  hasInstitucionActividads!: Sequelize.HasManyHasAssociationsMixin<InstitucionActividad, InstitucionActividadId>;
  countInstitucionActividads!: Sequelize.HasManyCountAssociationsMixin;
  // Actividad hasMany Meta via idActividad
  Meta!: Meta[];
  getMeta!: Sequelize.HasManyGetAssociationsMixin<Meta>;
  setMeta!: Sequelize.HasManySetAssociationsMixin<Meta, MetaId>;
  addMetum!: Sequelize.HasManyAddAssociationMixin<Meta, MetaId>;
  addMeta!: Sequelize.HasManyAddAssociationsMixin<Meta, MetaId>;
  createMetum!: Sequelize.HasManyCreateAssociationMixin<Meta>;
  removeMetum!: Sequelize.HasManyRemoveAssociationMixin<Meta, MetaId>;
  removeMeta!: Sequelize.HasManyRemoveAssociationsMixin<Meta, MetaId>;
  hasMetum!: Sequelize.HasManyHasAssociationMixin<Meta, MetaId>;
  hasMeta!: Sequelize.HasManyHasAssociationsMixin<Meta, MetaId>;
  countMeta!: Sequelize.HasManyCountAssociationsMixin;
  // Actividad belongsToMany Objetivo via idActividad and idObjetivo
  idObjetivo_Objetivos!: Objetivo[];
  getIdObjetivo_Objetivos!: Sequelize.BelongsToManyGetAssociationsMixin<Objetivo>;
  setIdObjetivo_Objetivos!: Sequelize.BelongsToManySetAssociationsMixin<Objetivo, ObjetivoId>;
  addIdObjetivo_Objetivo!: Sequelize.BelongsToManyAddAssociationMixin<Objetivo, ObjetivoId>;
  addIdObjetivo_Objetivos!: Sequelize.BelongsToManyAddAssociationsMixin<Objetivo, ObjetivoId>;
  createIdObjetivo_Objetivo!: Sequelize.BelongsToManyCreateAssociationMixin<Objetivo>;
  removeIdObjetivo_Objetivo!: Sequelize.BelongsToManyRemoveAssociationMixin<Objetivo, ObjetivoId>;
  removeIdObjetivo_Objetivos!: Sequelize.BelongsToManyRemoveAssociationsMixin<Objetivo, ObjetivoId>;
  hasIdObjetivo_Objetivo!: Sequelize.BelongsToManyHasAssociationMixin<Objetivo, ObjetivoId>;
  hasIdObjetivo_Objetivos!: Sequelize.BelongsToManyHasAssociationsMixin<Objetivo, ObjetivoId>;
  countIdObjetivo_Objetivos!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Actividad hasMany ObjetivoActividad via idActividad
  ObjetivoActividads!: ObjetivoActividad[];
  getObjetivoActividads!: Sequelize.HasManyGetAssociationsMixin<ObjetivoActividad>;
  setObjetivoActividads!: Sequelize.HasManySetAssociationsMixin<ObjetivoActividad, ObjetivoActividadId>;
  addObjetivoActividad!: Sequelize.HasManyAddAssociationMixin<ObjetivoActividad, ObjetivoActividadId>;
  addObjetivoActividads!: Sequelize.HasManyAddAssociationsMixin<ObjetivoActividad, ObjetivoActividadId>;
  createObjetivoActividad!: Sequelize.HasManyCreateAssociationMixin<ObjetivoActividad>;
  removeObjetivoActividad!: Sequelize.HasManyRemoveAssociationMixin<ObjetivoActividad, ObjetivoActividadId>;
  removeObjetivoActividads!: Sequelize.HasManyRemoveAssociationsMixin<ObjetivoActividad, ObjetivoActividadId>;
  hasObjetivoActividad!: Sequelize.HasManyHasAssociationMixin<ObjetivoActividad, ObjetivoActividadId>;
  hasObjetivoActividads!: Sequelize.HasManyHasAssociationsMixin<ObjetivoActividad, ObjetivoActividadId>;
  countObjetivoActividads!: Sequelize.HasManyCountAssociationsMixin;
  // Actividad belongsToMany ProgramaSippe via idActividad and idProgramaSIPPE
  idProgramaSIPPE_ProgramaSIPPEs!: ProgramaSippe[];
  getIdProgramaSIPPE_ProgramaSIPPEs!: Sequelize.BelongsToManyGetAssociationsMixin<ProgramaSippe>;
  setIdProgramaSIPPE_ProgramaSIPPEs!: Sequelize.BelongsToManySetAssociationsMixin<ProgramaSippe, ProgramaSippeId>;
  addIdProgramaSIPPE_ProgramaSIPPE!: Sequelize.BelongsToManyAddAssociationMixin<ProgramaSippe, ProgramaSippeId>;
  addIdProgramaSIPPE_ProgramaSIPPEs!: Sequelize.BelongsToManyAddAssociationsMixin<ProgramaSippe, ProgramaSippeId>;
  createIdProgramaSIPPE_ProgramaSIPPE!: Sequelize.BelongsToManyCreateAssociationMixin<ProgramaSippe>;
  removeIdProgramaSIPPE_ProgramaSIPPE!: Sequelize.BelongsToManyRemoveAssociationMixin<ProgramaSippe, ProgramaSippeId>;
  removeIdProgramaSIPPE_ProgramaSIPPEs!: Sequelize.BelongsToManyRemoveAssociationsMixin<ProgramaSippe, ProgramaSippeId>;
  hasIdProgramaSIPPE_ProgramaSIPPE!: Sequelize.BelongsToManyHasAssociationMixin<ProgramaSippe, ProgramaSippeId>;
  hasIdProgramaSIPPE_ProgramaSIPPEs!: Sequelize.BelongsToManyHasAssociationsMixin<ProgramaSippe, ProgramaSippeId>;
  countIdProgramaSIPPE_ProgramaSIPPEs!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Actividad hasMany ProgramaSippeActividad via idActividad
  ProgramaSIPPEActividads!: ProgramaSippeActividad[];
  getProgramaSIPPEActividads!: Sequelize.HasManyGetAssociationsMixin<ProgramaSippeActividad>;
  setProgramaSIPPEActividads!: Sequelize.HasManySetAssociationsMixin<ProgramaSippeActividad, ProgramaSippeActividadId>;
  addProgramaSIPPEActividad!: Sequelize.HasManyAddAssociationMixin<ProgramaSippeActividad, ProgramaSippeActividadId>;
  addProgramaSIPPEActividads!: Sequelize.HasManyAddAssociationsMixin<ProgramaSippeActividad, ProgramaSippeActividadId>;
  createProgramaSIPPEActividad!: Sequelize.HasManyCreateAssociationMixin<ProgramaSippeActividad>;
  removeProgramaSIPPEActividad!: Sequelize.HasManyRemoveAssociationMixin<ProgramaSippeActividad, ProgramaSippeActividadId>;
  removeProgramaSIPPEActividads!: Sequelize.HasManyRemoveAssociationsMixin<ProgramaSippeActividad, ProgramaSippeActividadId>;
  hasProgramaSIPPEActividad!: Sequelize.HasManyHasAssociationMixin<ProgramaSippeActividad, ProgramaSippeActividadId>;
  hasProgramaSIPPEActividads!: Sequelize.HasManyHasAssociationsMixin<ProgramaSippeActividad, ProgramaSippeActividadId>;
  countProgramaSIPPEActividads!: Sequelize.HasManyCountAssociationsMixin;
  // Actividad belongsToMany Relacion via idActividad and idRelacion
  idRelacion_Relacions!: Relacion[];
  getIdRelacion_Relacions!: Sequelize.BelongsToManyGetAssociationsMixin<Relacion>;
  setIdRelacion_Relacions!: Sequelize.BelongsToManySetAssociationsMixin<Relacion, RelacionId>;
  addIdRelacion_Relacion!: Sequelize.BelongsToManyAddAssociationMixin<Relacion, RelacionId>;
  addIdRelacion_Relacions!: Sequelize.BelongsToManyAddAssociationsMixin<Relacion, RelacionId>;
  createIdRelacion_Relacion!: Sequelize.BelongsToManyCreateAssociationMixin<Relacion>;
  removeIdRelacion_Relacion!: Sequelize.BelongsToManyRemoveAssociationMixin<Relacion, RelacionId>;
  removeIdRelacion_Relacions!: Sequelize.BelongsToManyRemoveAssociationsMixin<Relacion, RelacionId>;
  hasIdRelacion_Relacion!: Sequelize.BelongsToManyHasAssociationMixin<Relacion, RelacionId>;
  hasIdRelacion_Relacions!: Sequelize.BelongsToManyHasAssociationsMixin<Relacion, RelacionId>;
  countIdRelacion_Relacions!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Actividad hasMany RelacionActividad via idActividad
  RelacionActividads!: RelacionActividad[];
  getRelacionActividads!: Sequelize.HasManyGetAssociationsMixin<RelacionActividad>;
  setRelacionActividads!: Sequelize.HasManySetAssociationsMixin<RelacionActividad, RelacionActividadId>;
  addRelacionActividad!: Sequelize.HasManyAddAssociationMixin<RelacionActividad, RelacionActividadId>;
  addRelacionActividads!: Sequelize.HasManyAddAssociationsMixin<RelacionActividad, RelacionActividadId>;
  createRelacionActividad!: Sequelize.HasManyCreateAssociationMixin<RelacionActividad>;
  removeRelacionActividad!: Sequelize.HasManyRemoveAssociationMixin<RelacionActividad, RelacionActividadId>;
  removeRelacionActividads!: Sequelize.HasManyRemoveAssociationsMixin<RelacionActividad, RelacionActividadId>;
  hasRelacionActividad!: Sequelize.HasManyHasAssociationMixin<RelacionActividad, RelacionActividadId>;
  hasRelacionActividads!: Sequelize.HasManyHasAssociationsMixin<RelacionActividad, RelacionActividadId>;
  countRelacionActividads!: Sequelize.HasManyCountAssociationsMixin;
  // Actividad belongsToMany Ubicacion via idActividad and idUbicacion
  idUbicacion_Ubicacions!: Ubicacion[];
  getIdUbicacion_Ubicacions!: Sequelize.BelongsToManyGetAssociationsMixin<Ubicacion>;
  setIdUbicacion_Ubicacions!: Sequelize.BelongsToManySetAssociationsMixin<Ubicacion, UbicacionId>;
  addIdUbicacion_Ubicacion!: Sequelize.BelongsToManyAddAssociationMixin<Ubicacion, UbicacionId>;
  addIdUbicacion_Ubicacions!: Sequelize.BelongsToManyAddAssociationsMixin<Ubicacion, UbicacionId>;
  createIdUbicacion_Ubicacion!: Sequelize.BelongsToManyCreateAssociationMixin<Ubicacion>;
  removeIdUbicacion_Ubicacion!: Sequelize.BelongsToManyRemoveAssociationMixin<Ubicacion, UbicacionId>;
  removeIdUbicacion_Ubicacions!: Sequelize.BelongsToManyRemoveAssociationsMixin<Ubicacion, UbicacionId>;
  hasIdUbicacion_Ubicacion!: Sequelize.BelongsToManyHasAssociationMixin<Ubicacion, UbicacionId>;
  hasIdUbicacion_Ubicacions!: Sequelize.BelongsToManyHasAssociationsMixin<Ubicacion, UbicacionId>;
  countIdUbicacion_Ubicacions!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Actividad hasMany UbicacionActividad via idActividad
  UbicacionActividads!: UbicacionActividad[];
  getUbicacionActividads!: Sequelize.HasManyGetAssociationsMixin<UbicacionActividad>;
  setUbicacionActividads!: Sequelize.HasManySetAssociationsMixin<UbicacionActividad, UbicacionActividadId>;
  addUbicacionActividad!: Sequelize.HasManyAddAssociationMixin<UbicacionActividad, UbicacionActividadId>;
  addUbicacionActividads!: Sequelize.HasManyAddAssociationsMixin<UbicacionActividad, UbicacionActividadId>;
  createUbicacionActividad!: Sequelize.HasManyCreateAssociationMixin<UbicacionActividad>;
  removeUbicacionActividad!: Sequelize.HasManyRemoveAssociationMixin<UbicacionActividad, UbicacionActividadId>;
  removeUbicacionActividads!: Sequelize.HasManyRemoveAssociationsMixin<UbicacionActividad, UbicacionActividadId>;
  hasUbicacionActividad!: Sequelize.HasManyHasAssociationMixin<UbicacionActividad, UbicacionActividadId>;
  hasUbicacionActividads!: Sequelize.HasManyHasAssociationsMixin<UbicacionActividad, UbicacionActividadId>;
  countUbicacionActividads!: Sequelize.HasManyCountAssociationsMixin;
  // Actividad belongsTo Area via idArea
  idArea_Area!: Area;
  getIdArea_Area!: Sequelize.BelongsToGetAssociationMixin<Area>;
  setIdArea_Area!: Sequelize.BelongsToSetAssociationMixin<Area, AreaId>;
  createIdArea_Area!: Sequelize.BelongsToCreateAssociationMixin<Area>;
  // Actividad belongsTo Usuario via idUsuario
  idUsuario_Usuario!: Usuario;
  getIdUsuario_Usuario!: Sequelize.BelongsToGetAssociationMixin<Usuario>;
  setIdUsuario_Usuario!: Sequelize.BelongsToSetAssociationMixin<Usuario, UsuarioId>;
  createIdUsuario_Usuario!: Sequelize.BelongsToCreateAssociationMixin<Usuario>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Actividad {
    return Actividad.init({
    idActividad: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    idArea: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Area',
        key: 'idArea'
      }
    },
    idUsuario: {
      type: DataTypes.STRING(255),
      allowNull: true,
      references: {
        model: 'Usuario',
        key: 'idUsuario'
      }
    },
    nro: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    desc: {
      type: DataTypes.STRING(2000),
      allowNull: false
    },
    motivoCancel: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    fechaDesde: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    fechaHasta: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Actividad',
    timestamps: true,
    paranoid: true
  });
  }
}
