import * as Sequelize from 'sequelize';
import { DataTypes, Model } from 'sequelize';
import { AreaPrograma } from './AreaPrograma';
import { Programa, ProgramaId } from './Programa';
import { Area, AreaId } from './Area';
import { domain } from '../../../../domain';

export interface AreaProgramaUsuarioAttributes {
  idArea: number;
  idPrograma: number;
  anio : number;
  idUsuario : string;
}

export type AreaProgramaUsuarioPk = "idArea" | "idPrograma" | "anio" ;
export type AreaProgramaUsuarioId = AreaProgramaUsuario[AreaProgramaUsuarioPk];
export type AreaProgramaUsuarioCreationAttributes = AreaProgramaUsuarioAttributes;


type T_ANIO = number;

export class AreaProgramaUsuario extends Model<AreaProgramaUsuarioAttributes, AreaProgramaUsuarioCreationAttributes> implements AreaProgramaUsuarioAttributes {
  idArea!: number;
  idPrograma!: number;
  anio !: number;
  idUsuario !: string;

  static async buscarPorUsuario( idUsuario : string , transaction ?: Sequelize.Transaction ) : Promise< domain.PeriodoDeTrabajo[] > {
    let salida : domain.PeriodoDeTrabajo[] = [];

    const cDbAreaProgramaUsuario =  await AreaProgramaUsuario.findAll({where : {idUsuario }, transaction});

    const cAreas = await AreaPrograma.buscarAreas( [...new Set(cDbAreaProgramaUsuario.map( (({idArea})=>idArea) )).values()], transaction );

    const cProgramas = await AreaPrograma.buscarProgramas( [...new Set(cDbAreaProgramaUsuario.map( (({idPrograma})=>idPrograma) )).values()], transaction );
    
    cDbAreaProgramaUsuario.forEach( dbapu => {
        if( ! salida.find( ph => ph.verDatos().anio === dbapu.anio ) ){
           salida.push( new domain.PeriodoDeTrabajo( dbapu.anio, [] ) );
        }
    });

    cDbAreaProgramaUsuario.forEach( dbapu => {
       const progHabilitados = salida.find( ph => ph.verDatos().anio === dbapu.anio);
       const nuevoProg = cProgramas.find( p => p.idPrograma === dbapu.idPrograma );
       if(progHabilitados && nuevoProg ) {

          progHabilitados.altaPrograma( new domain.Programa({...nuevoProg.dataValues,listaAreas : []},[]) );
       }
    })

    cDbAreaProgramaUsuario.forEach( dbapu => {
      const progHabilitados = salida.find( ph => ph.verDatos().anio === dbapu.anio);
      const nuevaArea = cAreas.find( p => p.idArea === dbapu.idArea );
      if(progHabilitados && nuevaArea){
        progHabilitados.altaAreaHabilitada( dbapu.idPrograma, new domain.Area(nuevaArea.dataValues) );

      }
    })

    return salida;
  }

  static async verLista(  transaction ?: Sequelize.Transaction ) : Promise< domain.PeriodoDeTrabajo[] > {
    let salida : domain.PeriodoDeTrabajo[] = [];

    const cDbAreaProgramaUsuario =  await AreaProgramaUsuario.findAll({transaction});

    const cAreas = await AreaPrograma.buscarAreas( [...new Set(cDbAreaProgramaUsuario.map( (({idArea})=>idArea) )).values()], transaction );

    const cProgramas = await AreaPrograma.buscarProgramas( [...new Set(cDbAreaProgramaUsuario.map( (({idPrograma})=>idPrograma) )).values()], transaction );
    
    cDbAreaProgramaUsuario.forEach( dbapu => {
        if( ! salida.find( ph => ph.verDatos().anio === dbapu.anio ) ){
           salida.push( new domain.PeriodoDeTrabajo( dbapu.anio, [] ) );
        }
    });

    cDbAreaProgramaUsuario.forEach( dbapu => {
       const progHabilitados = salida.find( ph => ph.verDatos().anio === dbapu.anio);
       const nuevoProg = cProgramas.find( p => p.idPrograma === dbapu.idPrograma );
       if(progHabilitados && nuevoProg ) {

          progHabilitados.altaPrograma( new domain.Programa({...nuevoProg.dataValues,listaAreas : []},[]) );
       }
    })

    cDbAreaProgramaUsuario.forEach( dbapu => {
      const progHabilitados = salida.find( ph => ph.verDatos().anio === dbapu.anio);
      const nuevaArea = cAreas.find( p => p.idArea === dbapu.idArea );
      if(progHabilitados && nuevaArea){
        progHabilitados.altaAreaHabilitada( dbapu.idPrograma, new domain.Area(nuevaArea.dataValues) );

      }
    })

    return salida;
  }


  static initModel(sequelize: Sequelize.Sequelize): typeof AreaProgramaUsuario {
    return AreaProgramaUsuario.init({
    idArea: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Area',
        key: 'idArea'
      }
    },
    idPrograma: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Programa',
            key: 'idPrograma'
        }
    },
    anio : {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Area',
          key: 'anio'
        }
    },
  
    idUsuario : {
        type : DataTypes.STRING(255),
        allowNull : false,
        primaryKey : true,
        references : {
          model : `CategoriaUsuario`,
          key : `idUsuario`
        }
      }
  }, {
    sequelize,
    tableName: 'AreaProgramaUsuario',
    timestamps: true,
    paranoid : true
  });
  }
}
