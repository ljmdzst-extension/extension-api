import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import { Integrante, IntegranteAttributes, IntegranteCreationAttributes, IntegranteId } from './Integrante';
import { 
  PropuestaInstitucion, 
  PropuestaInstitucionAttributes, 
  PropuestaInstitucionCreationAttributes, 
  PropuestaInstitucionId} from './PropuestaInstitucion';
import { RolId } from './Rol';
import { ObjetivoEspecifico, ObjetivoEspecificoAttributes, ObjetivoEspecificoCreationAttributes } from './ObjetivoEspecifico';
import { ActividadObjetivoEspecificoAttributes, ActividadObjetivoEspecificoCreationAttributes } from './ActividadObjetivoEspecifico';
import { PropuestaRelacionada, PropuestaRelacionadaAttributes, PropuestaRelacionadaCreationAttributes } from './PropuestaRelacionada';
import { PropuestaPrevia, PropuestaPreviaAttributes, PropuestaPreviaCreationAttributes } from './PropuestaPrevia';
import { PropuestaProgramaExtension, PropuestaProgramaExtensionAttributes } from './PropuestaProgramaExtension';
import { PropuestaLineaTematica, PropuestaLineaTematicaAttributes } from './PropuestaLineaTematica';
import { PropuestaCapacitacion, PropuestaCapacitacionAttributes } from './PropuestaCapacitacion';
import { PropuestaPalabraClave, PropuestaPalabraClaveAttributes } from './PropuestaPalabraClave';
import { Geolocalizacion, GeolocalizacionAttributes } from './Geolocalizacion';


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
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export type PlanificacionAttributes = {
  lObjetivosEspecificos : (ObjetivoEspecificoAttributes & {lActividades : ActividadObjetivoEspecificoAttributes[] })[]
}

