

type ID_PROG_SIPPE = number;

type TDataProgramaSIPPE = {
    idProgramaSippe : ID_PROG_SIPPE;
    nom : string;
}


class ProgramaSIPPE{
    private idProgramaSippe !: ID_PROG_SIPPE;
    private nom !: string;
    constructor  ( _data : TDataProgramaSIPPE){
        this.idProgramaSippe= _data.idProgramaSippe;
        this.nom= _data.nom;
    }

    public verID() : ID_PROG_SIPPE  {
        return this.idProgramaSippe;
    }
   
    public verDatos() : TDataProgramaSIPPE {
        return {
            idProgramaSippe : this.idProgramaSippe,
            nom : this.nom
        };
    }

 


}

export {ID_PROG_SIPPE,TDataProgramaSIPPE};

export default ProgramaSIPPE;