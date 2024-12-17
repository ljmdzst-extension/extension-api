

type ID_PROG_SIPPE = number;

type TProgramaSIPPE = {
    idProgramaSippe : ID_PROG_SIPPE;
    nom : string;
}


class ProgramaSIPPE{
    private idProgramaSippe !: ID_PROG_SIPPE;
    private nom !: string;
    constructor  ( _data : TProgramaSIPPE){
        this.idProgramaSippe= _data.idProgramaSippe;
        this.nom= _data.nom;
    }

    public verID() : ID_PROG_SIPPE  {
        return this.idProgramaSippe;
    }
   
    public verDatos() : TProgramaSIPPE {
        return {
            idProgramaSippe : this.idProgramaSippe,
            nom : this.nom
        };
    }

 


}

export {ID_PROG_SIPPE,TProgramaSIPPE};

export default ProgramaSIPPE;