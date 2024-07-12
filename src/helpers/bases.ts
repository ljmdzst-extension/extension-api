import { IPrograma } from '../classes/Programa';
import { Area } from '../models/Area';
import { AreaProgramaCategoriaUsuario } from '../models/AreaProgramaCategoriaUsuario';
import { Programa } from '../models/Programa';



export const mapearAnioProgramasAreas = (  programas : Programa[], areas : Area[], lAreaProgramas : AreaProgramaCategoriaUsuario[] )=>{
    let salida : ({
        anio : number,
        listaProgramas : IPrograma[]
    })[] = [];

    const anios : Set<number> = new Set();
    lAreaProgramas.forEach( ah => anios.add(ah.anio));
    anios.forEach( a => {
        const apsDelAnio = lAreaProgramas.filter( ap => ap.anio === a);
        const listaProgramas : IPrograma [ ] = [];
        
        apsDelAnio.forEach( apa => {
            
            let itemProg = listaProgramas.find( _p => _p.idPrograma === apa.idPrograma);
            if(!itemProg) {
                itemProg = { 
                    idPrograma : apa.idPrograma, 
                    nom : `${programas.find( p => p.idPrograma === apa.idPrograma)?.nom}` ,
                    listaAreas : []  
                } 
                listaProgramas.push( itemProg )

            }
            const area = areas.find( a => a.idArea === apa.idArea );
            if(area && itemProg.listaAreas.every( a => a.idArea !== area.idArea)) {
                itemProg.listaAreas.push(area.dataValues);
            }
            

        });
        salida = [ 
            ...salida, 
            {
                anio : a,
                listaProgramas : listaProgramas
            }
        ]  
    });

    return salida;
}