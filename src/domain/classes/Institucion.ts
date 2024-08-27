
export type ID_INSTITUCION = number;

export type TDataInstitucion = {
    idInstitucion : ID_INSTITUCION,
    nom : string,
    ubicacion ?: string | undefined
}

/* 
  IMPLEMENTAR CONEXION A api db_instituciones 
  .....
*/

class Institucion {
    private idInstitucion !:  ID_INSTITUCION;
    private nom !:  string;
    private ubicacion ?: string;  

    constructor ( _data : TDataInstitucion ){
        this.idInstitucion = _data.idInstitucion;
        this.nom = _data.nom;
        this.ubicacion = _data.ubicacion;
    }

    public editarDatos ( _data : TDataInstitucion ) {
        this.idInstitucion = _data.idInstitucion;
        this.nom = _data.nom;
        this.ubicacion = _data.ubicacion;
    } 

    public verDatos () :TDataInstitucion {
        return {
            idInstitucion :this.idInstitucion , 
            nom :this.nom , 
            ubicacion :this.ubicacion 
        }
    }

   
    
    
}

export default Institucion;