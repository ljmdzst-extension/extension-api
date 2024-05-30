
import jwt from 'jsonwebtoken';
import sequelizeExtension, { BD } from "../config/dbConfig";
import { response } from 'express';
import { Usuario } from "../models/Usuario"
import { Persona} from '../models/Persona'
import { generarEmailValidaciónRegistro, smtpService } from '../config/smtpConfig';
import { v4 as uuidv4 } from 'uuid';
import { HttpHelpers } from '../helpers/general';
import { PermisoAttributes } from '../models/Permiso';


type DataListaUsuarios = { usuarios :{ idUsuario : string , email : string }[] }

export const loginUsuario =  async( req : any, resp : typeof response  ) => {

    try {
        const { usuario,permisos } = req.usuario;

        const persona = await BD.Persona.findOne({
            attributes : ['ape','nom'],
            where : { nroDoc : usuario.nroDoc }
        })

        if( ! persona ) 
            throw { status : 500 , msg : `No existe persona asociada a usuario : ${usuario.idUsuario}`}

        const token = jwt.sign( {idUsuario : usuario.idUsuario} , process.env.HASH_KEY || '',{expiresIn : 60 * 60} )

        HttpHelpers.responderPeticionOk(resp, {
            idUsuario : usuario.idUsuario,
            email : usuario.email,
            ape : persona.ape,
            nom : persona.nom,
            permisos : permisos.map((p : PermisoAttributes) => p.nombre),
            token : token
        });
    } catch (error : any) {

        HttpHelpers.responderPeticionError(resp,error.status || 500,error.message || error)
    }

}

export const authUsuario = async( req : any, resp : typeof response  )  => {
   
   try {
        const {idUsuario}  = req.usuario;
        
       const _token = jwt.sign( {idUsuario} ,process.env.HASH_KEY || '', {expiresIn : 60 * 60} );
        
        HttpHelpers.responderPeticionOk(resp,{token : _token});

   } catch (error : any) {
        HttpHelpers.responderPeticionError(resp,error.status,error.message);
   }

}

export  const registerUsuario = async( req : any, resp : typeof response  ) => {

    try {
        let salida = { respuesta : ''};
    
        const {email,pass,idUnidadAcademica,confirmPass,...dataPersona} = req.body;

        const [dbPersona,creado] = await Persona.initModel(sequelizeExtension).findOrCreate({
            defaults : { ...dataPersona, nroDoc : dataPersona.nroDoc}, 
            where : { nroDoc : dataPersona.nroDoc }
        });

        if(creado){
            const {tel,nroDoc,dom} = dataPersona;
            dbPersona.set( {tel,nroDoc,dom});
            await dbPersona.save();
        }

        const listaIdsUsados = await Usuario.verlistaIdsUsados(sequelizeExtension);
        
        let nuevoId = uuidv4();
        
        listaIdsUsados.forEach( usrId => { if( usrId === nuevoId ) nuevoId = uuidv4() ;} )
            

        const usuarioPendiente = await Usuario.initModel(sequelizeExtension).create({
            idUsuario : nuevoId,
            nroDoc :dbPersona.nroDoc,
            idUnidadAcademica : idUnidadAcademica,
            email,
            pass,
            pendiente : 1
        });
        

        console.log('enviando correo confirmación..');

        const respSmtp =  await smtpService.sendMail( generarEmailValidaciónRegistro( usuarioPendiente.email , usuarioPendiente.idUsuario) );
    
        if( respSmtp.rejected.length > 0 ) throw { status : 403 , message : 'Envío de correo de confirmación rechazado'}
        
        // Cambiar respuesta por HTML
        salida = {respuesta : `Revise su casilla de correo ${respSmtp.accepted[0]}, y siga las instrucciones para completar el proceso de registro`}  

        HttpHelpers.responderPeticionOk(resp, salida);
    } catch (error : any) {
        if(! error.status) console.log(error); 
        HttpHelpers.responderPeticionError(resp,error.status, error.message);
    }
}



export const validarRegistro = async (req : any , resp : typeof response) => {

  try {
    const usuarioPendiente =  await BD.Usuario.findByPk( req.params.idUsuario  );

    if( ! usuarioPendiente ) throw { status : 400, msg : 'No existe usuario con ese id' }
 
    usuarioPendiente.set('pendiente',0);
    
    await usuarioPendiente.save();
    
   HttpHelpers.responderPeticionOk(resp,{
        respuesta : `Usuario ${usuarioPendiente.email} registrado !`
   });
  } catch (error : any) {
     if(!error.status) { console.log(error); }
     HttpHelpers.responderPeticionError(resp,error.status, error.message);
  }


}

export const verListaUsuarios =  async (req : any , resp : typeof response) => {
    try {
        let salida : DataListaUsuarios = { usuarios : [] }


        const usuariosEnBD = await Usuario.initModel(sequelizeExtension).findAll( { 
            attributes : ['idUsuario','email']
        } );

        salida.usuarios = usuariosEnBD.map( usr => usr.dataValues)

        HttpHelpers.responderPeticionOk(resp,salida);
    } catch (error : any) {
        HttpHelpers.responderPeticionError(resp,error.status, error.message)
    }
}