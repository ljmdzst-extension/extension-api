import type { Sequelize } from "sequelize";
import { ActividadObjetivoEspecifico as _ActividadObjetivoEspecifico } from "./ActividadObjetivoEspecifico";
import type { ActividadObjetivoEspecificoAttributes, ActividadObjetivoEspecificoCreationAttributes } from "./ActividadObjetivoEspecifico";
import { ActividadParticipanteSocial as _ActividadParticipanteSocial } from "./ActividadParticipanteSocial";
import type { ActividadParticipanteSocialAttributes, ActividadParticipanteSocialCreationAttributes } from "./ActividadParticipanteSocial";
import { Evaluacion as _Evaluacion } from "./Evaluacion";
import type { EvaluacionAttributes, EvaluacionCreationAttributes } from "./Evaluacion";
import { EvaluacionItem as _EvaluacionItem } from "./EvaluacionItem";
import type { EvaluacionItemAttributes, EvaluacionItemCreationAttributes } from "./EvaluacionItem";
import { Geolocalizacion as _Geolocalizacion } from "./Geolocalizacion";
import type { GeolocalizacionAttributes, GeolocalizacionCreationAttributes } from "./Geolocalizacion";
import { Integrante as _Integrante } from "./Integrante";
import type { IntegranteAttributes, IntegranteCreationAttributes } from "./Integrante";
import { ObjetivoEspecifico as _ObjetivoEspecifico } from "./ObjetivoEspecifico";
import type { ObjetivoEspecificoAttributes, ObjetivoEspecificoCreationAttributes } from "./ObjetivoEspecifico";
import { ParticipanteSocial as _ParticipanteSocial } from "./ParticipanteSocial";
import type { ParticipanteSocialAttributes, ParticipanteSocialCreationAttributes } from "./ParticipanteSocial";
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
import { Rol as _Rol } from "./Rol";
import type { RolAttributes, RolCreationAttributes } from "./Rol";
import { RolIntegrante as _RolIntegrante } from "./RolIntegrante";
import type { RolIntegranteAttributes, RolIntegranteCreationAttributes } from "./RolIntegrante";
import { TipoEvaluacion as _TipoEvaluacion } from "./TipoEvaluacion";
import type { TipoEvaluacionAttributes, TipoEvaluacionCreationAttributes } from "./TipoEvaluacion";

export {
  _ActividadObjetivoEspecifico as ActividadObjetivoEspecifico,
  _ActividadParticipanteSocial as ActividadParticipanteSocial,
  _Evaluacion as Evaluacion,
  _EvaluacionItem as EvaluacionItem,
  _Geolocalizacion as Geolocalizacion,
  _Integrante as Integrante,
  _ObjetivoEspecifico as ObjetivoEspecifico,
  _ParticipanteSocial as ParticipanteSocial,
  _Propuesta as Propuesta,
  _PropuestaCapacitacion as PropuestaCapacitacion,
  _PropuestaInstitucion as PropuestaInstitucion,
  _PropuestaLineaTematica as PropuestaLineaTematica,
  _PropuestaPalabraClave as PropuestaPalabraClave,
  _PropuestaPrevia as PropuestaPrevia,
  _PropuestaProgramaExtension as PropuestaProgramaExtension,
  _PropuestaRelacionada as PropuestaRelacionada,
  _Rol as Rol,
  _RolIntegrante as RolIntegrante,
  _TipoEvaluacion as TipoEvaluacion,
};

