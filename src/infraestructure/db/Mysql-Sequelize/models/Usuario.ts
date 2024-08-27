import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import { domain } from '../../../../domain';
import { MPersona } from './Persona';
import { CategoriaUsuario } from './CategoriaUsuario';
import { PermisoUsuario } from './PermisoUsuario';
import { AreaProgramaUsuario } from './AreaProgramaUsuario';

export interface UsuarioAttributes {
  idUsuario: string;
  nroDoc: string;
  email: string;
  pass: string;
  idUnidadAcademica: number;
  pendiente: number;
}

export type UsuarioPk = "idUsuario";
export type UsuarioId = Usuario[UsuarioPk];
export type UsuarioOptionalAttributes = "pendiente" ;
export type UsuarioCreationAttributes = Optional<UsuarioAttributes, UsuarioOptionalAttributes>;

export class Usuario extends Model<UsuarioAttributes, UsuarioCreationAttributes> implements UsuarioAttributes {

  idUsuario!: string;
  nroDoc!: string;
  email!: string;
  pass!: string;
  idUnidadAcademica!: number;
  pendiente!: number;

  public static async verlistaIdsUsados ( db :Sequelize.Sequelize, transaction ?: Sequelize.Transaction ) : Promise<string[]> {
    return (await Usuario.initModel(db).findAll({ attributes : ['idUsuario'], transaction})).map( usr => usr.idUsuario )
  }

  static initModel(sequelize: Sequelize.Sequelize): typeof Usuario {
    return Usuario.init({
    idUsuario: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    nroDoc: {
      type: DataTypes.STRING(9),
      allowNull: false,
      references: {
        model: 'Persona',
        key: 'nroDoc'
      }
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    pass: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    idUnidadAcademica: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pendiente: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'Usuario',
    timestamps: true,
    paranoid: true
  });
  }
}


export class MUsuario implements domain.IModelUsuario { 
  
  constructor( private sequelize : Sequelize.Sequelize){}

  async buscarPorId(idUsuario: string): Promise<domain.Usuario | null> {
    let salida : domain.Usuario | null = null;
    const transaction = await this.sequelize.transaction();

    const dbUsr = await Usuario.initModel(this.sequelize).findByPk(idUsuario,{transaction});
    if(!dbUsr) throw {status : 400 , message: 'no existe usuario con ese id'};
    
    const p = await new MPersona(this.sequelize).buscarPorUsuario( dbUsr.nroDoc );
    if(!p) throw {status : 400 , message: 'no existe persona con ese nroDoc'};

    const c = await CategoriaUsuario.initModel(this.sequelize).verCategoria( dbUsr.idUsuario,transaction )
    if(!c) throw {status : 400 , message: 'no existe categoria asociada a ese usuario'};
    
    const cPermisos = await PermisoUsuario.initModel(this.sequelize).verPermisos(dbUsr.idUsuario,transaction);

    const cProgramasHabilitados = await AreaProgramaUsuario.initModel(this.sequelize).buscarPorUsuario( dbUsr.idUsuario, transaction )
    

    salida = new domain.Usuario(dbUsr.dataValues,p,c,cPermisos);

    cProgramasHabilitados.forEach( ph => salida.altaProgramasHabilitados( ph ));
    

    return salida;
  }
  buscarPor(parametros: Partial<domain.TDataUsuario>, offset?: number, limit?: number): Promise<domain.Usuario[]> {
    throw new Error('Method not implemented.');
  }
  verLista(offset?: number, limit?: number): Promise<domain.Usuario[]> {
    throw new Error('Method not implemented.');
  }
  guardarDatos(usuario: domain.Usuario): Promise<domain.Usuario> {
    throw new Error('Method not implemented.');
  }
  darDeBaja(usuario: domain.Usuario): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

}
