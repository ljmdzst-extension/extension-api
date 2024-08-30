import * as SUsuario from './usuario';
import sequelizeExtension, { BD } from "../config/dbConfig";
import { ColaDeTareas } from "../helpers/tareas";
import { AreaProgramaUsuario } from "../models/AreaProgramaUsuario";

import {v4 as uuidv4} from 'uuid';
import { Op } from 'sequelize';

type TDataCategoria = {
    idCategoria : number,
    nombre : string
}

type TDataPermiso = {
    idPermiso : number,
    nombre : string
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


type TDataPersona = {
    nroDoc : string,
    ape : string,
    nom : string,
    tel ?: string,
    email ?: string,
    ciudad ?: string,
    provincia ?: string,
    pais ?: string,
}

type TDataUsuario = {
    idUsuario : string,
    email : string,
    pass : string,
    nroDoc : string,
    pendiente ?: number,
    
    idUnidadAcademica ?: number,
}

type TDataPostUsuario = {
    persona : TDataPersona,
    usuario : TDataUsuario,
    categorias : TDataCategoria[],
    permisos : TDataPermiso[],
    areas : { anio : number , listaProgramas : TDataPrograma[]}[]
}

type TDataPutUsuario = TDataPostUsuario ;


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
        let persona = await BD.Persona.findOne({where : { nroDoc : data.persona.nroDoc },transaction});    
        
        if(!persona) {

            persona = BD.Persona.build(
                {
                    nroDoc : data.persona.nroDoc,
                    ape : data.persona.ape,
                    nom : data.persona.nom, 
                    tipoDoc : 1
                },
                {isNewRecord : true}
            );
   
            
        } 
                 
        await persona.save({transaction});

        const listaIdsUsados = await BD.Usuario.verlistaIdsUsados(sequelizeExtension,transaction);
        
        let nuevoId = uuidv4();
        
        listaIdsUsados.forEach( usrId => { if( usrId === nuevoId ) nuevoId = uuidv4() ;} )
            

        const usuario = BD.Usuario.build(
            {
                ...data.usuario,
                idUsuario : nuevoId,
                nroDoc :persona.nroDoc,
                idUnidadAcademica : data.usuario.idUnidadAcademica || 0,
                email : data.usuario.email,
                pass : data.usuario.pass,
                pendiente : 0
            },
            {
                isNewRecord : true
            }
        );

        await usuario.save({transaction});

        const cantCategorias = await BD.Categoria.count({where : { idCategoria : data.categorias.map( ({idCategoria})=> idCategoria) }, transaction});

        if(cantCategorias !== data.categorias.length ) throw { status : 400 , message : 'Algunas categorias no corresponden a las registradas' }


        await BD.CategoriaUsuario.bulkCreate( 
            data.categorias.map( ({idCategoria}) => ({ idCategoria,idUsuario : usuario.idUsuario})),
            {
                transaction ,
                ignoreDuplicates : true
            }
        );

        const cantPermisos = await BD.Permiso.count({where : { idPermiso : data.permisos.map( ({idPermiso})=> idPermiso) }, transaction});

        if(cantPermisos !== data.permisos.length ) throw { status : 400 , message : 'Algunos permisos no corresponden a los registrados' }


        await BD.PermisoUsuario.bulkCreate(
            data.permisos.map(({idPermiso})=> ({idPermiso, idUsuario : usuario.idUsuario})),
            {
                transaction ,
                ignoreDuplicates : true
            }
        )


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

        const idsAreasAAsignar =  [...new Set(cAreasProgamaUsuario.map( ({idArea})=>idArea))];
        const idsProgramasAAsignar =  [...new Set(cAreasProgamaUsuario.map( ({idPrograma})=>idPrograma))];
        

        const cantAreas = await BD.Area.count( { where : { idArea : idsAreasAAsignar },transaction} );

        if(cantAreas !== idsAreasAAsignar.length ) throw { status : 400 , message : 'Algunas areas no corresponden a las registradas' }

        const cantProgramas = await BD.Programa.count( { where : { idPrograma : idsProgramasAAsignar },transaction} );

        if(cantProgramas !== idsProgramasAAsignar.length ) throw { status : 400 , message : 'Algunos programas no corresponden a los registrados' }



        await BD.AreaProgramaUsuario.bulkCreate(
            cAreasProgamaUsuario.map( apu => apu.dataValues),
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
        let persona = await BD.Persona.findOne({where : { nroDoc : data.persona.nroDoc },transaction});    
        
        if(!persona) {

            persona = BD.Persona.build({...data.persona,tipoDoc : 1},  {isNewRecord : true} );
   
            
        } else {
            persona.set({
                ape : data.persona.ape, 
                nom : data.persona.nom,
                tel : data.persona.tel,
                email : data.persona.email,
                ciudad : data.persona.ciudad,
                provincia : data.persona.provincia,
                pais : data.persona.pais
            });
            persona.isNewRecord = false;
        }

        await persona.save({transaction});

        const usuario = await BD.Usuario.findByPk(data.usuario.idUsuario,{transaction});

        if(!usuario) throw { status : 400 , message : `No se encontro el usuario con id ${data.usuario.idUsuario}`}

        usuario.set({...data.usuario , nroDoc : data.persona.nroDoc});

        await usuario.save({transaction});

        const cantCategorias = await BD.Categoria.count({where : { idCategoria : data.categorias.map( ({idCategoria})=> idCategoria) }, transaction});

        if(cantCategorias !== data.categorias.length ) throw { status : 400 , message : 'Algunas categorias no corresponden a las registradas' }

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
        const cantPermisos = await BD.Permiso.count({where : { idPermiso : data.permisos.map( ({idPermiso})=> idPermiso) }, transaction});

        if(cantPermisos !== data.permisos.length ) throw { status : 400 , message : 'Algunos permisos no corresponden a los registrados' }

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
        
        const idsAreasAAsignar =  [...new Set(cAreasProgamaUsuario.map( ({idArea})=>idArea))];
        const idsProgramasAAsignar =  [...new Set(cAreasProgamaUsuario.map( ({idPrograma})=>idPrograma))];
        

        const cantAreas = await BD.Area.count( { where : { idArea : idsAreasAAsignar },transaction} );

        if(cantAreas !== idsAreasAAsignar.length ) throw { status : 400 , message : 'Algunas areas no corresponden a las registradas' }

        const cantProgramas = await BD.Programa.count( { where : { idPrograma : idsProgramasAAsignar },transaction} );

        if(cantProgramas !== idsProgramasAAsignar.length ) throw { status : 400 , message : 'Algunos programas no corresponden a los registrados' }


        await BD.AreaProgramaUsuario.bulkCreate(
            cAreasProgamaUsuario.map( area => area.dataValues),
            {
                transaction ,
                ignoreDuplicates : true
            }
        );

        await transaction.commit();

        return {
            usuario : {...usuario.dataValues},
            persona : {...persona.dataValues},
            areas : data.areas,
            categorias : data.categorias,
            permisos : data.permisos
        };

    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

export const bajaUsuario = async(idUsuario : string) => {
    try {
        const respuesta = await BD.Usuario.destroy({where : { idUsuario }});
        if(respuesta < 1) {
            console.log( 'usuario no encontrado' );
        }
    } catch (error) {
        throw error;
    }
}