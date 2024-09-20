import * as Sequelize from 'sequelize';
import { domain } from "../../../domain";
import { BD } from './config/dbConfig';
import { Persona, PersonaCreationAttributes } from './models/Persona';

export class MPersona implements domain.IModelPersona {
    constructor(
      private sequelize : Sequelize.Sequelize, 
      private transaction ?: Sequelize.Transaction 
    ){}


    public async findByPk(pk: string): Promise<domain.Persona | null> {
      let salida : domain.Persona | null= null;

      await Persona.initModel(this.sequelize)
        .findOne({where : {nroDoc : pk},transaction : this.transaction})
        .then( resp => {
          if(resp){
            salida =  new domain.Persona(resp.dataValues ) 
          }
        });


      return salida;
    }
    public async  findAll(): Promise<domain.Persona[]> {
      let salida : domain.Persona[] = [];

      await Persona.initModel(this.sequelize)
        .findAll({transaction : this.transaction})
        .then( resp => {
          if(resp.length > 0){
            salida = resp.map( i =>  new domain.Persona(i.dataValues) )
          }
        });


      return salida;
    }
    public async findOne(params: PersonaCreationAttributes): Promise<domain.Persona | null> {
      let salida : domain.Persona | null= null;

      await Persona.initModel(this.sequelize)
        .findOne({where : { ...params},transaction : this.transaction})
        .then( resp => {
          if(resp){
            salida =  new domain.Persona(resp.dataValues) 
          }
        });


      return salida;
    }
    public async findBy(params: PersonaCreationAttributes, offset?: number, limit?: number): Promise<domain.Persona[]> {
      let salida : domain.Persona[] = [];

      await Persona.initModel(this.sequelize)
        .findAll({
          where : { 
            [Sequelize.Op.or] : {
              nroDoc : params.nroDoc,
              ape : { [Sequelize.Op.like] : `${params.ape}%` }, 
              nom : { [Sequelize.Op.like] : `${params.nom}%` }, 
              dom : { [Sequelize.Op.like] : `${params.dom}%` }, 
              email : { [Sequelize.Op.like] : `${params.email}%` }, 
              tel : { [Sequelize.Op.like] : `${params.tel}%` }, 
              ciudad : { [Sequelize.Op.like] : `${params.ciudad}%` }, 
              provincia : { [Sequelize.Op.like] : `${params.provincia}%` }, 
              pais : { [Sequelize.Op.like] : `${params.pais}%` }, 
            }
          },
          offset ,
          limit ,
          transaction : this.transaction
        })
        .then( resp => {
          if(resp.length > 0){
            salida = resp.map( i =>  new domain.Persona(i.dataValues) )
          }
        });
      
        return salida;
    }
    public async save(i: domain.Persona): Promise<domain.Persona> {
      const dbPersona = Persona.initModel(this.sequelize).build(i.verDatos());
      await Persona.initModel(this.sequelize)
          .findByPk(i.verDatos().nroDoc)
          .then( resp => {
             dbPersona.isNewRecord = resp !== null;
          });
      await dbPersona.save({transaction : this.transaction});
    
      return i;
    }
    public async destroy(i: domain.Persona): Promise<boolean> {
      const resp = await Persona.initModel(this.sequelize)
                                .destroy({
                                  where : { nroDoc : i.verDatos().nroDoc}, 
                                  transaction : this.transaction
                                });

      return resp > 0;
    }
    public async update(i: domain.Persona): Promise<domain.Persona> {
      const dbPersona = Persona.initModel(this.sequelize).build(i.verDatos());
      await Persona.initModel(this.sequelize)
      .findByPk(i.verDatos().nroDoc)
      .then( resp => {
         dbPersona.isNewRecord = resp !== null;
      });
      await dbPersona.save({transaction : this.transaction});
  
      return i;
    }
  
    async buscarPorUsuario( nroDoc : string, transaction ?: Sequelize.Transaction ) : Promise<domain.Persona | null>{
      const dataP = await Persona.initModel(this.sequelize).findByPk( nroDoc ,{transaction} );
      if(dataP) {
        return new domain.Persona(dataP);
      }
      return null;
    }
  
    async buscarPorNroDoc(nroDoc: string): Promise<domain.Persona | null> {
      let salida: domain.Persona | null = null;
      const dataP = await BD.Persona.findByPk( nroDoc  );
      if(dataP) {
        salida = new domain.Persona(dataP);
      }
      return salida;
    }
  
  
  }