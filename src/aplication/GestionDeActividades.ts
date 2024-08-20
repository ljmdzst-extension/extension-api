import {domain} from '../domain';

export default class GestionDeActividades {

    static async altaActividad ( data : domain.TDataActividad, MActividad : domain.IModelActividad , VActividad : domain.IValidatorActividad ) : Promise<domain.Actividad> {
        
        
        if(!VActividad.validar(data)) throw new Error('data actividad inválida, revise los campos');

        let nuevaActividad = new domain.Actividad(data);

        nuevaActividad = await MActividad.guardarDatos(nuevaActividad);
        return nuevaActividad ;

    } 

    static async editarActividad( data : domain.TDataActividad , MActividad : domain.IModelActividad , VActividad : domain.IValidatorActividad ) : Promise<domain.Actividad> {

        VActividad.validar(data);

        const actividad = await MActividad.buscarPorId(data.idActividad);

        if(!actividad) throw new Error(`No existe actividad de id ${data.idActividad}`);

        if( data.listaEnlaces ) {
            data.listaEnlaces.forEach( dataEnlace => {
                if(!actividad.editarEnlace(dataEnlace.idEnlace,dataEnlace)){
                    actividad.altaEnlace(new domain.Enlace(dataEnlace));
                } 
            } )
        }

        if(data.listaFechaPuntuales) {
            data.listaFechaPuntuales.forEach( dataFechaPuntual => {
                if(!actividad.findFechaPuntual(dataFechaPuntual.idFecha)){
                    actividad.altaFechaPuntual(new domain.FechaPuntual(dataFechaPuntual));
                }
            })
        }

        if(data.listaInstituciones){
            data.listaInstituciones.forEach( dataInstitucion => {
                if(!actividad.editarInstitucion(dataInstitucion.idInstitucion,dataInstitucion)){
                    actividad.altaInstitucion( new domain.Institucion(dataInstitucion));
                }
            })
        }
        if(data.listaMetas) {
            data.listaMetas.forEach( dataMeta => {
                if(!actividad.editarMeta(dataMeta.idMeta,dataMeta)){
                    actividad.altaMeta(new domain.Meta(dataMeta));
                }
            })
        }
        if(data.listaObjetivos) {
            data.listaObjetivos.forEach( dataObjetivo => {
                if((!actividad.findObjetivo(dataObjetivo.idObjetivo) ) && dataObjetivo.tipoObjetivo){
                    actividad.altaObjetivo(new domain.Objetivo(dataObjetivo,new domain.TipoObjetivo(dataObjetivo.tipoObjetivo)));
                } else {
                    console.log(`Objetivo ${dataObjetivo.nom} sin tipo objetivo, omitiendo ..`)
                }
            })
        }
        if(data.listaProgramaSIPPPEs) {
            data.listaProgramaSIPPPEs.forEach( dataProgSIPPPE => {
                if(!actividad.findProgramaSIPPPE(dataProgSIPPPE.idProgramaSippe)){
                    actividad.altaProgramaSIPPPE(new domain.ProgramaSIPPE(dataProgSIPPPE));
                }
            })
        }
        if(data.listaUbicaciones) {
            data.listaUbicaciones.forEach( dataUbic => {
                if(!actividad.findUbicacion(dataUbic.idUbicacion)){
                    actividad.altaUbicacion(new domain.Ubicacion(dataUbic));
                }
            })
        }

        return actividad;
    }

    static async bajaActividad( idActividad : number, MActividad : domain.IModelActividad, VActividad : domain.IValidatorActividad) : Promise<boolean> {

        VActividad.validarIdActividad(idActividad);

        const actividad = await MActividad.buscarPorId(idActividad);

        if(!actividad) throw new Error(`No existe actividad con ese id : ${idActividad}`)

        return MActividad.darDeBaja(actividad.verDatos().idActividad);

    } 

}