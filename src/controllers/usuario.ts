
import jwt from 'jsonwebtoken';
import sequelizeExtension, { BD } from "../config/dbConfig";
import { Usuario } from "../models/Usuario"
import { Persona, PersonaCreationAttributes} from '../models/Persona'
import { Transaction } from "sequelize";
import { usuarioPayload,DataRegistroUsuario } from '../types/usuario';
import { generarEmailValidaciónRegistro, smtpService } from '../config/smtpConfig';
import { v4 as uuidv4 } from 'uuid';
import { response } from 'express';

type DataLoginUsuario = {email : string , pass : string, confirmPass ?: string};

type DataListaUsuarios = { usuarios :{ idUsuario : string , email : string }[] }

export const loginUsuario = async({email,pass} : DataLoginUsuario) : Promise<usuarioPayload> => {

    const usuario = await BD.Usuario.findOne({
        attributes : ['idUsuario','email','pass','nroDoc','idCategoria'],
        where : { email }
    });

    if( !usuario ) 
        throw { status : 500 , msg : 'No existe un usuario en bd con ese email' }
    
    if( usuario.pass !== pass ) 
        throw { status : 400 , msg : 'Contraseña errónea' }

    if( usuario.pendiente) 
        throw { status : 403 , msg : 'Usuario pendiente de confirmación de registro' }

    const persona = await BD.Persona.findOne({
        attributes : ['ape','nom'],
        where : { nroDoc : usuario.nroDoc }
    })

    if( ! persona ) 
        throw { status : 500 , msg : `No existe persona asociada a usuario : ${usuario.idUsuario}`}

    const token = jwt.sign( {idUsuario : usuario.idUsuario} , process.env.HASH_KEY || '',{expiresIn : 60 * 60} )

    return {
        idUsuario : usuario.idUsuario,
        email : usuario.email,
        ape : persona.ape,
        nom : persona.nom,
        token : token
    };

}

export const authUsuario = async( {token} : {token :string}  ) : Promise<{token : string}> => {

    const {idUsuario} = jwt.verify(token,process.env.HASH_KEY || '' ) as jwt.JwtPayload;


    return {token : jwt.sign( {idUsuario : idUsuario},process.env.HASH_KEY || '', {expiresIn : 60 * 60})};

}

export  const registerUsuario = async  ( 
    data : DataRegistroUsuario, 
    transaction ?: Transaction,
    transactionPersonas ?: Transaction
    
):Promise<{ respuesta : string }>=> {

    let salida = { respuesta : ''};
    
    const {email,pass,idUnidadAcademica,confirmPass,...dataPersona} = data;

    const [dbPersona,creado] = await Persona.initModel(sequelizeExtension).findOrCreate({
        defaults : { ...dataPersona, nroDoc : dataPersona.nroDoc}, 
        where : { nroDoc : dataPersona.nroDoc }
    });

    if(creado){
        const {tel,nroDoc,dom} = dataPersona;
        dbPersona.set( {tel,nroDoc,dom});
        await dbPersona.save();
    }

    const listaIdsUsados = await Usuario.verlistaIdsUsados(sequelizeExtension,transaction);
    
    let nuevoId = uuidv4();
    
    listaIdsUsados.forEach( usrId => { if( usrId === nuevoId ) nuevoId = uuidv4() ;} )
        

    const usuarioPendiente = await Usuario.initModel(sequelizeExtension).create({
        idUsuario : nuevoId,
        idCategoria : 5,
        nroDoc :dbPersona.nroDoc,
        idUnidadAcademica : idUnidadAcademica,
        email,
        pass,
        pendiente : 1
    });
    

    console.log('enviando correo confirmación..');

    const resp =  await smtpService.sendMail( generarEmailValidaciónRegistro( usuarioPendiente.email , usuarioPendiente.idUsuario) );
 
    if( resp.rejected.length > 0 ) throw { status : 403 , message : 'Envío de correo de confirmación rechazado'}
   
    
    // Cambiar respuesta por HTML
    salida = {respuesta : `Revise su casilla de correo ${resp.accepted[0]}, y siga las instrucciones para completar el proceso de registro`}  

   
    return salida;
}



export const validarRegistro = async (req : any , resp : typeof response) => {

  try {
    const usuarioPendiente =  await BD.Usuario.findByPk( req.params.idUsuario  );

    if( ! usuarioPendiente ) throw { status : 400, msg : 'No existe usuario con ese id' }
 
    usuarioPendiente.set('pendiente',0);
    
    await usuarioPendiente.save();
    
    resp.status(200).json({
        ok : false,
        data : {
            respuesta : `Usuario ${usuarioPendiente.email} registrado !`
        },
        error :null
     })
  } catch (error : any) {
     if(error.status === 500) { console.log(error.message); }
     resp.status(error.status || 500).json({
        ok : false,
        data : null,
        error : error.message || 'Error de servidor'
     })
  }


}

export const verListaUsuarios = async ( data : { eliminados ?: boolean }, transaction ?: Transaction ) : Promise<DataListaUsuarios> => {
    let salida : DataListaUsuarios = { usuarios : [] }
    
    const usuariosEnBD = await Usuario.initModel(sequelizeExtension).findAll( { 
        attributes : ['idUsuario','email'],
        paranoid : data.eliminados , 
        transaction 
    } );

    salida.usuarios = usuariosEnBD.map( usr => usr.dataValues)

    return salida;
}