import { response } from "express";

export const indexarJsons = (lista : Array<any>, indice : string) => lista.reduce(
    (salida , elemento : any )=>({
        ...salida,
        [elemento[indice]] : {...elemento}
    })
    ,{}
)

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
            ...[salida[elemento[indice]]],
            elemento.dataValues
        ]
    })
,{});


export const splitNuevosRegistros = ( registros : Array<any>, indice : string ) : {
    NUEVOS : any[],
    VIEJOS : any[]
} => {
    let salida = {
        VIEJOS : <any>[],
        NUEVOS : <any>[]
    }

    if(registros.length){
        registros.forEach( registro => {
            if( registro[indice] !== 0 ){
                salida.VIEJOS.push( registro );
            } else {
                salida.NUEVOS.push( registro);
            }
        })
    }

    return salida;
}


export namespace HttpHelpers {
    export const responderPeticionOk = ( resp : typeof response,  data : any )=> resp.status(200).json({
        ok : true,
        data : data,
        error : null
    });

    export const responderPeticionError = ( resp : typeof response, message ?: string,status ?: number) => resp.status(status || 500).json({
        ok : false,
        data : null,
        error : message || 'error de servidor'
    })
}


