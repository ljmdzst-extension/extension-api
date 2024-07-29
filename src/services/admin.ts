import * as SUsuario from './usuario';
import sequelizeExtension, { BD } from "../config/dbConfig";
import { ColaDeTareas } from "../helpers/tareas";
import { AreaProgramaUsuario } from "../models/AreaProgramaUsuario";

import {v4 as uuidv4} from 'uuid';
import { Op } from 'sequelize';

type TDataCategoria = {
    idCategoria : number,
    nom : string
}

type TDataPermiso = {
    idPermiso : number,
    nom : string
}

type TDataArea = {
    idArea : number,
    nom : string
}


type  TDataPrograma = {
    idPrograma : number,
    nom : string,
    listaAreas : TDataArea []
}

type TDataPostUsuario = {
    nroDoc : string,
    ape : string,
    nom : string,
    email : string,
    idUnidadAcademica : number,
    pass : string,
    categorias : TDataCategoria[],
    permisos : TDataPermiso[],
    areas : { anio : number , listaProgramas : TDataPrograma[]}[]
}

type TDataPutUsuario = TDataPostUsuario & {
    idUsuario : string
}

type TDataGetUsuario = TDataPutUsuario;

export const verUsuario = async(idUsuario : string)=>{
    try {
       
        
        const usuario = await BD.Usuario.findByPk(idUsuario);
        
        if(!usuario) throw { status : 400 , message : `No existe usuario con ese id : ${idUsuario}`}

        const salida = await SUsuario.obtenerDataUsuario(usuario.idUsuario,usuario.email);
        
      
        return salida;

    } catch (error) {
       

        throw error;
    }
}

export const verListaUsuarios = async() => {
   
    
    try {
        let salida : any = [];
        
        const usuarios = await BD.Usuario.findAll();
        
        const tareas = new ColaDeTareas();

        usuarios.forEach( u => tareas.push( ()=> SUsuario.obtenerDataUsuario(u.idUsuario,u.email).then( data => salida.push(data)) ) )
        
        await tareas.resolverSinDelay();

        return salida;

    } catch (error) {
       

        throw error;
    }
    
}

export const altaUsuario = async( data : TDataPostUsuario)=>{

    const transaction = await sequelizeExtension.transaction({logging : process.env.NODE_ENV === 'development' ? sql => console.log(sql) : undefined})
    
    try {
        let persona = await BD.Persona.findOne({where : { nroDoc : data.nroDoc },transaction});    
        
        if(!persona) {
            persona = BD.Persona.build(
                {
                    nroDoc : data.nroDoc,
                    ape : data.ape,
                    nom : data.nom, 
                    tipoDoc : 1

                },
                {isNewRecord : true}
            );
            
            await persona.save({transaction});
            
        } 

        const listaIdsUsados = await BD.Usuario.verlistaIdsUsados(sequelizeExtension,transaction);
        
        let nuevoId = uuidv4();
        
        listaIdsUsados.forEach( usrId => { if( usrId === nuevoId ) nuevoId = uuidv4() ;} )
            

        const usuario = BD.Usuario.build(
            {
                idUsuario : nuevoId,
                nroDoc :persona.nroDoc,
                idUnidadAcademica : data.idUnidadAcademica,
                email : data.email,
                pass : data.pass,
                pendiente : 0
            },
            {
                isNewRecord : true
            }
        );

        await usuario.save({transaction});

        await BD.CategoriaUsuario.bulkCreate( 
            data.categorias.map( ({idCategoria}) => ({ idCategoria,idUsuario : usuario.idUsuario})),
            {
                transaction ,
                ignoreDuplicates : true
            }
        );

        await BD.PermisoUsuario.bulkCreate(
            data.permisos.map(({idPermiso})=> ({idPermiso, idUsuario : usuario.idUsuario})),
            {
                transaction ,
                ignoreDuplicates : true
            }
        )


        const cAreasProgamaCategoriasUsuario : AreaProgramaUsuario[]  = [];

        data.areas.forEach( (anio) => {
            const _anio = anio.anio;
            anio.listaProgramas.forEach( (prog : TDataPrograma) => {
                const idPrograma = prog.idPrograma;
                prog.listaAreas.forEach( (area : TDataArea)=> {
                    cAreasProgamaCategoriasUsuario.push(
                        BD.AreaProgramaUsuario.build(
                            {
                                idArea : area.idArea,
                                idPrograma : idPrograma,
                                anio : _anio,
                                idUsuario : usuario.idUsuario
                            }
                        )
                    )
                })
            })
        });

        await BD.AreaProgramaUsuario.bulkCreate(
            cAreasProgamaCategoriasUsuario.map( area => area.dataValues),
            {
                transaction ,
                ignoreDuplicates : true
            }
        );

        await transaction.commit();
        return {
            ...usuario.dataValues,
            areas : data.areas,
            categorias : data.categorias,
            permisos : data.permisos
        };
    } catch (error) {
        await transaction.rollback();

        throw error;
    }

   
}


