import Area from "./Area";
import Programa, { TDataPrograma } from "./Programa";

export type TDataProgramasHabilidatosDelUsuario = {
    anio : number, 
    listaProgramas : TDataPrograma[]
}

export default class ProgramasHabilitadosDelUsuario {
    constructor( 
        private anio : number,
        private cProgramas : Programa[]
    ){}

    altaPrograma( p : Programa ) {
        if(!this.cProgramas.find( _p => _p.verID() === p.verID() )){
            this.cProgramas.push( p );
        }
    }

    bajaProgram( idPrograma : number ) {
        this.cProgramas = this.cProgramas.filter( p => p.verID() !== idPrograma );
    }

    altaAreaHabilitada( idPrograma : number, a : Area ) {
        const p = this.cProgramas.find( p => p.verID() === idPrograma);
        if( p ) {
            p.altaArea( a );
        }
    }

    bajaAreaHabilitada( idPrograma : number, idArea : number ) {
        const p = this.cProgramas.find( p => p.verID() === idPrograma);
        if( p ) {
            p.bajaArea( idArea );
        }
    }

    
    verDatos() : TDataProgramasHabilidatosDelUsuario{
        return {
            anio : this.anio,
            listaProgramas : this.cProgramas.map( p => p.verDatos())
        }
    }
}