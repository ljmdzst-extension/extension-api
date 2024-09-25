import Area from "./area";
import Programa, { TPrograma } from "./programa";

export type TPeriodoDeTrabajo = {
    anio : number, 
    listaProgramas : TPrograma[]
}

export default class PeriodoDeTrabajo {
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

    
    verDatos() : TPeriodoDeTrabajo {
        return {
            anio : this.anio,
            listaProgramas : this.cProgramas.map( p => p.verDatos())
        }
    }
}