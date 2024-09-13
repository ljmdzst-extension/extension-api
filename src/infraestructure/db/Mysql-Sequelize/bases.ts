import { domain } from "../../../domain"
import sequelizeExtension, { BD } from "./config/dbConfig"
import MObjetivo from "./objetivo"
import MRelacion from "./relacion"
import MAreaProgramaUsuario from "./area-programa-usuario"



export  class MBases implements domain.IModelBases {
    constructor(){}
    
    async verBases(): Promise<{ 
        areas: domain.PeriodoDeTrabajo[], 
        objetivos: domain.Objetivo[],
        relaciones: domain.Relacion[],
        categorias: domain.Categoria[],
        permisos: domain.Permiso[],
        programasSIPPE: domain.ProgramaSIPPE[]
    }> {
       let salida : { 
        areas: domain.PeriodoDeTrabajo[], 
        objetivos: domain.Objetivo[],
        relaciones: domain.Relacion[],
        categorias: domain.Categoria[],
        permisos: domain.Permiso[],
        programasSIPPE: domain.ProgramaSIPPE[]
    } = {
        areas: [],
           objetivos: [],
           relaciones: [],
           categorias: [],
           permisos: [],
           programasSIPPE: []
       }
       const transaction = await sequelizeExtension.transaction({logging : process.env.NODE_MODULES==='development' ? sql => console.log(sql) : undefined});

       try {
            salida.objetivos = await MObjetivo.buscarTodos(transaction);
            salida.relaciones = await MRelacion.buscarTodos(transaction);
            
            await Promise.all([
                BD.Categoria.findAll({transaction}).then( resp => resp.forEach( c => salida.categorias.push( new domain.Categoria(c.dataValues)  ))),
                BD.Permiso.findAll({transaction}).then( resp => resp.forEach(p => salida.permisos.push( new domain.Permiso(p.dataValues)  ))),
                BD.ProgramaSippe.findAll({transaction}).then( resp => resp.forEach(p => salida.programasSIPPE.push( new domain.ProgramaSIPPE(p.dataValues)  ))),
            ])

            salida.areas = await MAreaProgramaUsuario.verLista(transaction);

            await transaction.commit();

            return salida ;

        } catch( error : any ){
            await transaction.rollback();
            throw error;
        }


    }
    async verInstituciones(filtro: string, offset?: number, limit?: number): Promise<domain.Institucion[]> {
        throw new Error("Method not implemented.");
    }
  
   
}