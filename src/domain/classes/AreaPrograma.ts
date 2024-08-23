import Area from "./Area";
import Programa from "./Programa";

export default class AreaPrograma {

    constructor(
        private anio : number ,
        private area : Area , 
        private programa : Programa
    ){}

    verArea(){return this.area;}

    verPrograma(){return this.programa;}

    verIdPrograma(){return this.programa.verID()}

    verIdArea(){return this.area.verID()}

    verAnio(){return this.anio}

}