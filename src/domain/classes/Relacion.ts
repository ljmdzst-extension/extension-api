
import TipoRelacion, { ID_TIPO_REL, TDataTipoRelacion }  from "./TipoRelacion";


type ID_RELACION = number;

type TDataRelacion = {
    idRelacion : ID_RELACION;
    nom : string;
    tipoRelacion ?: TDataTipoRelacion;
}



class Relacion{
    private idRelacion !: ID_RELACION;
    private nom !: string;
    private iTipoRelacion !: TipoRelacion;
    constructor( _data : TDataRelacion, tp : TipoRelacion ){
        this.idRelacion = _data.idRelacion;
        this.nom = _data.nom;
        this.iTipoRelacion = tp;
    }
    
    public verID() : ID_RELACION  {
        return this.idRelacion;
    }
    
    public verDatos () : TDataRelacion   {
        return {
            idRelacion : this.idRelacion,
            nom : this.nom,
            tipoRelacion : this.iTipoRelacion.verDatos()
        }
    }

    public verTipoRelacion() : ID_TIPO_REL  { 
        return this.iTipoRelacion.verDatos().idTipoRelacion;
    } 


} 

export { ID_RELACION,TDataRelacion }

export default Relacion;