export type PropuestaPk = "codigoPropuesta";
export type PropuestaId = Propuesta[PropuestaPk];
export type PropuestaOptionalAttributes = "duracion" | "categoriaEquipo" | "integralidad" | "problematicaDetalle" | "problematicaSintesis" | "proyectosCaid" | "propuestaMetodologica" | "accionesCoordinacion" | "politicasPublicas" | "accionesComunicacion" | "integralidadDescripcion" | "sustentabilidad" | "sintesis" | "tipoMateriales" | "capacitacionAgentesMultip" | "perfilAgentesMultip" | "solicitaBecarioJustif" | "solicitaVoluntarioJustif" | "instanciasCapacitacionDetalle" | "solicitaBecario" | "ipFinalidad" | "ipParticipantesSociales" | "ipObserv" | "ipPotencialesActividades" | "ipCampoTematico" | "ipPoliticasPublicas" | "ipProblematica" | "planificacionFinalidad" | "planificacionObjetivoGeneral" | "createdAt" | "updatedAt" | "deletedAt";
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
  
  createdAt!: Date;
  updatedAt!: Date;
  deletedAt?: Date;


  // propuestas relacionadas

  public async altaPropuestaRelacionada (  data : PropuestaRelacionadaCreationAttributes, sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction )
  : Promise<PropuestaRelacionadaAttributes> {

    const [iPropRelacionada , creada] = await PropuestaRelacionada.initModel(sequelize).findOrCreate({
        defaults : data,
        where : data,
        paranoid : false,
        transaction
      })
    if(creada) {
      await iPropRelacionada.restore({transaction});
    }

    return iPropRelacionada.dataValues;
  }
  public async verPropuestasRelacionadas (sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction )
  : Promise<PropuestaRelacionadaAttributes[]>{
    return await PropuestaRelacionada.initModel(sequelize).findAll({ where : { codigoPropuesta : this.codigoPropuesta}, transaction })
  }
  // propuestas previas

  public async altaPropuestaPrevia (  data : PropuestaPreviaCreationAttributes, sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction )
  : Promise<PropuestaPreviaAttributes> {

    const [iPropPrevia, creada] = await PropuestaPrevia.initModel(sequelize).findOrCreate({
        defaults : data,
        where : data,
        paranoid : false,
        transaction
      });

    if(creada) {
      await iPropPrevia.restore({transaction});
    }

    return iPropPrevia.dataValues;
  }
  public async verPropuestasPrevias (sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction )
  : Promise<PropuestaPreviaAttributes[]>{
    return await PropuestaPrevia.initModel(sequelize).findAll({ where : { codigoPropuesta : this.codigoPropuesta}, transaction })
  }
  // integrantes

  public async altaIntegrante ( data : IntegranteCreationAttributes, sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction  ) 
  : Promise<IntegranteCreationAttributes> {

    let salida : IntegranteCreationAttributes = { nroDoc : '', codigoPropuesta : '' }

    const [iIntegrante, creado ] = await Integrante.initModel(sequelize).findOrCreate({
      defaults : data , 
      where : {
        nroDoc : data.nroDoc , 
        codigoPropuesta : this.codigoPropuesta
      },
      paranoid: false,
      transaction
    });

    if(!creado) {
      await iIntegrante.restore({transaction});
      await iIntegrante.update({...data},{transaction});
    }

    salida = iIntegrante.dataValues;

    return salida;

  }

  public async bajaIntegrante ( data : IntegranteId , sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction ) 
  : Promise<boolean> {
    let salida : boolean = false;

    const cantRegistros = await Integrante.initModel(sequelize).destroy({where : {nroDoc : data },transaction});

    if(cantRegistros) {

      salida = true;

    }

    return salida;
  }

  public async editarIntegrante ( data : IntegranteCreationAttributes, sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction ) 
  : Promise<IntegranteAttributes> {
    let salida : IntegranteAttributes = { nroDoc : '', codigoPropuesta : '' , createdAt : new Date(), updatedAt : new Date() }
    

    const iIntegrante = await Integrante.initModel(sequelize).findOne( { 
      where : {
        nroDoc : data.nroDoc,
        codigoPropuesta : this.codigoPropuesta
      },
      transaction  
    } );

    if(!iIntegrante ) throw { status : 400 , message : 'No existe un usuario con ese documento.' }

    await iIntegrante.update(data,{transaction});
    
    salida = iIntegrante.dataValues;
    
    return salida;
  }

  public async verIntegrantes (sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction) 
  : Promise<IntegranteAttributes[]> {
    
    let salida : IntegranteAttributes[] = [];
    // const { createdAt,updatedAt,deletedAt,...atributosLista } = Integrante.prototype.dataValues;
    salida = await Integrante.initModel(sequelize).findAll({
      // attributes : Object.keys(atributosLista),
      where : {
        codigoPropuesta : this.codigoPropuesta
      },
      transaction
    })
    
    
    return salida;

  }

  public async verIntegrante ( data : IntegranteId , sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction ) 
  : Promise<IntegranteAttributes> {
    let salida : IntegranteAttributes = { nroDoc : '', codigoPropuesta : '' , createdAt : new Date(), updatedAt : new Date() }

    const iIntegrante = await Integrante.initModel(sequelize).findOne({ where : {nroDoc : data, codigoPropuesta : this.codigoPropuesta},transaction })

    if(iIntegrante) {
      salida = iIntegrante.dataValues;
    }
    return salida ;
  }

  // instituciones

  public async altaInstitucion ( data : PropuestaInstitucionCreationAttributes , sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction) 
  : Promise<PropuestaInstitucionCreationAttributes> {

    let salida : PropuestaInstitucionCreationAttributes = { idInstitucion : 0, codigoPropuesta : '' }

    const iInstitucion = await PropuestaInstitucion.initModel(sequelize).create(data);

    salida = iInstitucion.dataValues;
    

    return salida;

  }

  public async bajaInstitucion ( data : PropuestaInstitucionId, sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction) 
  : Promise<boolean> {

    let salida = false;

    const cantEliminados = await PropuestaInstitucion.initModel(sequelize).destroy({
      where : { 
        idInstitucion : data , 
        codigoPropuesta : this.codigoPropuesta
      },
      transaction
    });

    if(cantEliminados > 0 ) {
      salida = true;
    }

    return salida;

  }

  public async verInstitucion ( data : PropuestaInstitucionId, sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction)
  : Promise<PropuestaInstitucionAttributes>{
    
    let salida : PropuestaInstitucionAttributes = { idInstitucion : 0, codigoPropuesta : '', createdAt : new Date(), updatedAt : new Date() }

    const iInstitucion = await PropuestaInstitucion.initModel(sequelize).findOne({
      where : {
        idInstitucion : data,
        codigoPropuesta : this.codigoPropuesta
      },
      transaction
    });

    if(iInstitucion) {
      salida = iInstitucion.dataValues;
    }

    return salida;
  }

  public async verInstituciones(sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction )
  : Promise<PropuestaInstitucionAttributes[]> {
    let salida : PropuestaInstitucionAttributes[] = [];

    // const { createdAt,updatedAt,deletedAt,...atributosLista } = PropuestaInstitucion.prototype.dataValues;
    const listaInstituciones = await PropuestaInstitucion.initModel(sequelize).findAll({
      // attributes : Object.keys(atributosLista),
      where : {
        codigoPropuesta : this.codigoPropuesta
      },
      transaction
    })
    if(listaInstituciones.length > 0){
      salida = listaInstituciones;
    }
    return salida;
  }

  // planificacion

  public async altaObjetivoEspecifico ( data : ObjetivoEspecificoCreationAttributes , sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction )
  :Promise<ObjetivoEspecificoAttributes> {

    let salida : ObjetivoEspecificoAttributes = { 
      idObjetivoEspecifico : 0, 
      codigoPropuesta : '' , 
      createdAt : new Date(), 
      updatedAt : new Date()
    };

    const iObjetivo = await ObjetivoEspecifico.initModel(sequelize).create(data,{transaction});

    salida = iObjetivo.dataValues;

    return salida;
  }

  public async verPlanificacion (  sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction ) 
  : Promise<PlanificacionAttributes>{

    let salida : PlanificacionAttributes = {
      lObjetivosEspecificos : []
    }
  
    const lObjetivos = await ObjetivoEspecifico.initModel(sequelize).findAll({
      where : { 
        codigoPropuesta : this.codigoPropuesta 
      }, 
      transaction
    });
    
    if(lObjetivos.length) {
      salida.lObjetivosEspecificos = await Promise.all(
        lObjetivos.map( async iObjetivo =>({
          ...iObjetivo.dataValues,
          lActividades : await iObjetivo.verActividades(sequelize,transaction)
        }))
    
      )
    }

   

    return salida;

  }

  // datos generales

  public async asociarProgramasExtension ( data : number[], sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction )
  : Promise< PropuestaProgramaExtensionAttributes[]> {

    let salida : PropuestaProgramaExtensionAttributes[] = [];

    await PropuestaProgramaExtension.initModel(sequelize).destroy({
      where : {
        codigoPropuesta : this.codigoPropuesta,
        idProgramaExtension : {
          [Sequelize.Op.not] : data
        }
      },
      transaction
    });

    await PropuestaProgramaExtension.initModel(sequelize).bulkCreate(
      data.map( idProgExt => ({
        idProgramaExtension : idProgExt, 
        codigoPropuesta : this.codigoPropuesta, 
        createdAt : new Date(Date.now()),
        updatedAt : new Date(Date.now()),
        deletedAt : undefined
      }) ),
      {
        updateOnDuplicate : ['updatedAt','deletedAt'],
        transaction
      }
    )



    return salida;

  }

  public async verProgramasExtension ( sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction )
  :Promise< PropuestaProgramaExtensionAttributes[]> {
    return await PropuestaProgramaExtension.initModel(sequelize).findAll({ where : { codigoPropuesta : this.codigoPropuesta }, transaction});
  }
  public async verLineasTematicas ( sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction )
  :Promise< PropuestaLineaTematicaAttributes[]> {
    return await PropuestaLineaTematica.initModel(sequelize).findAll({ where : { codigoPropuesta : this.codigoPropuesta }, transaction});
  }
  public async verCapacitaciones ( sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction )
  :Promise< PropuestaCapacitacionAttributes[]> {
    return await PropuestaCapacitacion.initModel(sequelize).findAll({ where : { codigoPropuesta : this.codigoPropuesta }, transaction});
  }
  public async verPalabrasClave ( sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction )
  :Promise< PropuestaPalabraClaveAttributes[]> {
    return await PropuestaPalabraClave.initModel(sequelize).findAll({ where : { codigoPropuesta : this.codigoPropuesta }, transaction});
  }
  public async verGeolocalizaciones ( sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction )
  :Promise< GeolocalizacionAttributes[]> {
    return await Geolocalizacion.initModel(sequelize).findAll({ where : { codigoPropuesta : this.codigoPropuesta }, transaction});
  }
  

  // mensajes puente

  public async altaActividadObjetivoEspecifico ( data : ActividadObjetivoEspecificoCreationAttributes , sequelize : Sequelize.Sequelize , transaction ?: Sequelize.Transaction)
  : Promise<ActividadObjetivoEspecificoAttributes> {

    let salida : ActividadObjetivoEspecificoAttributes = { idObjetivoEspecifico : 0, idActividadObjetivoEspecifico : 0, createdAt : new Date(), updatedAt : new Date() }

    const iObjetivo = await ObjetivoEspecifico.findByPk(data.idObjetivoEspecifico);

    if(iObjetivo){
      salida = await iObjetivo.altaActividad( data,sequelize,transaction );
    }

    return salida;
  }
  
  public async asignarRol ( data : { nroDoc : IntegranteId , rol : RolId }, sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction )
  : Promise<boolean> {
    let salida = false;

    const iIntegrante = await Integrante.initModel(sequelize).findOne({ 
      where : {
        nroDoc : data.nroDoc,
        codigoPropuesta : this.codigoPropuesta
      },
      transaction 
    });

    if(iIntegrante){
      salida = await iIntegrante.asignarRol( data.rol, sequelize, transaction )
    }

    return salida;
  }
  

  //--------------------------------------------------------------------

  static initModel(sequelize: Sequelize.Sequelize): typeof Propuesta {
    return Propuesta.init({
    codigoPropuesta: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    idUsuario: {
      type: DataTypes.STRING(255),
      allowNull: false
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
    },
    createdAt : {
      type : DataTypes.DATE,
      allowNull : false
    },
    updatedAt : {
      type : DataTypes.DATE,
      allowNull : false
    },
    deletedAt : {
      type : DataTypes.DATE,
      allowNull : true
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
        name: "codigo_UNIQUE",
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
