import express, { Request, Response }  from 'express';
import jwt from 'jsonwebtoken';
import {ServerExpress} from "..";
import IRouter from "./Router";
import { aplication } from "../../../../aplication";
import { domain } from "../../../../domain";
import { HttpHelpers } from "../helpers/general";
import { ERROR } from "../logs/errores";
import { generarEmailValidaciónRegistro, smtpService } from "../../../SMTP/Nodemailer/config/smtpConfig";
import { 
    MiddlewareChequearUsuarioNoExistente, 
    MiddlewareObtenerDataUsuario, 
    MiddlewareValidarCamposUsuario, 
    MiddlewareValidarUsuarioNoPendiente 
} from "../middlewares/usuario";
import { MiddlewareExtraerToken, MiddlewareValidarToken } from '../middlewares/auth';


type TBodyRegister = {
    idUsuario : string,
    email : string,
    pass : string,
    confirmPass : string,
    idUnidadAcademica : number,
    nroDoc : string,
    ape : string,
    nom : string,
    tel : string,
    dom : string
}

export default class RouterUsuario implements IRouter {

    constructor(
        private basePath : string,
        private MUsuario : domain.IModelUsuario,
        private MPersona : domain.IModelPersona,
        private VUsuario : aplication.IVUsuario,
        private VPersona : aplication.IVPersona,
    ){}

    public async usar(server: ServerExpress.Server): Promise<void> {
        const router = express.Router();
        const middValidarCamposUsuario =  new MiddlewareValidarCamposUsuario(this.VUsuario);
        const middValidarUsuarioNoPendiente = new MiddlewareValidarUsuarioNoPendiente();
        const middObtenerDataUsuario =  new MiddlewareObtenerDataUsuario(this.MUsuario,this.VUsuario);
        const middChequearUsuarioNoExistente = new MiddlewareChequearUsuarioNoExistente(this.MUsuario);

        router.post(
         '/login',
         [
            middValidarCamposUsuario.usar(),
            middValidarUsuarioNoPendiente.usar(),
            middObtenerDataUsuario.usar()
         ],this.postLogin());

        router.post(
         '/register',
         [
             middValidarCamposUsuario.usar(),
             middChequearUsuarioNoExistente.usar()
         ],
         this.postRegister());

        router.post(
            '/auth',
            [
                new MiddlewareExtraerToken().usar(),
                new MiddlewareValidarToken().usar()
            ],
            this.postAuth());
            
        router.put( '/validar/:idUsuario', [ ],  this.putValidarRegistro());
        router.get('/',[],this.getUsuarios());
 
        server.verApp().use(this.basePath,router);
    }
 

    private getUsuarios() {
        return async (  req : Request, res: Response ) => { 
            try {
                const usuarios = await this.MUsuario.verLista();

                HttpHelpers.responderPeticionOk(res,usuarios.map(u => u.verDatos()));
            } catch (error : any) {
                HttpHelpers.responderPeticionError(res,error.message,error.status)                
            }
        }
    }

    private postLogin () {
        return async( req : any, resp : Response ) => {
            try {
                 const usuario = req.usuario;
                if(!( usuario instanceof domain.Usuario) ) throw ERROR.USUARIO_INEXISTENTE; 
        
                const token = jwt.sign( {idUsuario : usuario.verDatos().idUsuario} , process.env.HASH_KEY || '',{expiresIn : 60 * 60} )
                // agregar ver areas a usuario
                HttpHelpers.responderPeticionOk(resp, {
                    idUsuario : usuario.verDatos().idUsuario,
                    email : usuario.verDatos().email,
                    ape : usuario.verDatos().persona?.ape,
                    nom : usuario.verDatos().persona?.nom,
                    permisos : usuario.verDatos().permisos?.map( p => p.nombre),
                    categorias : [usuario.verDatos().categoria?.nombre],
                    areas : [], 
                    token : token
                });
                
            } catch (error : any) {
        
                HttpHelpers.responderPeticionError(resp,error.message || error,error.status || 500)
            }
        
        }
    }
    
    private postRegister() {
        return async (  req : Request, res: Response ) => { 
            const data : TBodyRegister = req.body;
            try {
                
                let p = await aplication.GestionDePersonas.findPersona(data.nroDoc,this.MPersona,this.VPersona);

                if( !p ) {

                    p = await aplication.GestionDePersonas.altaPersona({...data,tipoDoc : 1},this.MPersona,this.VPersona);
                } 
                
                const usuarioPendiente = await aplication.GestionDeUsuarios.altaUsuario({...data , pendiente : 1}, p , this.MUsuario,this.VUsuario); 

                const {email,idUsuario} = usuarioPendiente.verDatos();

                const respSmtp =  await smtpService.sendMail( generarEmailValidaciónRegistro (  email,   idUsuario )   );
                
                if( respSmtp.rejected.length > 0 ) throw ERROR.MAIL_REGISTRO_RECHAZADO;
                
                const salida = {respuesta : `Revise su casilla de correo ${respSmtp.accepted[0]}, y siga las instrucciones para completar el proceso de registro`}  
            
                HttpHelpers.responderPeticionOk(res,salida);

            } catch (error : any) {
                HttpHelpers.responderPeticionError(res,error.message,error.status);
            }
        }
    }

    private postAuth() {
        return async (  req : any, res: Response ) => { 
            try {
                const {idUsuario}  = req.usuario;
                
                const _token = jwt.sign( {idUsuario} ,process.env.HASH_KEY || '', {expiresIn : '4h'} );
                
                HttpHelpers.responderPeticionOk(res,{token : _token});
        
           } catch (error : any) {
                HttpHelpers.responderPeticionError(res,error.status,error.message);
           }
        }
    }


    private putValidarRegistro() {
        return async (req : any , resp : Response) => {

            try {
              const usuarioPendiente =  await this.MUsuario.buscarPorId( req.params.idUsuario  );
          
              if( ! usuarioPendiente ) throw ERROR.USUARIO_INEXISTENTE;
           
              usuarioPendiente.editar({pendiente : 0});
              
              await this.MUsuario.guardarDatos(usuarioPendiente);
              
             HttpHelpers.responderPeticionOk(resp,{
                  respuesta : `Usuario ${usuarioPendiente.verDatos().email} registrado !`
             });
            } catch (error : any) {
               if(!error.status) { console.log(error); }
               HttpHelpers.responderPeticionError(resp,error.status, error.message);
            }
            
          
          }
    }
   
  
    

}