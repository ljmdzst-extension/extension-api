
export const indexar = ( registros : Array<any>, indice : string )=> registros.reduce(
        (salida , elemento : any )=>({
            ...salida,
            [elemento[indice]] : elemento.dataValues
        })
    ,{});

    /**
     * Indexa una tabla asociación donde puede haber 1 o n registros que hacer referencia a la 
     * misma foreing key.
     * @param registros Array de registros a indexar
     * @param indice Campo que se usará como índice de referencia ( único para cada elemento )
     * @returns /{ [indice] : [ {data1}, {data2}] } Registros indexados , donde cada índice contiene un arreglo con todos los registros asociados
     * a ese índice. Serían los registros que tienen una relación con el mismo registro de otra tabla.
     */
export const indexarAsociacion = ( registros : Array<any>, indice : string )=> registros.reduce(
    (salida , elemento : any )=>({
        ...salida,
        [elemento[indice]] : [
            ...salida[elemento[indice]],
            elemento.dataValues
        ]
    })
,{});