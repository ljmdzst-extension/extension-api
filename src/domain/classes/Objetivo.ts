import  TipoObjetivo, { ID_TIPO_OBJ, TDataTipoObjetivo }  from "./TipoObjetivo";


type ID_OBJETIVO= number;


type TDataObjetivo =  {
    idObjetivo : ID_OBJETIVO,
    nom : string,
    tipoObjetivo ?: TDataTipoObjetivo,
    detalle ?: string,
}

class Objetivo {

    private idObjetivo !: ID_OBJETIVO;
    private nom : string;
    private detalle ?: string;

    private iTipoObjetivo !: TipoObjetivo;

    constructor ( _data : TDataObjetivo, ito : TipoObjetivo  ){
        this.idObjetivo = _data.idObjetivo;
        this.nom = _data.nom;
        this.detalle = _data.detalle;

        this.iTipoObjetivo = ito;
    }

    public verID() : ID_OBJETIVO 
    {
        return this.idObjetivo;
    }

    public verDatos() : TDataObjetivo
    {
        return {
            idObjetivo : this.idObjetivo,
            nom : this.nom,
            detalle : this.detalle,
            tipoObjetivo : this.iTipoObjetivo.verDatos()
        }
    }

 
    public verTipoObjetivo() : ID_TIPO_OBJ 
    { 
        return this.iTipoObjetivo.verDatos().idTipoObj ; 
    } 

   
 } 
    

export {TDataObjetivo,ID_OBJETIVO}
export default Objetivo;