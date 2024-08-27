import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import { domain } from '../../../../domain';
export interface PersonaAttributes {
  nroDoc: string;
  tipoDoc: number;
  ape: string;
  nom: string;
  tel?: string | null;
  dom?: string | null;
  email?: string | null;
  ciudad?: string | null;
  provincia?: string | null;
  pais?: string | null;
}

export type PersonaPk = "nroDoc";
export type PersonaId = Persona[PersonaPk];
export type PersonaOptionalAttributes = "tel" | "dom" | "email" | "ciudad" | "provincia" | "pais" ;
export type PersonaCreationAttributes = Optional<PersonaAttributes, PersonaOptionalAttributes>;

export class Persona extends Model<PersonaAttributes, PersonaCreationAttributes> implements PersonaAttributes{

  nroDoc!: string;
  tipoDoc!: number;
  ape!: string;
  nom!: string;
  tel?: string;
  dom?: string;
  email?: string;
  ciudad?: string;
  provincia?: string;
  pais?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof Persona {
    return Persona.init({
    nroDoc: {
      type: DataTypes.STRING(9),
      allowNull: false,
      primaryKey: true
    },
    tipoDoc: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ape: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    nom: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    tel: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    dom: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ciudad: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    provincia: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "Santa Fe"
    },
    pais: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "Argentina"
    }
  }, {
    sequelize,
    tableName: 'Persona',
    timestamps: true,
    paranoid: true
  });
  }
}


export const PERSONA_VACIA : PersonaAttributes = {
  nroDoc : '',
  tipoDoc : 1,
  ape : '',
  nom : ''
} 


export class MPersona implements domain.IModelPersona {
  constructor( private sequelize : Sequelize.Sequelize ){}

  async buscarPorUsuario( nroDoc : string, transaction ?: Sequelize.Transaction ) : Promise<domain.Persona | null>{
    const dataP = await Persona.initModel(this.sequelize).findByPk( nroDoc ,{transaction} );
    if(dataP) {
      return new domain.Persona(dataP);
    }
    return null;
  }

  async buscarPorNroDoc(nroDoc: string): Promise<domain.Persona | null> {
    let salida: domain.Persona | null = null;
    const dataP = await Persona.findByPk( nroDoc  );
    if(dataP) {
      salida = new domain.Persona(dataP);
    }
    return salida;
  }

  buscarPor(parametros: domain.TDataPersona): Promise<domain.Persona | null> {
    throw new Error('Method not implemented.');
  }
  verLista(offset?: number, limit?: number): Promise<domain.Persona[]> {
    throw new Error('Method not implemented.');
  }
  guardarDatos(persona: domain.Persona): Promise<domain.Persona> {
    throw new Error('Method not implemented.');
  }
  darDeBAja(nroDoc: string): Promise<domain.Persona> {
    throw new Error('Method not implemented.');
  }
}