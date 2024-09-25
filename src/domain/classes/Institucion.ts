
export type TInstitucion = {
    ID : number,
    nom : string,
    ubicacion ?: string | undefined,
    cSubInstituciones ?: TInstitucion[]
}

export default class Institucion {
    private ID !:  number;
    private nom !:  string;
    private ubicacion ?: string;  

    private cSubInstituciones !: Institucion[];

    constructor ( _data : TInstitucion ){
        this.ID = _data.ID;
        this.nom = _data.nom;
        this.ubicacion = _data.ubicacion;
    }

    public editarDatos ( _data : TInstitucion ) {
        this.ID = _data.ID;
        this.nom = _data.nom;
        this.ubicacion = _data.ubicacion;
    } 

    public verDatos () :TInstitucion {
        return {
            ID :this.ID , 
            nom :this.nom , 
            ubicacion :this.ubicacion ,
            cSubInstituciones : this.cSubInstituciones.map( subi => subi.verDatos())
        }
    }

    public altaSubInstitucion( i : Institucion ) {
         if(!this.cSubInstituciones.find( _i => _i.verDatos().ID === i.verDatos().ID)){
            this.cSubInstituciones.push(i);
         }
    }
    public bajaSubInstitucion( ID : number) {
        if(this.cSubInstituciones.find( i => i.verDatos().ID === ID)){
            this.cSubInstituciones = this.cSubInstituciones.filter( i => i.verDatos().ID !== ID);
        }
    }
    
}
