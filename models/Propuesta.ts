import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import { PropuestaInstitucion, PropuestaInstitucionAttributes, PropuestaInstitucionCreationAttributes } from './PropuestaInstitucion';
import { Institucion, InstitucionAttributes } from './Institucion';
import { Integrante, IntegranteAttributes } from './Integrante';
import { Persona, PersonaAttributes } from './Persona';
import { ObjetivoEspecificoAttributes } from './ObjetivoEspecifico';
import { ActividadObjetivoEspecificoAttributes } from './ActividadObjetivoEspecifico';
import { PropuestaPrevia, PropuestaPreviaAttributes } from './PropuestaPrevia';
import { PropuestaRelacionada, PropuestaRelacionadaAttributes } from './PropuestaRelacionada';
import { UbicacionProblematica, UbicacionProblematicaAttributes } from './UbicacionProblematica';
import { PropuestaProgramaExtension, PropuestaProgramaExtensionAttributes } from './PropuestaProgramaExtension';
import { PropuestaCapacitacion, PropuestaCapacitacionAttributes } from './PropuestaCapacitacion';
import { PropuestaLineaTematica, PropuestaLineaTematicaAttributes } from './PropuestaLineaTematica';
import { PropuestaPalabraClave, PropuestaPalabraClaveAttributes } from './PropuestaPalabraClave';
import { indexar, indexarAsociacion } from '../helpers/general';
import { PalabraClave, PalabraClaveAttributes } from './PalabraClave';
import { UbicacionAttributes } from './Ubicacion';


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

export interface PlanificacionAttributes {
  finalidad : string,
  objetivoGeneral : string,
  lObjetivosEspecificos : ( ObjetivoEspecificoAttributes & { lActividades : ActividadObjetivoEspecificoAttributes[]} )[]
}

export type PropuestaPk = "codigoPropuesta";
export type PropuestaId = Propuesta[PropuestaPk];
export type PropuestaOptionalAttributes = "duracion" | "categoriaEquipo" | "integralidad" | "problematicaDetalle" | "problematicaSintesis" | "proyectosCAID" | "propuestaMetodologica" | "accionesCoordinacion" | "politicasPublicas" | "accionesComunicacion" | "integralidadDescripcion" | "sustentabilidad" | "sintesis" | "tipoMateriales" | "capacitacionAgentesMultip" | "perfilAgentesMultip" | "solicitaBecarioJustif" | "solicitaVoluntarioJustif" | "instanciasCapacitacionDetalle" | "solicitaBecario" | "ipFinalidad" | "ipParticipantesSociales" | "ipObserv" | "ipPotencialesActividades" | "ipCampoTematico" | "ipPoliticasPublicas" | "ipProblematica" | "planificacionFinalidad" | "planificacionObjetivoGeneral";
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
      
      const lInstitucionesIndexado : any = indexar(lInstituciones,'idInstitucion');

      salida = lInstitucionesRelacionadas.map( inst => ({ 
        ...inst.dataValues,
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

      const selectPersonas = lIntegrantes.map(integrante => integrante.verPersona(sequelize,transaction));

      const selectRoles = lIntegrantes.map( integrante => integrante.verRoles(sequelize,transaction) );

      const lPersonas = await Promise.all( selectPersonas);
      const lRoles = await Promise.all(selectRoles);

      const lPersonasIndexado : any = indexar(lPersonas,'nroDoc');
      const lRolesIndexado : any = indexarAsociacion(lRoles,'nroDoc');

      salida =  lIntegrantes.map(  integrante => ({ 
        ...integrante.dataValues,
        ...lPersonasIndexado[integrante.nroDoc],
        lRoles : lRolesIndexado[integrante.nroDoc]
      }) )

     
    }
   

    return salida;
  }
  public async verPlanificacion( sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction) : 
  Promise<PlanificacionAttributes> {
    let salida : PlanificacionAttributes  = {
      finalidad : '',
      objetivoGeneral : '',
      lObjetivosEspecificos : []
    };
    return salida;
  }
  public async verPropuestasPrevias( sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction) : 
  Promise<PropuestaPreviaAttributes[]> {
    return await PropuestaPrevia.initModel(sequelize).findAll({where : {codigoPropuesta : this.codigoPropuesta},transaction});
  }
  public async verPropuestasRelacionadas( sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction) : 
  Promise<PropuestaRelacionadaAttributes[]> {
    return await PropuestaRelacionada.initModel(sequelize).findAll({where : {codigoPropuesta : this.codigoPropuesta},transaction});
  }
  public async verGeolocalizaciones( sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction) : 
  Promise<UbicacionAttributes[]> {
    let salida : UbicacionAttributes[] =[];
    const geolocalizacionesAsociadas = await UbicacionProblematica.initModel(sequelize).findAll({where : {codigoPropuesta : this.codigoPropuesta},transaction});;
    const lGeolocalizaciones = geolocalizacionesAsociadas.map(async item => await item.verDatos(sequelize,transaction));

    (await Promise.all(lGeolocalizaciones)).forEach(item => item !== null ? salida.push(item) : null);
    
    return salida;
  }
  public async verProgramasExtension( sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction) : 
  Promise<PropuestaProgramaExtensionAttributes[]> {
    return await PropuestaProgramaExtension.initModel(sequelize).findAll({where : {codigoPropuesta : this.codigoPropuesta},transaction});
  }
  public async verCapacitaciones( sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction) : 
  Promise<PropuestaCapacitacionAttributes[]> {
    return await PropuestaCapacitacion.initModel(sequelize).findAll({where : {codigoPropuesta : this.codigoPropuesta},transaction});
  }
  public async verLineasTematicas( sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction) : 
  Promise<PropuestaLineaTematicaAttributes[]> {
    return await PropuestaLineaTematica.initModel(sequelize).findAll({where : {codigoPropuesta : this.codigoPropuesta},transaction});
  }
  public async verPalabrasClave( sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction) : 
  Promise<PalabraClaveAttributes[]> {
    let salida : PalabraClaveAttributes[] = [];
    const lPalabrasAsociadas = await PropuestaPalabraClave.initModel(sequelize).findAll({
      where : {codigoPropuesta : this.codigoPropuesta},
      transaction
    });
    
    const lPalabrasClave = await PalabraClave.initModel(sequelize).findAll({
      where : {idPalabraClave : lPalabrasAsociadas.map( item => item.idPalabraClave )},
      transaction
    });
    salida = lPalabrasClave.map(palabra =>  palabra.dataValues);
    return salida;
  }

  public async editarPalabrasClave(data : PalabraClaveAttributes[] ,sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction) :
  Promise<PropuestaPalabraClaveAttributes[]> {
    let salida : PropuestaPalabraClaveAttributes[] = []

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
