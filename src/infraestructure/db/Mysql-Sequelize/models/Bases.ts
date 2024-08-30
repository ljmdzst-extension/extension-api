import Sequelize from "sequelize";
import { domain } from "../../../../domain";
import { Programa } from "./Programa";
import { AreaProgramaUsuario } from "./AreaProgramaUsuario";
import { Objetivo } from "./Objetivo";
import { TipoObjetivo } from "./TipoObjetivo";
import { TipoRelacion } from "./TipoRelacion";
import { Relacion } from "./Relacion";
import { Categoria } from "./Categoria";
import { Permiso } from "./Permiso";


export class MBases implements domain.IModelBases {
    constructor( private sequelize : Sequelize.Sequelize ){}
    
    async verBases(): Promise<domain.TDataBases> {
        
        let salida : domain.TDataBases = {
            areas: [],
            objetivos: [],
            relaciones: [],
            categorias: [],
            permisos: [],
            programasSIPPE: []
        }

        const transaction = await this.sequelize.transaction({logging : process.env.NODE_ENV === 'development' ? sql => console.log(sql) : undefined})

        salida.areas = await AreaProgramaUsuario.initModel(this.sequelize).verLista(transaction);

        const tiposObjetivo = await TipoObjetivo.initModel(this.sequelize).findAll({transaction});
        await Objetivo.initModel(this.sequelize).findAll({transaction}).then( resp => {
            resp.forEach( dbobj => {
                const dbto = tiposObjetivo.find( to => to.idTipoObj === dbobj.tipoObjId);
                if(dbto) {
                    salida.objetivos.push( new domain.Objetivo(dbobj.dataValues,new domain.TipoObjetivo(dbto.dataValues)));
                }
            })
        });

        const tiposRelacion = await TipoRelacion.initModel(this.sequelize).findAll({transaction});

        await Relacion.initModel(this.sequelize).findAll({transaction}).then( resp => {
            resp.forEach( dbrel => {
                const dbtr = tiposRelacion.find( tr => tr.idTipoRelacion === dbrel.idTipoRelacion);
                if(dbtr) {
                    salida.relaciones.push( new domain.Relacion(dbrel.dataValues,new domain.TipoRelacion(dbtr.dataValues)));
                }
            })
        });
        

        await Categoria.initModel(this.sequelize).findAll({transaction}).then( resp => {
            resp.forEach( dbcat => salida.categorias.push( new domain.Categoria(dbcat)));
        })

        await Permiso.initModel(this.sequelize).findAll({transaction}).then( resp => {
            resp.forEach( dbperm => salida.permisos.push( new domain.Permiso(dbperm)));
        })

        return salida;

    }
    async verInstituciones(filtro: string, offset?: number, limit?: number): Promise<domain.Institucion[]> {
        throw new Error("Method not implemented.");
    }

}