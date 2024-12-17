import {domain} from "../../src/domain"


describe('Pruebas en domain/Actividad', () => { 

    const DATA_ACT_PRUEBA = {
        idActividad : 1,
        idArea :1,
        idUsuario : 'abacasdasgfasg123124124',
        desc : 'actividad de prueba'
    }

    test('debe poder crear una instancia y mostrar la data correctamente', () => { 

        const actividad = new domain.Actividad(DATA_ACT_PRUEBA);

        expect( actividad ).toBeInstanceOf(domain.Actividad);

     })

    test('debe poder dar de alta una meta y mostar sus datos', () => { 
        const actividad = new domain.Actividad(DATA_ACT_PRUEBA);

        actividad.altaMeta( new domain.Meta({ idMeta : 1, descripcion : 'meta de prueba',resultado : 'resultado de prueba' , observaciones : '-', valoracion : 1 }));

        expect(actividad.verDatos().listaMetas?.length).toBe(1);
        expect(actividad.verDatos().listaMetas?.at(0)).toEqual(
            { idMeta : 1, descripcion : 'meta de prueba',resultado : 'resultado de prueba' , observaciones : '-', valoracion : 1 }
        );
        


     })

     test('debe poder dar de baja una meta', () => { 
        const actividad = new domain.Actividad(DATA_ACT_PRUEBA);

        actividad.altaMeta( new domain.Meta({ idMeta : 1, descripcion : 'meta de prueba',resultado : 'resultado de prueba' , observaciones : '-', valoracion : 1 }));
        actividad.bajaMeta( 1 );

        expect( actividad.verMetas().length).toBe(0);
        expect(actividad.verDatos().listaMetas?.length).toBe(0);
      })

     test('debe poder dar de alta un objetivo y mostar sus datos', () => { 
        const actividad = new domain.Actividad(DATA_ACT_PRUEBA);
        const obj = new domain.Objetivo({idObjetivo : 1 , nom : 'Objetivo 1' , detalle : '-'}, new domain.TipoObjetivo({idTipoObj: 1, nom : 'Objetivo Institucional'}));
        actividad.altaObjetivo(obj);
        
        expect(actividad.verObjetivos().length).toBe(1);
        expect(actividad.verDatos().listaObjetivos?.at(0)).toEqual(obj.verDatos());

    })
     test('debe poder dar de baja  un objetivo ', () => {
        const actividad = new domain.Actividad(DATA_ACT_PRUEBA);
        const obj = new domain.Objetivo({idObjetivo : 1 , nom : 'Objetivo 1' , detalle : '-'}, new domain.TipoObjetivo({idTipoObj: 1, nom : 'Objetivo Institucional'}));
        actividad.altaObjetivo(obj);
        actividad.bajaObjetivo(1);
        expect(actividad.verObjetivos().length).toBe(0);
        expect(actividad.verDatos().listaObjetivos?.length).toBe(0);
      })

     test('debe poder dar de alta un prog SIPPE y mostar sus datos', () => { 
        const actividad = new domain.Actividad(DATA_ACT_PRUEBA);
        const progSIPPE = new domain.ProgramaSIPPE({idProgramaSippe : 1 ,nom : 'Alimentos saludables'});
        actividad.altaProgramaSIPPPE(progSIPPE);
        
        expect(actividad.verProgramaSIPPPEs().length).toBe(1);
        expect(actividad.verDatos().listaProgramaSIPPPEs?.at(0)).toEqual(progSIPPE.verDatos());
     })


     test('debe poder dar de baja  un prog SIPPE ', () => {
        const actividad = new domain.Actividad(DATA_ACT_PRUEBA);
        const progSIPPE = new domain.ProgramaSIPPE({idProgramaSippe : 1 ,nom : 'Alimentos saludables'});
        actividad.altaProgramaSIPPPE(progSIPPE);
        actividad.bajaProgramaSIPPPE(1);
        expect(actividad.verProgramaSIPPPEs().length).toBe(0);
        expect(actividad.verDatos().listaProgramaSIPPPEs?.length).toBe(0);
      })

     test('debe poder dar de alta una ubicacion y mostar sus datos', () => {
        const actividad = new domain.Actividad(DATA_ACT_PRUEBA);
        const ubic = new domain.Ubicacion({idUbicacion : 1 , enlace : 'http://mapa1.com/abc123'});
        actividad.altaUbicacion(ubic);
        
        expect(actividad.verUbicacions().length).toBe(1);
        expect(actividad.verDatos().listaUbicaciones?.at(0)).toEqual(ubic.verDatos());
      })
     test('debe poder dar de baja  una ubicacion ', () => {
        const actividad = new domain.Actividad(DATA_ACT_PRUEBA);
        const ubic = new domain.Ubicacion({idUbicacion : 1 , enlace : 'http://mapa1.com/abc123'});
        actividad.altaUbicacion(ubic);
        actividad.bajaUbicacion(1);
        expect(actividad.verUbicacions().length).toBe(0);
        expect(actividad.verDatos().listaUbicaciones?.length).toBe(0);

      })

     test('debe poder dar de alta una fecha puntual y mostar sus datos', () => {
        const actividad = new domain.Actividad(DATA_ACT_PRUEBA);
        const fecha = new domain.FechaPuntual({idFecha : 1 , fecha : new Date()});
        actividad.altaFechaPuntual(fecha);
        
        expect(actividad.verFechaPuntuals().length).toBe(1);
        expect(actividad.verDatos().listaFechaPuntuales?.at(0)).toEqual(fecha.verDatos());
      })
     test('debe poder dar de baja una fecha puntual', () => { 
        const actividad = new domain.Actividad(DATA_ACT_PRUEBA);
        const fecha = new domain.FechaPuntual({idFecha : 1 , fecha : new Date()});
        actividad.altaFechaPuntual(fecha);
        actividad.bajaFechaPuntual(1);
        expect(actividad.verFechaPuntuals().length).toBe(0);
        expect(actividad.verDatos().listaFechaPuntuales?.length).toBe(0);
     })

     test('debe poder dar de alta una institucion y mostar sus datos', () => {
        const actividad = new domain.Actividad(DATA_ACT_PRUEBA);
        const inst = new domain.Institucion({idInstitucion : 1 , nom: 'Institucion de prueba',ubicacion : 'http://mapa1.com/abc123'});
        actividad.altaInstitucion(inst);
        
        expect(actividad.verInstitucions().length).toBe(1);
        expect(actividad.verDatos().listaInstituciones?.at(0)).toEqual(inst.verDatos());
      })
     test('debe poder dar de baja una insttiucion ', () => { 
        const actividad = new domain.Actividad(DATA_ACT_PRUEBA);
        const inst = new domain.Institucion({idInstitucion : 1 , nom: 'Institucion de prueba',ubicacion : 'http://mapa1.com/abc123'});
        actividad.altaInstitucion(inst);
        actividad.bajaInstitucion(1);
        expect(actividad.verInstitucions().length).toBe(0);
        expect(actividad.verDatos().listaInstituciones?.length).toBe(0);
     })


     test('debe poder editar una meta ', () => { 
        const actividad = new domain.Actividad(DATA_ACT_PRUEBA);
        const meta =  new domain.Meta({ idMeta : 1, descripcion : 'meta de prueba',resultado : 'resultado de prueba' , observaciones : '-', valoracion : 1 });
        actividad.altaMeta(meta);
        const dataMeta = actividad.verDatos().listaMetas?.at(0);
        const dataModificada = {...dataMeta,resultado : 'resultado modificado',idMeta : 1,descripcion : '-'};
        actividad.editarMeta(1,dataModificada);
        expect(meta.verDatos()).toEqual(dataModificada);
        expect(actividad.verDatos().listaMetas?.at(0)).toEqual(dataModificada);
      })
     test('debe poder editar una institucion ', () => { 
        const actividad = new domain.Actividad(DATA_ACT_PRUEBA);
        const inst = new domain.Institucion({idInstitucion : 1 , nom: 'Institucion de prueba',ubicacion : 'http://mapa1.com/abc123'});
        actividad.altaInstitucion(inst);


        actividad.editarInstitucion(1,{ ...inst.verDatos(), ubicacion : 'http://mapa2.com'});

        expect(actividad.verDatos().listaInstituciones?.at(0)).toEqual({ ...inst.verDatos(), ubicacion : 'http://mapa2.com'});

      })

 })