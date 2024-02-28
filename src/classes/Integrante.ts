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

    private dbIntegrante !: MIntegrante;

    private persona ?: Persona;

    private lRoles ?: Rol[];

    constructor( 
        data : TIntegranteIn 
    ){
        this.estadoEnBD = ESTADO_BD.A;
        this.persona = new Persona( data.persona );
        this.lRoles = new Array<Rol>();
        if(data.roles.length) {
            data.roles.forEach( dataRol => this.lRoles?.push( new Rol(dataRol) ))
        }
    }

    
    editarDatos( data : TIntegranteIn  ) : TIntegranteOut {
        
        if(data.roles.length) {
           
            data.roles.forEach( dataRol => {
                if(this.lRoles?.every( rol => rol.compararDatos(dataRol) === false)){
                    this.lRoles.push( new Rol ( dataRol));
                }
            } )
            
        }
        this.persona = new Persona( data.persona )
        return this.verDatos();
    }

    async determinarPersistencia ( transaction ?: Transaction ) : Promise<void>{

        if(this.lRoles?.length) {
            await Promise.all( this.lRoles.map( rol => rol.determinarPersistencia(transaction)) )
        }

        await this.persona?.determinarPersistencia(transaction);

        if(await BD.Integrante.findByPk(this.persona?.verDatos().nroDoc) ){
            this.estadoEnBD = ESTADO_BD.M;
        } else {
            this.estadoEnBD = ESTADO_BD.A;
        }
      
        
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
       

        await this.dbIntegrante.save({transaction});
     
    }
    async guardarDatosRoles ( transaction ?: Transaction ) : Promise<Promise<TRolOut>[]> {
        let salida : Promise<TRolOut>[] = [];

        if(this.lRoles?.length) {
            salida = this.lRoles.map( rol => rol.guardarDatos(transaction) )
        }


        return salida;
       
    }

    async guardarDatosPersonales( transaction ?: Transaction ){
        
        if(this.dbIntegrante.persona){
            await this.persona?.determinarPersistencia(transaction);

            await this.persona?.guardarDatos(transaction);
            
        }
    }
    verDatos ( ): TIntegranteOut {
        return {
            ...this.dbIntegrante.dataValues,
            persona : this.dbIntegrante.persona?.dataValues,
            roles : this.dbIntegrante.roles?.map(rol => rol.dataValues) || []
        };
    }


    
}