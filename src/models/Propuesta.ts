import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import { PropuestaInstitucion, PropuestaInstitucionAttributes, PropuestaInstitucionCreationAttributes } from './PropuestaInstitucion';
import { Institucion, InstitucionAttributes } from './Institucion';
import { Integrante, IntegranteAttributes, IntegranteCreationAttributes } from './Integrante';
import { PersonaAttributes } from './Persona';
import { ObjetivoEspecifico, ObjetivoEspecificoAttributes } from './ObjetivoEspecifico';
import { ActividadObjetivoEspecificoAttributes } from './ActividadObjetivoEspecifico';
import { PropuestaPrevia, PropuestaPreviaAttributes } from './PropuestaPrevia';
import { PropuestaRelacionada, PropuestaRelacionadaAttributes } from './PropuestaRelacionada';
import { UbicacionProblematica, UbicacionProblematicaAttributes } from './UbicacionProblematica';
import { PropuestaProgramaExtension, PropuestaProgramaExtensionAttributes } from './PropuestaProgramaExtension';
import { PropuestaCapacitacion, PropuestaCapacitacionAttributes } from './PropuestaCapacitacion';
import { PropuestaLineaTematica, PropuestaLineaTematicaAttributes } from './PropuestaLineaTematica';
import { PropuestaPalabraClave } from './PropuestaPalabraClave';
import { indexar, indexarAsociacion, indexarJsons, splitNuevosRegistros } from '../helpers/general';
import { PalabraClave, PalabraClaveAttributes, PalabraClaveCreationAttributes, PalabraClaveId } from './PalabraClave';
import { Ubicacion, UbicacionAttributes, UbicacionId } from './Ubicacion';
import { ProgramaSIPPEId } from './ProgramaSIPPE';
import { CapacitacionId } from './Capacitacion';
import { LineaTematicaId } from './LineaTematica';
import { RolIntegrante } from './RolIntegrante';
import { RolId } from './Rol';


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

      const selectRoles = lIntegrantes.map( async integrante =>  await integrante.verRoles(sequelize,transaction) );

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

    salida.finalidad = this.planificacionFinalidad || '';
    salida.objetivoGeneral = this.planificacionObjetivoGeneral || '';

    const lObjetivosEspecificos = await ObjetivoEspecifico.initModel(sequelize).findAll({ transaction });

    if(lObjetivosEspecificos.length) {
      const dataObjetivosEspecificos = lObjetivosEspecificos.map(async objEsp => ({...objEsp, lActividades : await objEsp.verActividades(sequelize,transaction)}))
      
      salida.lObjetivosEspecificos = await Promise.all(dataObjetivosEspecificos);

    }

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

  public async editarPalabrasClave(data : PalabraClaveCreationAttributes[] ,sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction) :
  Promise<boolean> {
    let salida : boolean = false;
    
    try {
      const splitData = splitNuevosRegistros(data,'idPalabraClave');
      let palabrasNuevas : PalabraClaveAttributes[] = [];
      if(splitData['NUEVOS'].length){
        const desde : PalabraClaveId = await PalabraClave.max('idPalabraClave',{transaction});
        await PalabraClave.initModel(sequelize).bulkCreate(splitData['NUEVOS'],{transaction});
        palabrasNuevas = await PalabraClave.findAll({where : { idPalabraClave : { [Sequelize.Op.gt ]: desde } }});

      }

      await PropuestaPalabraClave.bulkCreate(
        [...palabrasNuevas,splitData['viejos']].map( 
          palabra => ({
            idPalabraClave : palabra.idPalabraClave, 
            codigoPropuesta : this.codigoPropuesta
          }) ),{
            transaction,
            ignoreDuplicates : true
          });
      salida = true;
    } catch (error) {
      console.log(error);
    }
    
    return salida;
  }

  public async editarProgramasExtension( data : ProgramaSIPPEId[], sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction):
  Promise<void>{

    const asociarProgramas = PropuestaProgramaExtension.initModel(sequelize).bulkCreate(
      data.map( progId => ({ codigoPropuesta : this.codigoPropuesta, idProgramaExtension : progId }) ),
      {
        ignoreDuplicates : true,
        transaction
      }
    );

    const darDeBajaDescartados = PropuestaProgramaExtension.destroy({
      where : {
        codigoPropuesta : this.codigoPropuesta,
        idProgramaExtension : {
          [Sequelize.Op.not] : data
        } 
      },
      transaction
    });

    await asociarProgramas;
    await darDeBajaDescartados;
  }

  public async editarCapacitaciones( data : CapacitacionId[], sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction):
  Promise<void>{

    const asociarCapactiaciones = PropuestaCapacitacion.initModel(sequelize).bulkCreate(
      data.map( capacId => ({ codigoPropuesta : this.codigoPropuesta, idCapacitacion : capacId }) ),
      {
        ignoreDuplicates : true,
        transaction
      }
    );

    const darDeBajaDescartados = PropuestaCapacitacion.destroy({
      where : {
        codigoPropuesta : this.codigoPropuesta,
        idCapacitacion : {
          [Sequelize.Op.not] : data
        } 
      },
      transaction
    });

    await asociarCapactiaciones;
    await darDeBajaDescartados;
  }
  public async editarLineasTematicas( data : LineaTematicaId[], sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction):
  Promise<void>{

    const asociarLineasTematicas = PropuestaLineaTematica.initModel(sequelize).bulkCreate(
      data.map( progId => ({ codigoPropuesta : this.codigoPropuesta, idLineaTematica : progId }) ),
      {
        ignoreDuplicates : true,
        transaction
      }
    );

    const darDeBajaDescartados = PropuestaLineaTematica.destroy({
      where : {
        codigoPropuesta : this.codigoPropuesta,
        idLineaTematica : {
          [Sequelize.Op.not] : data
        } 
      },
      transaction
    });

    await asociarLineasTematicas;
    await darDeBajaDescartados;
  }

  public async editarIntegrantes( data : (IntegranteCreationAttributes & {lRoles : RolId[]})[], sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction ) : 
  Promise<void> {

    const dataIndexada = indexarJsons(data,'nroDoc');

    if(data.length) {

      const actualizarIntegrantes = Integrante.initModel(sequelize).bulkCreate(
        data,
        {
          updateOnDuplicate : [
            'categoriaDocente',
            'dedicacionDocente',
            'idAreaUnl',
            'idCarrera',
            'observ',
            'periodoLectivo',
            'tieneTarjeta',
            'tipoIntegrante',
            'titulo',
            'updatedAt',
            'deletedAt'
          ],
          transaction 
        }
      );

      const darDeBajaDuplicados = Integrante.initModel(sequelize).destroy({
        where : {
          codigoPropuesta : this.codigoPropuesta,
          nroDoc : {
            [Sequelize.Op.not] : data.map( integrante => integrante.nroDoc)
          }
        },
        transaction
      });

      await actualizarIntegrantes;
      await darDeBajaDuplicados;

      const integrantesEditados = await Integrante.initModel(sequelize).findAll({
        where : {
          codigoPropuesta : this.codigoPropuesta,
          nroDoc : data.map( integ => integ.nroDoc )
        },  
        transaction
      })

      const acutalizarRoles = integrantesEditados.map(async integ =>await integ.editarRoles(dataIndexada[integ.nroDoc].lRoles,sequelize,transaction));

      await Promise.all(acutalizarRoles);
    }

  }

  public async editarInstituciones( data : PropuestaInstitucionCreationAttributes[], sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction  ) : 
  Promise< void >{
    if(data.length){
        const asociarInstituciones = PropuestaInstitucion.initModel(sequelize).bulkCreate(
          data,
          {
            updateOnDuplicate : ['antecedentes','valoracion','updatedAt','deletedAt'],
            transaction
          }
        );
        const darDeBajaDuplicados = PropuestaInstitucion.initModel(sequelize).destroy({
          where : {
            codigoPropuesta : this.codigoPropuesta,
            idInstitucion : {
              [Sequelize.Op.not] : data.map( inst => inst.idInstitucion)
            }
          },
          transaction
        });
        await asociarInstituciones;
        await darDeBajaDuplicados;
    }
  }

  public async editarGeolocalizaciones(data : UbicacionAttributes[] ,sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction) :
  Promise<boolean> {
    let salida : boolean = false;
    
    try {
      const splitData = splitNuevosRegistros(data,'idPalabraClave');
      let geolocalizacionesNuevas : UbicacionAttributes[] = [];
      if(splitData['NUEVOS'].length){

        const desde : UbicacionId = await Ubicacion.max('idUbicacion',{transaction});

        await Ubicacion.initModel(sequelize).bulkCreate(splitData['NUEVOS'],{transaction});

        geolocalizacionesNuevas = await Ubicacion.findAll({where : { idUbicacion : { [Sequelize.Op.gt ]: desde } }});

      }

      await UbicacionProblematica.bulkCreate(
        [...geolocalizacionesNuevas,splitData['VIEJOS']].map( 
          ubicacion => ({
            idUbicacion : ubicacion.idUbicacion, 
            codigoPropuesta : this.codigoPropuesta
          }) 
        ),
        {
            transaction,
            ignoreDuplicates : true
        }
      );

      salida = true;
    } catch (error) {
      console.log('Error - Propuesta.editarGeolocalizaciones');
      throw error;
    }
    
    return salida;
  }

  public async editarPlanificacion(data : PlanificacionAttributes, sequelize : Sequelize.Sequelize, transaction ?: Sequelize.Transaction) :
  Promise<void>{

    this.set('planificacionFinalidad',data.finalidad);
    this.set('planificacionObjetivoGeneral',data.objetivoGeneral);


    const actualizarObjetivos = data.lObjetivosEspecificos.map(
      async obj => {
        
        const iObjetivo = await ObjetivoEspecifico.initModel(sequelize).create(
          {
            ...obj,
            codigoPropuesta : this.codigoPropuesta
          },
          {
            transaction
          }
        );
        await iObjetivo.editarActividades(obj.lActividades,sequelize,transaction);

      }
    );

    const darDeBajaSobrantes =  ObjetivoEspecifico.initModel(sequelize).destroy({
      where : {
         codigoPropuesta : this.codigoPropuesta,
         idObjetivoEspecifico : {
          [Sequelize.Op.not] : data.lObjetivosEspecificos.map( (obj) => obj.idObjetivoEspecifico)
        }
      },
      transaction
    });

    await Promise.all(actualizarObjetivos);

    await darDeBajaSobrantes;


    
    
    

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
