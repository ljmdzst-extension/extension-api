
import jwt from 'jsonwebtoken';
import sequelizeExtension, { BD } from "../config/dbConfig";
import { Usuario } from "../models/Usuario"
import { Persona, PersonaCreationAttributes} from '../models/Persona'
import { Transaction } from "sequelize";
import { usuarioPayload } from '../types/usuario';
import { generarEmailValidaciónRegistro, smtpService } from '../config/smtpConfig';
import { v4 as uuidv4 } from 'uuid';

type DataLoginUsuario = {email : string , pass : string, confirmPass ?: string};
type DataRegistroUsuario = PersonaCreationAttributes & DataLoginUsuario;
type DataListaUsuarios = { usuarios :{ idUsuario : string , email : string }[] }

export const loginUsuario = async({email,pass} : DataLoginUsuario) : Promise<usuarioPayload> => {

    const usuario = await BD.Usuario.findOne({
        attributes : ['idUsuario','email','pass','nroDoc','idCategoria'],
        where : { email }
    });

    if( !usuario ) 
        throw { status : 400 , msg : 'No existe un usuario con ese email' }
    
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

    const categoria = await BD.Categoria.findByPk(usuario.idCategoria);

    if(!categoria) throw{ status :500, msg : 'el usuario no tiene categoría'}

    const permisosCategorias = await BD.PermisoCategoria.findAll({where : {idCategoria : categoria.idCategoria }})

    const permisos = await BD.Permiso.findAll({ where : {idPermiso : permisosCategorias.map(item => item.idPermiso) } });

    const token = jwt.sign( {idUsuario : usuario.idUsuario} , process.env.HASH_KEY || '',{expiresIn : 60 * 60} )

    return {
        idUsuario : usuario.idUsuario,
        email : usuario.email,
        ape : persona.ape,
        nom : persona.nom,
        token : token ,
        categoria : {
            ...categoria.dataValues,
            permisos : permisos.map(permiso =>permiso.dataValues)
        }
    };

}

export const authUsuario = async(
    {token} : {token :string}

    ) : Promise<{token : string}> => {

    const {idUsuario} = jwt.verify(token,process.env.HASH_KEY || '' ) as jwt.JwtPayload;


    return {token : jwt.sign( {idUsuario : idUsuario},process.env.HASH_KEY || '', {expiresIn : 60 * 60})};

}

export  const registerUsuario = async  ( 
    data : DataRegistroUsuario, 
    transaction ?: Transaction,
    transactionPersonas ?: Transaction
    
):Promise<{ respuesta : string }>=> {

    let salida = { respuesta : ''};
    const {email,pass,...dataPersona} = data;
    const [dbPersona,creado] = await Persona.initModel(sequelizeExtension).findOrCreate({
        defaults : { ...dataPersona, nroDoc : ''}, 
        where : { nroDoc : dataPersona.nroDoc },
        transaction : transactionPersonas
    });

    if(creado){
        const {tel,nroDoc,dom} = dataPersona;
        dbPersona.set( {tel,nroDoc,dom});
        await dbPersona.save({transaction : transactionPersonas});
    }

    const listaIdsUsados = await Usuario.verlistaIdsUsados(sequelizeExtension,transaction);
    
    let nuevoId = uuidv4();
    
    listaIdsUsados.forEach( usrId => { if( usrId === nuevoId ) nuevoId = uuidv4() ;} )
        

    const usuarioPendiente = await Usuario.initModel(sequelizeExtension).create({
        idUsuario : nuevoId,
        idCategoria : 4,
        nroDoc :dbPersona.nroDoc,
        idUnidadAcademica : 1,
        email,
        pass,
        pendiente : 1
    });
    
    console.log( usuarioPendiente );

    console.log('enviando correo confirmación..');

    const resp =  await smtpService.sendMail( generarEmailValidaciónRegistro( usuarioPendiente.email , usuarioPendiente.idUsuario) );
 
    if( resp.rejected.length > 0 ) throw { status : 403 , message : 'Envío de correo de confirmación rechazado'}
   
    
    // Cambiar respuesta por HTML
    salida = {respuesta : `Revise su casilla de correo ${resp.accepted[0]}, y siga las instrucciones para completar el proceso de registro`}  

   
    return salida;
}



export const validarRegistro = async ( data : { idUsuario : string }, transaction ?: Transaction) : Promise<void> => {

//    const usuarioPendiente =  await Usuario.initModel(sequelizeExtension).findByPk( data.idUsuario , { transaction});

//    if( ! usuarioPendiente ) throw { status : 400, msg : 'No existe usuario con ese id' }

//    usuarioPendiente.set('pendiente',0);
   

//    await usuarioPendiente.asociarCategorias(sequelizeExtension,transaction);
   
//    await usuarioPendiente.save({transaction});
   

//    return {respuesta : `Usuario ${usuarioPendiente.email} registrado !`};


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