export const editarUsuario = async( data : TDataPutUsuario )=>{
    const transaction = await sequelizeExtension.transaction({logging : process.env.NODE_ENV === 'development' ? sql => console.log(sql) : undefined})
    
    try {
        let persona = await BD.Persona.findOne({where : { nroDoc : data.nroDoc },transaction});    
        
        if(!persona) {
            persona = BD.Persona.build(
                {
                    nroDoc : data.nroDoc,
                    ape : data.ape,
                    nom : data.nom, 
                    tipoDoc : 1

                },
                {isNewRecord : true}
            );
            
            await persona.save({transaction});
            
        } 

        const usuario = await BD.Usuario.findByPk(data.idUsuario,{transaction});

        if(!usuario) throw { status : 400 , message : `No se encontro el usuario con id ${data.idUsuario}`}

        usuario.set({
            nroDoc : data.nroDoc,
            email : data.email,
            pass : data.pass,
            idUnidadAcademica : data.idUnidadAcademica
        });

        await usuario.save({transaction});

        await BD.CategoriaUsuario.bulkCreate( 
            data.categorias.map( ({idCategoria}) => ({ idCategoria,idUsuario : usuario.idUsuario})),
            {
                transaction ,
                ignoreDuplicates : true
            }
        );

        await BD.CategoriaUsuario.destroy({
            where : {
                idUsuario : usuario.idUsuario,
                [Op.not] : {
                    idCategoria : data.categorias.map( ({idCategoria}) => idCategoria),
                }
            },
            transaction
        })

        await BD.PermisoUsuario.bulkCreate(
            data.permisos.map(({idPermiso})=> ({idPermiso, idUsuario : usuario.idUsuario})),
            {
                transaction ,
                ignoreDuplicates : true
            }
        )

        await BD.PermisoUsuario.destroy({
            where : {
                idUsuario : usuario.idUsuario,
                [Op.not] : {
                    idPermiso : data.permisos.map( ({idPermiso}) => idPermiso),
                }
            },
            transaction
        })

        const cAreasProgamaUsuario : AreaProgramaUsuario[]  = [];

        data.areas.forEach( (anio) => {
            const _anio = anio.anio;
            anio.listaProgramas.forEach( (prog : TDataPrograma) => {
                const idPrograma = prog.idPrograma;
                prog.listaAreas.forEach( (area : TDataArea)=> {
                    cAreasProgamaUsuario.push(
                        BD.AreaProgramaUsuario.build(
                            {
                                idArea : area.idArea,
                                idPrograma : idPrograma,
                                anio : _anio,
                                idUsuario : usuario.idUsuario
                            }
                        )
                    )
                })
            })
        });
    

        await BD.AreaProgramaUsuario.bulkCreate(
            cAreasProgamaUsuario.map( area => area.dataValues),
            {
                transaction ,
                ignoreDuplicates : true
            }
        );

        await transaction.commit();
        return {
            ...usuario.dataValues,
            areas : data.areas,
            categorias : data.categorias,
            permisos : data.permisos
        };
    } catch (error) {
        await transaction.rollback();

        throw error;
    }
}

