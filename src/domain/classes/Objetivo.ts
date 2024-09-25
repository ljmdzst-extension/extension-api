import  TipoObjetivo, { TTipoObjetivo }  from "./tipo-objetivo";


type ID_OBJETIVO= number;


type TObjetivo =  {
    idObjetivo : ID_OBJETIVO,
    nom : string,
    tipoObjetivo ?: TTipoObjetivo,
    detalle ?: string,
}

class Objetivo {

    private idObjetivo !: ID_OBJETIVO;
    private nom : string;
    private detalle ?: string;

    private iTipoObjetivo !: TipoObjetivo;

    constructor ( _data : TObjetivo, ito : TipoObjetivo  ){
        this.idObjetivo = _data.idObjetivo;
        this.nom = _data.nom;
        this.detalle = _data.detalle;

        this.iTipoObjetivo = ito;
    }

    public verID() : ID_OBJETIVO 
    {
        return this.idObjetivo;
    }

    public verDatos() : TObjetivo
    {
        return {
            idObjetivo : this.idObjetivo,
            nom : this.nom,
            detalle : this.detalle,
            tipoObjetivo : this.iTipoObjetivo.verDatos()
        }
    }

 
    public verTipoObjetivo() : number 
    { 
        return this.iTipoObjetivo.verDatos().ID ; 
    } 

   
 } 
    

export {TObjetivo,ID_OBJETIVO}
export default Objetivo;