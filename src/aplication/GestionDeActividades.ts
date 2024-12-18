import {domain} from '../domain';

export default class GestionDeActividades {

    static async altaActividad ( 
        data : domain.TActividad, 
        MActividad : domain.IModelActividad ,
        MArea : domain.IModelArea,
        MUsuario : domain.IModelUsuario,
        VActividad : domain.IValidatorActividad 
    ) : Promise<domain.Actividad> {
        
        
        if(!VActividad.validar(data)) throw new Error('data actividad inválida, revise los campos');

        const area = await MArea.buscarPorId(data.ID);

        if(!area) throw new Error('área inexistente con ese ID');

        const usr = await MUsuario.buscarPorId(`${data.idUsuario}`);

        if(!usr) throw new Error('usuario no econtrado con ese idUsuario');

        let nuevaActividad = new domain.Actividad(data,area,usr);

        nuevaActividad = await MActividad.guardarDatos(nuevaActividad);
        
        return nuevaActividad ;

    } 

    static async editarActividad( data : Partial<domain.TActividad> , MActividad : domain.IModelActividad , VActividad : domain.IValidatorActividad ) : Promise<domain.Actividad> {

        if(!data.ID) throw new Error('ID obligatorio');
        
        if(!VActividad.validar(data)) throw new Error('data actividad inválida, revise los campos');

        const actividad = await MActividad.buscarPorId(data.ID);

        if(!actividad) throw new Error(`No existe actividad de id ${data.ID}`);

        actividad.editar(data);

        if( data.listaEnlaces ) {
            data.listaEnlaces.forEach( dataEnlace => {
                if(!actividad.editarEnlace(dataEnlace.ID,dataEnlace)){
                    actividad.altaEnlace(new domain.Enlace(dataEnlace));
                } 
            } )
        }

        if(data.listaFechaPuntuales) {
            data.listaFechaPuntuales.forEach( dataFechaPuntual => {
                if(!actividad.findFechaPuntual(dataFechaPuntual.ID)){
                    actividad.altaFechaPuntual(new domain.FechaPuntual(dataFechaPuntual));
                }
            })
        }

        if(data.listaInstituciones){
            data.listaInstituciones.forEach( dataInstitucion => {
                if(!actividad.editarInstitucion(dataInstitucion.ID,dataInstitucion)){
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
       

        return  await MActividad.guardarDatos(actividad);
    }

    static async bajaActividad( ID : number, MActividad : domain.IModelActividad, VActividad : domain.IValidatorActividad) : Promise<boolean> {
        let salida = false;
        
        if(!VActividad.validarIdActividad(ID)) throw new Error('data actividad inválida, revise los campos');

        const actividad = await MActividad.buscarPorId(ID);

        if(!actividad) throw new Error(`No existe actividad con ese id : ${ID}`)

        salida = await MActividad.darDeBaja(actividad);
        
        return salida;
    } 

}