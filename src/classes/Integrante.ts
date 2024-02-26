import { 
    IntegranteAttributes, 
    IntegranteCreationAttributes, 
    Integrante as MIntegrante
} from '../models/Integrante'
import { BD } from '../config/dbConfig'
import { Transaction } from 'sequelize'
import { ESTADO_BD } from '../types/general'
import Persona, { TPersonaIn, TPersonaOut } from './Persona'
import Rol, { TRolIn, TRolOut } from './Rol'

export type TIntegranteIn  = IntegranteCreationAttributes & { 
    persona : TPersonaIn , 
    roles : TRolIn[]
}
export type TIntegranteOut  = IntegranteAttributes & { 
    persona : TPersonaOut , 
    roles : TRolOut[]
}


export default class Integrante {

    public estadoEnBD !: ESTADO_BD;

    private persona ?: Persona;

    private lRoles ?: Rol[];

    constructor( 
        private dbIntegrante : MIntegrante
    ){
        this.estadoEnBD = ESTADO_BD.A;
        this.persona = undefined;
        this.lRoles = new Array<Rol>();
    }
    
    editarDatos( data : TIntegranteIn  ) : TIntegranteOut {
        
        if(data.roles.length) {
           
            data.roles.forEach( dataRol => this.lRoles?.push( new Rol(dataRol )) )
            
        }
        this.persona = new Persona( data.persona )
        return this.verDatos();
    }

    async determinarPersistencia () : Promise<void>{

        const 
         = await BD.Integrante.findByPk(this.persona?.verDatos().nroDoc) ;
        
        if(dbPersona) this.estadoEnBD = ESTADO_BD.M;
        if(!dbPersona) this.estadoEnBD = ESTADO_BD.A;
        
    }

    async leerDatos( transaction ?: Transaction ) {
       
        await this.dbIntegrante.getPersona({transaction}).then( resp =>this.dbIntegrante.persona = resp)
        
    }
    async leerDatosRoles( transaction ?: Transaction){
        this.dbIntegrante.roles = [];
        await this.dbIntegrante.getRoles({
            transaction,
            where : {codigoPropuesta : this.dbIntegrante.codigoPropuesta}
        })
        .then( resp => this.dbIntegrante.roles.push(...resp))

    }
    async guardarDatos( transaction ?: Transaction ) {
        this.dbIntegrante.isNewRecord = await Integrante.findByPk(this.dbIntegrante.nroDoc,{attributes : ['nroDoc'], transaction}) === null;

        await this.dbIntegrante.save({transaction});
     
    }
    async guardarDatosRoles ( transaction ?: Transaction ){
        console.log('guardarDatosRoles()')
        if(this.dbIntegrante.roles && this.dbIntegrante.roles.length) {
            await RolIntegrante.bulkCreate(this.dbIntegrante.roles,{ignoreDuplicates : true,transaction});
            
        }
    }
    async guardarDatosPersonales( transaction ?: Transaction ){
        
        if(this.dbIntegrante.persona){
            this.dbIntegrante.persona.isNewRecord = Persona.findByPk(this.dbIntegrante.persona.nroDoc,{transaction, attributes : ['nroDoc']}) === null; 
            
            await this.dbIntegrante.persona.save({transaction});
            
            await this.dbIntegrante.setPersona( this.dbIntegrante.persona,{transaction} );
        }
    }
    verDatos ( ): TIntegranteOut {
        return {
            ...this.dbIntegrante.dataValues,
            persona : this.dbIntegrante.persona?.dataValues,
            roles : this.dbIntegrante.roles?.map(rol => rol.dataValues) || []
        };
    }


    crearIntegrante(  data : TIntegranteIn ) : TIntegranteOut{


            const nuevoIntegrante = Integrante.build(data);

            nuevoIntegrante.persona = Persona.build(data.persona);
            
            
            nuevoIntegrante.roles = [];

            if(data.roles.length) {
                const roles = RolIntegrante.bulkBuild(data.roles);
                roles.map( rol => rol.validate())
                nuevoIntegrante.roles.push( ...roles);
            }
          
      
            return nuevoIntegrante;
        }
}