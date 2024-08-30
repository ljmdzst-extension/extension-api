import { domain } from "../../src/domain"
import Categoria from "../../src/domain/classes/Categoria";

describe('Pruebas en domain/Usuario', () => { 

    const p = new domain.Persona({ tipoDoc : 1, nroDoc : '12345678',ape : 'Perez', nom : 'Juan'});
    const c = new domain.Categoria({idCategoria : 1, nombre : 'ADMIN'});
    const permisoMetasLectura = new domain.Permiso({idPermiso:  1, nombre : 'METAS_LECTURA'});
    const permisoMetasEdicion = new domain.Permiso({idPermiso : 2, nombre: 'METAS_EDICION'});
    const dataUsuario =  { 
        idUsuario : 'abc1234gsdasd',
        email : 'jperez@mail.com',
        pass : 'perez1', 
        idUnidadAcademica : 1,
        pendiente : 0
    }
    test(' debe crear una nueva instancia con la data correcta', () => { 

        const u = new domain.Usuario(dataUsuario,p,c,[permisoMetasEdicion,permisoMetasLectura]);

        expect(u).toBeInstanceOf(domain.Usuario);
        expect(u.verDatos()).toEqual({
            idUsuario : 'abc1234gsdasd',
            email : 'jperez@mail.com',
            pass : 'perez1', 
            idUnidadAcademica : 1,
            pendiente : 0,
            persona : p.verDatos(),
            categoria : c.verDatos(),
            listaPermisos : [
                permisoMetasEdicion.verDatos(),
                permisoMetasLectura.verDatos()
            ]
        })

     })
    test(' debe dar de alta un permiso ', () => { 
        const u = new domain.Usuario(dataUsuario,p,c,[]);
        u.altaPermiso(permisoMetasLectura);
        expect(u.verDatos().listaPermisos?.length).toBe(1);
        expect(u.verDatos().listaPermisos?.at(0)).toEqual(permisoMetasLectura.verDatos())
     })

    test(' debe dar de baja un permiso', () => { 
        const u = new domain.Usuario(dataUsuario,p,c,[]);
        u.altaPermiso(permisoMetasLectura);
        u.altaPermiso(permisoMetasEdicion);
        const cantPermisos = u.verDatos().listaPermisos?.length || 0;

        u.bajaPermiso(1);

        expect(u.verDatos().listaPermisos?.length).toBe(cantPermisos - 1);
        expect(u.verDatos().listaPermisos?.at(0)).toEqual(permisoMetasEdicion.verDatos())

     })

    test('debe poder cambiar de categoria', ()=>{
        const u = new domain.Usuario(dataUsuario,p,c,[]);
        const cEyc = new Categoria({ idCategoria : 2, nombre : 'EYC' });
        u.cambiarCategoria( cEyc );
        expect(u.verDatos().categoria).toEqual(cEyc.verDatos());

    })

    test('debe poder cambiar de pendiente a no pendiente',()=>{
        const u = new domain.Usuario(dataUsuario,p,c,[]);
        u.cambiarANoPendiente();
        expect(u.verDatos().pendiente).toBe(0);
    })
 })