export type {
  ActividadObjetivoEspecificoAttributes,
  ActividadObjetivoEspecificoCreationAttributes,
  ActividadParticipanteSocialAttributes,
  ActividadParticipanteSocialCreationAttributes,
  EvaluacionAttributes,
  EvaluacionCreationAttributes,
  EvaluacionItemAttributes,
  EvaluacionItemCreationAttributes,
  GeolocalizacionAttributes,
  GeolocalizacionCreationAttributes,
  IntegranteAttributes,
  IntegranteCreationAttributes,
  ObjetivoEspecificoAttributes,
  ObjetivoEspecificoCreationAttributes,
  ParticipanteSocialAttributes,
  ParticipanteSocialCreationAttributes,
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
  RolAttributes,
  RolCreationAttributes,
  RolIntegranteAttributes,
  RolIntegranteCreationAttributes,
  TipoEvaluacionAttributes,
  TipoEvaluacionCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const ActividadObjetivoEspecifico = _ActividadObjetivoEspecifico.initModel(sequelize);
  const ActividadParticipanteSocial = _ActividadParticipanteSocial.initModel(sequelize);
  const Evaluacion = _Evaluacion.initModel(sequelize);
  const EvaluacionItem = _EvaluacionItem.initModel(sequelize);
  const Geolocalizacion = _Geolocalizacion.initModel(sequelize);
  const Integrante = _Integrante.initModel(sequelize);
  const ObjetivoEspecifico = _ObjetivoEspecifico.initModel(sequelize);
  const ParticipanteSocial = _ParticipanteSocial.initModel(sequelize);
  const Propuesta = _Propuesta.initModel(sequelize);
  const PropuestaCapacitacion = _PropuestaCapacitacion.initModel(sequelize);
  const PropuestaInstitucion = _PropuestaInstitucion.initModel(sequelize);
  const PropuestaLineaTematica = _PropuestaLineaTematica.initModel(sequelize);
  const PropuestaPalabraClave = _PropuestaPalabraClave.initModel(sequelize);
  const PropuestaPrevia = _PropuestaPrevia.initModel(sequelize);
  const PropuestaProgramaExtension = _PropuestaProgramaExtension.initModel(sequelize);
  const PropuestaRelacionada = _PropuestaRelacionada.initModel(sequelize);
  const Rol = _Rol.initModel(sequelize);
  const RolIntegrante = _RolIntegrante.initModel(sequelize);
  const TipoEvaluacion = _TipoEvaluacion.initModel(sequelize);

  Propuesta.belongsToMany(Propuesta, { as: 'codigoPropuestaPreviaPropuesta', through: PropuestaPrevia, foreignKey: "codigoPropuesta", otherKey: "codigoPropuestaPrevia" });
  Propuesta.belongsToMany(Propuesta, { as: 'codigoPropuestaPropuestaPropuestaPrevia', through: PropuestaPrevia, foreignKey: "codigoPropuestaPrevia", otherKey: "codigoPropuesta" });
  Propuesta.belongsToMany(Propuesta, { as: 'codigoPropuestaPropuestaPropuestaRelacionadas', through: PropuestaRelacionada, foreignKey: "codigoPropuestaRelacionada", otherKey: "codigoPropuesta" });
  Propuesta.belongsToMany(Propuesta, { as: 'codigoPropuestaRelacionadaPropuesta', through: PropuestaRelacionada, foreignKey: "codigoPropuesta", otherKey: "codigoPropuestaRelacionada" });
  Propuesta.belongsToMany(TipoEvaluacion, { as: 'idTipoEvaluacionTipoEvaluacions', through: Evaluacion, foreignKey: "codigoPropuesta", otherKey: "idTipoEvaluacion" });
  TipoEvaluacion.belongsToMany(Propuesta, { as: 'codigoPropuestaPropuesta', through: Evaluacion, foreignKey: "idTipoEvaluacion", otherKey: "codigoPropuesta" });

  EvaluacionItem.belongsTo(Evaluacion, { as: "codigoPropuestaEvaluacion", foreignKey: "codigoPropuesta"});
  Evaluacion.hasMany(EvaluacionItem, { as: "evaluacionItems", foreignKey: "codigoPropuesta"});
  EvaluacionItem.belongsTo(Evaluacion, { as: "idTipoEvaluacionEvaluacion", foreignKey: "idTipoEvaluacion"});
  Evaluacion.hasMany(EvaluacionItem, { as: "idTipoEvaluacionEvaluacionItems", foreignKey: "idTipoEvaluacion"});
  RolIntegrante.belongsTo(Integrante, { as: "nroDocIntegrante", foreignKey: "nroDoc"});
  Integrante.hasMany(RolIntegrante, { as: "rolIntegrantes", foreignKey: "nroDoc"});
  RolIntegrante.belongsTo(Integrante, { as: "codigoPropuestaIntegrante", foreignKey: "codigoPropuesta"});
  Integrante.hasMany(RolIntegrante, { as: "codigoPropuestaRolIntegrantes", foreignKey: "codigoPropuesta"});
  ActividadObjetivoEspecifico.belongsTo(ObjetivoEspecifico, { as: "idObjetivoEspecificoObjetivoEspecifico", foreignKey: "idObjetivoEspecifico"});
  ObjetivoEspecifico.hasMany(ActividadObjetivoEspecifico, { as: "actividadObjetivoEspecificos", foreignKey: "idObjetivoEspecifico"});
  ActividadParticipanteSocial.belongsTo(ParticipanteSocial, { as: "idParticipanteSocialParticipanteSocial", foreignKey: "idParticipanteSocial"});
  ParticipanteSocial.hasMany(ActividadParticipanteSocial, { as: "actividadParticipanteSocials", foreignKey: "idParticipanteSocial"});
  Evaluacion.belongsTo(Propuesta, { as: "codigoPropuestaPropuestum", foreignKey: "codigoPropuesta"});
  Propuesta.hasMany(Evaluacion, { as: "evaluacions", foreignKey: "codigoPropuesta"});
  Geolocalizacion.belongsTo(Propuesta, { as: "codigoPropuestaPropuestum", foreignKey: "codigoPropuesta"});
  Propuesta.hasMany(Geolocalizacion, { as: "geolocalizacions", foreignKey: "codigoPropuesta"});
  Integrante.belongsTo(Propuesta, { as: "codigoPropuestaPropuestum", foreignKey: "codigoPropuesta"});
  Propuesta.hasMany(Integrante, { as: "integrantes", foreignKey: "codigoPropuesta"});
  PropuestaCapacitacion.belongsTo(Propuesta, { as: "codigoPropuestaPropuestum", foreignKey: "codigoPropuesta"});
  Propuesta.hasMany(PropuestaCapacitacion, { as: "propuestaCapacitacions", foreignKey: "codigoPropuesta"});
  PropuestaInstitucion.belongsTo(Propuesta, { as: "codigoPropuestaPropuestum", foreignKey: "codigoPropuesta"});
  Propuesta.hasMany(PropuestaInstitucion, { as: "propuestaInstitucions", foreignKey: "codigoPropuesta"});
  PropuestaLineaTematica.belongsTo(Propuesta, { as: "codigoPropuestaPropuestum", foreignKey: "codigoPropuesta"});
  Propuesta.hasMany(PropuestaLineaTematica, { as: "propuestaLineaTematicas", foreignKey: "codigoPropuesta"});
  PropuestaPalabraClave.belongsTo(Propuesta, { as: "codigoPropuestaPropuestum", foreignKey: "codigoPropuesta"});
  Propuesta.hasMany(PropuestaPalabraClave, { as: "propuestaPalabraClaves", foreignKey: "codigoPropuesta"});
  PropuestaPrevia.belongsTo(Propuesta, { as: "codigoPropuestaPropuestum", foreignKey: "codigoPropuesta"});
  Propuesta.hasMany(PropuestaPrevia, { as: "propuestaPrevia", foreignKey: "codigoPropuesta"});
  PropuestaPrevia.belongsTo(Propuesta, { as: "codigoPropuestaPreviaPropuestum", foreignKey: "codigoPropuestaPrevia"});
  Propuesta.hasMany(PropuestaPrevia, { as: "codigoPropuestaPreviaPropuestaPrevia", foreignKey: "codigoPropuestaPrevia"});
  PropuestaProgramaExtension.belongsTo(Propuesta, { as: "codigoPropuestaPropuestum", foreignKey: "codigoPropuesta"});
  Propuesta.hasMany(PropuestaProgramaExtension, { as: "propuestaProgramaExtensions", foreignKey: "codigoPropuesta"});
  PropuestaRelacionada.belongsTo(Propuesta, { as: "codigoPropuestaRelacionadaPropuestum", foreignKey: "codigoPropuestaRelacionada"});
  Propuesta.hasMany(PropuestaRelacionada, { as: "propuestaRelacionadas", foreignKey: "codigoPropuestaRelacionada"});
  PropuestaRelacionada.belongsTo(Propuesta, { as: "codigoPropuestaPropuestum", foreignKey: "codigoPropuesta"});
  Propuesta.hasMany(PropuestaRelacionada, { as: "codigoPropuestaPropuestaRelacionadas", foreignKey: "codigoPropuesta"});
  RolIntegrante.belongsTo(Rol, { as: "idRolIntegranteRol", foreignKey: "idRolIntegrante"});
  Rol.hasMany(RolIntegrante, { as: "rolIntegrantes", foreignKey: "idRolIntegrante"});
  Evaluacion.belongsTo(TipoEvaluacion, { as: "idTipoEvaluacionTipoEvaluacion", foreignKey: "idTipoEvaluacion"});
  TipoEvaluacion.hasMany(Evaluacion, { as: "evaluacions", foreignKey: "idTipoEvaluacion"});


  return {
    ActividadObjetivoEspecifico: ActividadObjetivoEspecifico,
    ActividadParticipanteSocial: ActividadParticipanteSocial,
    Evaluacion: Evaluacion,
    EvaluacionItem: EvaluacionItem,
    Geolocalizacion: Geolocalizacion,
    Integrante: Integrante,
    ObjetivoEspecifico: ObjetivoEspecifico,
    ParticipanteSocial: ParticipanteSocial,
    Propuesta: Propuesta,
    PropuestaCapacitacion: PropuestaCapacitacion,
    PropuestaInstitucion: PropuestaInstitucion,
    PropuestaLineaTematica: PropuestaLineaTematica,
    PropuestaPalabraClave: PropuestaPalabraClave,
    PropuestaPrevia: PropuestaPrevia,
    PropuestaProgramaExtension: PropuestaProgramaExtension,
    PropuestaRelacionada: PropuestaRelacionada,
    Rol: Rol,
    RolIntegrante: RolIntegrante,
    TipoEvaluacion: TipoEvaluacion,
  };
}
