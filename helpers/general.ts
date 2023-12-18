
export const indexar = ( elementos : Array<any>, indice : string )=> elementos.reduce(
        (salida , elemento : any )=>({
            ...salida,
            [elemento[indice]] : elemento.dataValues
        })
    ,{})