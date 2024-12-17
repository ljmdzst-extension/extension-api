import GestionDeActividades from "../../src/aplication/GestionDeActividades"
import { domain } from "../../src/domain"
import MActividad from '../../src/infraestructure/db/db-testing/actividad';
import VActividad from '../../src/infraestructure/validators/actividad';


const mockBuscarPorId = jest.spyOn(MActividad.prototype,'buscarPorId')
.mockImplementation(async (idActividad : number)=>{
    return new domain.Actividad({idActividad , idArea :1, desc : 'actividad de prueba'});
});

const mockGuardarDatos = jest.spyOn(MActividad.prototype,'guardarDatos')
.mockImplementation(async (actividad : domain.Actividad)=>{

    return actividad;
});
const mockDarDeBaja =  jest.spyOn(MActividad.prototype,'darDeBaja')
.mockImplementation(async (idActividad : number)=>{
    
    return true;
});
const mockValidar = jest
.spyOn(VActividad.prototype, 'validar')
.mockImplementation((data : domain.TDataActividad) => {
  return true;
})
const mockValidarIdActividad = jest
.spyOn(VActividad.prototype, 'validarIdActividad')
.mockImplementation((idActividad : number) => {
  return true;
})

const mockMActividad = jest.mock('../../src/infraestructure/db/db-testing/actividad', ()=>{
    return jest.fn().mockImplementation(()=>{
        return {
            buscarPorId : mockBuscarPorId,
            buscarPor : jest.fn(),
            verLista : jest.fn(),
            guardarDatos : mockGuardarDatos,
            darDeBaja : mockDarDeBaja
        }
    })
});

describe('Pruebas en aplication/GestionDeActividades', () => { 
    beforeEach(()=>{
        mockMActividad.clearAllMocks();
    })
    const dataAct : domain.TDataActividad = {
        idActividad : 1,
        idArea : 1,
        desc:  'actividad de prueba'
    }
    test('debe dar de alta una actividad', async() => { 

        await GestionDeActividades.altaActividad(dataAct,new MActividad(),new VActividad());
        expect(mockValidar).toHaveBeenLastCalledWith({
            idActividad : 1,
            idArea : 1,
            desc:  'actividad de prueba',
            idUsuario : undefined,
            nro : undefined,
            fechaDesde : undefined,
            fechaHasta : undefined,
            motivoCancel : undefined,
            listaMetas : undefined,
            listaEnlaces : undefined,
            listaFechaPuntuales : undefined,
            listaInstituciones : undefined,
            listaObjetivos : undefined,
            listaProgramaSIPPPEs : undefined,
            listaUbicaciones : undefined,
        });
        expect(mockGuardarDatos).toHaveBeenCalledTimes(1);
        expect(mockGuardarDatos).toHaveBeenCalledWith(new domain.Actividad(dataAct));

     })

    test('debe editar una actividad , llamando a los métodos para dar de alta cada instancia asociada', async() => { 
        
        const nuevaData = {
            ...dataAct,
            listaMetas : [{idMeta : 1, descripcion : 'meta de prueba'}],
            listaEnlaces : [{idEnlace : 1, desc : 'enlace de prueba',link : 'http://asd.com'}],
            listaFechaPuntuales : [{idFecha : 1, fecha : new Date()}],
            listaInstituciones : [{idInstitucion : 1, nom : 'institucion de prueba'}],
            listaObjetivos : [{idObjetivo : 1, nom : 'Objetivo est 1', tipoObjetivo : { idTipoObj : 1, nom : 'O.E.' }}],
            listaProgramaSIPPPEs : [{idProgramaSippe : 1, nom : 'DDHH'}],
            listaUbicaciones : [{idUbicacion : 1, enlace : 'http://asd.com'}],
        }
        const a = await GestionDeActividades.editarActividad(nuevaData,new MActividad(),new VActividad());

        expect(mockValidar).toHaveBeenCalledTimes(1);
        expect(mockGuardarDatos).toHaveBeenCalledTimes(1);
        expect(a.verDatos().listaEnlaces?.length).toBe(1);
        expect(a.verDatos().listaMetas?.length).toBe(1);
        expect(a.verDatos().listaFechaPuntuales?.length).toBe(1);
        expect(a.verDatos().listaInstituciones?.length).toBe(1);
        expect(a.verDatos().listaObjetivos?.length).toBe(1);
        expect(a.verDatos().listaProgramaSIPPPEs?.length).toBe(1);
        expect(a.verDatos().listaUbicaciones?.length).toBe(1);

     })
    test('debe dar de baja una actividad', async() => { 
        await GestionDeActividades.bajaActividad(1,new MActividad(),new VActividad());


        expect(mockValidarIdActividad).toHaveBeenCalledTimes(1);
        expect(mockBuscarPorId).toHaveBeenCalledTimes(1);
        expect(mockDarDeBaja).toHaveBeenCalledTimes(1);
        expect(mockDarDeBaja).toHaveBeenCalledWith(1);
        


     })

 })