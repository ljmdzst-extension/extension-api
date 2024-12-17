"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const domain_1 = require("../../src/domain");
const Categoria_1 = __importDefault(require("../../src/domain/classes/Categoria"));
describe('Pruebas en domain/Usuario', () => {
    const p = new domain_1.domain.Persona({ tipoDoc: 1, nroDoc: '12345678', ape: 'Perez', nom: 'Juan' });
    const c = new domain_1.domain.Categoria({ idCategoria: 1, nombre: 'ADMIN' });
    const permisoMetasLectura = new domain_1.domain.Permiso({ idPermiso: 1, nombre: 'METAS_LECTURA' });
    const permisoMetasEdicion = new domain_1.domain.Permiso({ idPermiso: 2, nombre: 'METAS_EDICION' });
    const dataUsuario = {
        idUsuario: 'abc1234gsdasd',
        email: 'jperez@mail.com',
        pass: 'perez1',
        idUnidadAcademica: 1,
        pendiente: 0
    };
    test(' debe crear una nueva instancia con la data correcta', () => {
        const u = new domain_1.domain.Usuario(dataUsuario, p, c, [permisoMetasEdicion, permisoMetasLectura]);
        expect(u).toBeInstanceOf(domain_1.domain.Usuario);
        expect(u.verDatos()).toEqual({
            idUsuario: 'abc1234gsdasd',
            email: 'jperez@mail.com',
            pass: 'perez1',
            idUnidadAcademica: 1,
            pendiente: 0,
            persona: p.verDatos(),
            categoria: c.verDatos(),
            listaPermisos: [
                permisoMetasEdicion.verDatos(),
                permisoMetasLectura.verDatos()
            ]
        });
    });
    test(' debe dar de alta un permiso ', () => {
        var _a, _b;
        const u = new domain_1.domain.Usuario(dataUsuario, p, c, []);
        u.altaPermiso(permisoMetasLectura);
        expect((_a = u.verDatos().listaPermisos) === null || _a === void 0 ? void 0 : _a.length).toBe(1);
        expect((_b = u.verDatos().listaPermisos) === null || _b === void 0 ? void 0 : _b.at(0)).toEqual(permisoMetasLectura.verDatos());
    });
    test(' debe dar de baja un permiso', () => {
        var _a, _b, _c;
        const u = new domain_1.domain.Usuario(dataUsuario, p, c, []);
        u.altaPermiso(permisoMetasLectura);
        u.altaPermiso(permisoMetasEdicion);
        const cantPermisos = ((_a = u.verDatos().listaPermisos) === null || _a === void 0 ? void 0 : _a.length) || 0;
        u.bajaPermiso(1);
        expect((_b = u.verDatos().listaPermisos) === null || _b === void 0 ? void 0 : _b.length).toBe(cantPermisos - 1);
        expect((_c = u.verDatos().listaPermisos) === null || _c === void 0 ? void 0 : _c.at(0)).toEqual(permisoMetasEdicion.verDatos());
    });
    test('debe poder cambiar de categoria', () => {
        const u = new domain_1.domain.Usuario(dataUsuario, p, c, []);
        const cEyc = new Categoria_1.default({ idCategoria: 2, nombre: 'EYC' });
        u.cambiarCategoria(cEyc);
        expect(u.verDatos().categoria).toEqual(cEyc.verDatos());
    });
    test('debe poder cambiar de pendiente a no pendiente', () => {
        const u = new domain_1.domain.Usuario(dataUsuario, p, c, []);
        u.cambiarANoPendiente();
        expect(u.verDatos().pendiente).toBe(0);
    });
});
