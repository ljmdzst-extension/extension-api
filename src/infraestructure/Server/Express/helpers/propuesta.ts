import { Model, Op, Transaction } from "sequelize";


export const generarOpcionesRemove = ( key : string,  foreignKey : string , model : any ,items : Model[], transaction ?: Transaction ) =>{
    return {
        transaction ,
        where : {
            [Op.not] : {
                [key] : model[key],
                [foreignKey] : items.map( (item : any) => item[foreignKey])
            }
        }
    }
}

export const armarCantPropuestasXModalidad = ( cant : number )=>
        cant < 10 ? `0${cant}` : `${cant}`;