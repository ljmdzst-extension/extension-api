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
  motivoCancel?: string | null;
  fechaDesde?: string;
  fechaHasta?: string;
}

export type ActividadPk = "idActividad";
export type ActividadId = Actividad[ActividadPk];
export type ActividadOptionalAttributes = "idActividad" | "idUsuario" | "nro" | "motivoCancel" | "fechaDesde" | "fechaHasta" ;
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
  enlaces!: Enlace[];
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
  idFechaFechaPuntuals!: FechaPuntual[];
  getIdFechaFechaPuntuals!: Sequelize.BelongsToManyGetAssociationsMixin<FechaPuntual>;
  setIdFechaFechaPuntuals!: Sequelize.BelongsToManySetAssociationsMixin<FechaPuntual, FechaPuntualId>;
  addIdFechaFechaPuntual!: Sequelize.BelongsToManyAddAssociationMixin<FechaPuntual, FechaPuntualId>;
  addIdFechaFechaPuntuals!: Sequelize.BelongsToManyAddAssociationsMixin<FechaPuntual, FechaPuntualId>;
  createIdFechaFechaPuntual!: Sequelize.BelongsToManyCreateAssociationMixin<FechaPuntual>;
  removeIdFechaFechaPuntual!: Sequelize.BelongsToManyRemoveAssociationMixin<FechaPuntual, FechaPuntualId>;
  removeIdFechaFechaPuntuals!: Sequelize.BelongsToManyRemoveAssociationsMixin<FechaPuntual, FechaPuntualId>;
  hasIdFechaFechaPuntual!: Sequelize.BelongsToManyHasAssociationMixin<FechaPuntual, FechaPuntualId>;
  hasIdFechaFechaPuntuals!: Sequelize.BelongsToManyHasAssociationsMixin<FechaPuntual, FechaPuntualId>;
  countIdFechaFechaPuntuals!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Actividad hasMany FechaPuntualActividad via idActividad
  fechaPuntualActividads!: FechaPuntualActividad[];
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
  idInstitucionInstitucions!: Institucion[];
  getIdInstitucionInstitucions!: Sequelize.BelongsToManyGetAssociationsMixin<Institucion>;
  setIdInstitucionInstitucions!: Sequelize.BelongsToManySetAssociationsMixin<Institucion, InstitucionId>;
  addIdInstitucionInstitucion!: Sequelize.BelongsToManyAddAssociationMixin<Institucion, InstitucionId>;
  addIdInstitucionInstitucions!: Sequelize.BelongsToManyAddAssociationsMixin<Institucion, InstitucionId>;
  createIdInstitucionInstitucion!: Sequelize.BelongsToManyCreateAssociationMixin<Institucion>;
  removeIdInstitucionInstitucion!: Sequelize.BelongsToManyRemoveAssociationMixin<Institucion, InstitucionId>;
  removeIdInstitucionInstitucions!: Sequelize.BelongsToManyRemoveAssociationsMixin<Institucion, InstitucionId>;
  hasIdInstitucionInstitucion!: Sequelize.BelongsToManyHasAssociationMixin<Institucion, InstitucionId>;
  hasIdInstitucionInstitucions!: Sequelize.BelongsToManyHasAssociationsMixin<Institucion, InstitucionId>;
  countIdInstitucionInstitucions!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Actividad hasMany InstitucionActividad via idActividad
  institucionActividads!: InstitucionActividad[];
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
  meta!: Meta[];
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
  idObjetivoObjetivos!: Objetivo[];
  getIdObjetivoObjetivos!: Sequelize.BelongsToManyGetAssociationsMixin<Objetivo>;
  setIdObjetivoObjetivos!: Sequelize.BelongsToManySetAssociationsMixin<Objetivo, ObjetivoId>;
  addIdObjetivoObjetivo!: Sequelize.BelongsToManyAddAssociationMixin<Objetivo, ObjetivoId>;
  addIdObjetivoObjetivos!: Sequelize.BelongsToManyAddAssociationsMixin<Objetivo, ObjetivoId>;
  createIdObjetivoObjetivo!: Sequelize.BelongsToManyCreateAssociationMixin<Objetivo>;
  removeIdObjetivoObjetivo!: Sequelize.BelongsToManyRemoveAssociationMixin<Objetivo, ObjetivoId>;
  removeIdObjetivoObjetivos!: Sequelize.BelongsToManyRemoveAssociationsMixin<Objetivo, ObjetivoId>;
  hasIdObjetivoObjetivo!: Sequelize.BelongsToManyHasAssociationMixin<Objetivo, ObjetivoId>;
  hasIdObjetivoObjetivos!: Sequelize.BelongsToManyHasAssociationsMixin<Objetivo, ObjetivoId>;
  countIdObjetivoObjetivos!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Actividad hasMany ObjetivoActividad via idActividad
  objetivoActividads!: ObjetivoActividad[];
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
  // Actividad belongsToMany ProgramaSippe via idActividad and idProgramaSippe
  idProgramaSippeProgramaSippes!: ProgramaSippe[];
  getIdProgramaSippeProgramaSippes!: Sequelize.BelongsToManyGetAssociationsMixin<ProgramaSippe>;
  setIdProgramaSippeProgramaSippes!: Sequelize.BelongsToManySetAssociationsMixin<ProgramaSippe, ProgramaSippeId>;
  addIdProgramaSippeProgramaSippe!: Sequelize.BelongsToManyAddAssociationMixin<ProgramaSippe, ProgramaSippeId>;
  addIdProgramaSippeProgramaSippes!: Sequelize.BelongsToManyAddAssociationsMixin<ProgramaSippe, ProgramaSippeId>;
  createIdProgramaSippeProgramaSippe!: Sequelize.BelongsToManyCreateAssociationMixin<ProgramaSippe>;
  removeIdProgramaSippeProgramaSippe!: Sequelize.BelongsToManyRemoveAssociationMixin<ProgramaSippe, ProgramaSippeId>;
  removeIdProgramaSippeProgramaSippes!: Sequelize.BelongsToManyRemoveAssociationsMixin<ProgramaSippe, ProgramaSippeId>;
  hasIdProgramaSippeProgramaSippe!: Sequelize.BelongsToManyHasAssociationMixin<ProgramaSippe, ProgramaSippeId>;
  hasIdProgramaSippeProgramaSippes!: Sequelize.BelongsToManyHasAssociationsMixin<ProgramaSippe, ProgramaSippeId>;
  countIdProgramaSippeProgramaSippes!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Actividad hasMany ProgramaSippeActividad via idActividad
  programaSippeActividads!: ProgramaSippeActividad[];
  getProgramaSippeActividads!: Sequelize.HasManyGetAssociationsMixin<ProgramaSippeActividad>;
  setProgramaSippeActividads!: Sequelize.HasManySetAssociationsMixin<ProgramaSippeActividad, ProgramaSippeActividadId>;
  addProgramaSippeActividad!: Sequelize.HasManyAddAssociationMixin<ProgramaSippeActividad, ProgramaSippeActividadId>;
  addProgramaSippeActividads!: Sequelize.HasManyAddAssociationsMixin<ProgramaSippeActividad, ProgramaSippeActividadId>;
  createProgramaSippeActividad!: Sequelize.HasManyCreateAssociationMixin<ProgramaSippeActividad>;
  removeProgramaSippeActividad!: Sequelize.HasManyRemoveAssociationMixin<ProgramaSippeActividad, ProgramaSippeActividadId>;
  removeProgramaSippeActividads!: Sequelize.HasManyRemoveAssociationsMixin<ProgramaSippeActividad, ProgramaSippeActividadId>;
  hasProgramaSippeActividad!: Sequelize.HasManyHasAssociationMixin<ProgramaSippeActividad, ProgramaSippeActividadId>;
  hasProgramaSippeActividads!: Sequelize.HasManyHasAssociationsMixin<ProgramaSippeActividad, ProgramaSippeActividadId>;
  countProgramaSippeActividads!: Sequelize.HasManyCountAssociationsMixin;
  // Actividad belongsToMany Relacion via idActividad and idRelacion
  idRelacionRelacions!: Relacion[];
  getIdRelacionRelacions!: Sequelize.BelongsToManyGetAssociationsMixin<Relacion>;
  setIdRelacionRelacions!: Sequelize.BelongsToManySetAssociationsMixin<Relacion, RelacionId>;
  addIdRelacionRelacion!: Sequelize.BelongsToManyAddAssociationMixin<Relacion, RelacionId>;
  addIdRelacionRelacions!: Sequelize.BelongsToManyAddAssociationsMixin<Relacion, RelacionId>;
  createIdRelacionRelacion!: Sequelize.BelongsToManyCreateAssociationMixin<Relacion>;
  removeIdRelacionRelacion!: Sequelize.BelongsToManyRemoveAssociationMixin<Relacion, RelacionId>;
  removeIdRelacionRelacions!: Sequelize.BelongsToManyRemoveAssociationsMixin<Relacion, RelacionId>;
  hasIdRelacionRelacion!: Sequelize.BelongsToManyHasAssociationMixin<Relacion, RelacionId>;
  hasIdRelacionRelacions!: Sequelize.BelongsToManyHasAssociationsMixin<Relacion, RelacionId>;
  countIdRelacionRelacions!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Actividad hasMany RelacionActividad via idActividad
  relacionActividads!: RelacionActividad[];
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
  idUbicacionUbicacions!: Ubicacion[];
  getIdUbicacionUbicacions!: Sequelize.BelongsToManyGetAssociationsMixin<Ubicacion>;
  setIdUbicacionUbicacions!: Sequelize.BelongsToManySetAssociationsMixin<Ubicacion, UbicacionId>;
  addIdUbicacionUbicacion!: Sequelize.BelongsToManyAddAssociationMixin<Ubicacion, UbicacionId>;
  addIdUbicacionUbicacions!: Sequelize.BelongsToManyAddAssociationsMixin<Ubicacion, UbicacionId>;
  createIdUbicacionUbicacion!: Sequelize.BelongsToManyCreateAssociationMixin<Ubicacion>;
  removeIdUbicacionUbicacion!: Sequelize.BelongsToManyRemoveAssociationMixin<Ubicacion, UbicacionId>;
  removeIdUbicacionUbicacions!: Sequelize.BelongsToManyRemoveAssociationsMixin<Ubicacion, UbicacionId>;
  hasIdUbicacionUbicacion!: Sequelize.BelongsToManyHasAssociationMixin<Ubicacion, UbicacionId>;
  hasIdUbicacionUbicacions!: Sequelize.BelongsToManyHasAssociationsMixin<Ubicacion, UbicacionId>;
  countIdUbicacionUbicacions!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Actividad hasMany UbicacionActividad via idActividad
  ubicacionActividads!: UbicacionActividad[];
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
  idAreaArea!: Area;
  getIdAreaArea!: Sequelize.BelongsToGetAssociationMixin<Area>;
  setIdAreaArea!: Sequelize.BelongsToSetAssociationMixin<Area, AreaId>;
  createIdAreaArea!: Sequelize.BelongsToCreateAssociationMixin<Area>;
  // Actividad belongsTo Usuario via idUsuario
  idUsuarioUsuario!: Usuario;
  getIdUsuarioUsuario!: Sequelize.BelongsToGetAssociationMixin<Usuario>;
  setIdUsuarioUsuario!: Sequelize.BelongsToSetAssociationMixin<Usuario, UsuarioId>;
  createIdUsuarioUsuario!: Sequelize.BelongsToCreateAssociationMixin<Usuario>;

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
