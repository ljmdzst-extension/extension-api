import { domain } from "../../../domain"
import * as Sequelize from 'sequelize';
import MObjetivo from "./objetivo"
import MRelacion from "./relacion"
import MAreaProgramaUsuario from "./area-programa-usuario"
import MInstitucion from "./institucion"
import { Categoria } from "./models/Categoria";
import { Permiso } from "./models/Permiso";
import { ProgramaSippe } from "./models/ProgramaSippe";



export  class MBases implements domain.IModelBases {
    constructor(
        private sequelize : Sequelize.Sequelize,
        private transaction ?: Sequelize.Transaction
    ){}
    
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
        salida.objetivos = await MObjetivo.buscarTodos(this.transaction);
        salida.relaciones = await MRelacion.buscarTodos(this.transaction);
        
        await Promise.all([
            Categoria.initModel(this.sequelize).findAll({transaction : this.transaction}).then( resp => resp.forEach( c => salida.categorias.push( new domain.Categoria(c.dataValues)  ))),
            Permiso.initModel(this.sequelize).findAll({transaction : this.transaction}).then( resp => resp.forEach(p => salida.permisos.push( new domain.Permiso(p.dataValues)  ))),
            ProgramaSippe.initModel(this.sequelize).findAll({transaction : this.transaction}).then( resp => resp.forEach(p => salida.programasSIPPE.push( new domain.ProgramaSIPPE(p.dataValues)  ))),
        ])

        salida.areas = await MAreaProgramaUsuario.verLista( this.transaction);

 

        return salida ;

    }
    async verInstituciones(filtro: string, offset?: number, limit?: number): Promise<domain.Institucion[]> {
        let salida : domain.Institucion[] = [];
  
        salida = await new MInstitucion(this.sequelize,this.transaction).findBy({nom : filtro},offset,limit);

        return salida;

    }
  
   
}