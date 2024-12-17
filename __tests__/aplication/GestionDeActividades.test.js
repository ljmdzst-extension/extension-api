"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GestionDeActividades_1 = __importDefault(require("../../src/aplication/GestionDeActividades"));
const domain_1 = require("../../src/domain");
const actividad_1 = __importDefault(require("../../src/infraestructure/db/db-testing/actividad"));
const actividad_2 = __importDefault(require("../../src/infraestructure/validators/actividad"));
const mockBuscarPorId = jest.spyOn(actividad_1.default.prototype, 'buscarPorId')
    .mockImplementation((idActividad) => __awaiter(void 0, void 0, void 0, function* () {
    return new domain_1.domain.Actividad({ idActividad, idArea: 1, desc: 'actividad de prueba' });
}));
const mockGuardarDatos = jest.spyOn(actividad_1.default.prototype, 'guardarDatos')
    .mockImplementation((actividad) => __awaiter(void 0, void 0, void 0, function* () {
    return actividad;
}));
const mockDarDeBaja = jest.spyOn(actividad_1.default.prototype, 'darDeBaja')
    .mockImplementation((idActividad) => __awaiter(void 0, void 0, void 0, function* () {
    return true;
}));
const mockValidar = jest
    .spyOn(actividad_2.default.prototype, 'validar')
    .mockImplementation((data) => {
    return true;
});
const mockValidarIdActividad = jest
    .spyOn(actividad_2.default.prototype, 'validarIdActividad')
    .mockImplementation((idActividad) => {
    return true;
});
const mockMActividad = jest.mock('../../src/infraestructure/db/db-testing/actividad', () => {
    return jest.fn().mockImplementation(() => {
        return {
            buscarPorId: mockBuscarPorId,
            buscarPor: jest.fn(),
            verLista: jest.fn(),
            guardarDatos: mockGuardarDatos,
            darDeBaja: mockDarDeBaja
        };
    });
});
describe('Pruebas en aplication/GestionDeActividades', () => {
    beforeEach(() => {
        mockMActividad.clearAllMocks();
    });
    const dataAct = {
        idActividad: 1,
        idArea: 1,
        desc: 'actividad de prueba'
    };
    test('debe dar de alta una actividad', () => __awaiter(void 0, void 0, void 0, function* () {
        yield GestionDeActividades_1.default.altaActividad(dataAct, new actividad_1.default(), new actividad_2.default());
        expect(mockValidar).toHaveBeenLastCalledWith({
            idActividad: 1,
            idArea: 1,
            desc: 'actividad de prueba',
            idUsuario: undefined,
            nro: undefined,
            fechaDesde: undefined,
            fechaHasta: undefined,
            motivoCancel: undefined,
            listaMetas: undefined,
            listaEnlaces: undefined,
            listaFechaPuntuales: undefined,
            listaInstituciones: undefined,
            listaObjetivos: undefined,
            listaProgramaSIPPPEs: undefined,
            listaUbicaciones: undefined,
        });
        expect(mockGuardarDatos).toHaveBeenCalledTimes(1);
        expect(mockGuardarDatos).toHaveBeenCalledWith(new domain_1.domain.Actividad(dataAct));
    }));
    test('debe editar una actividad , llamando a los métodos para dar de alta cada instancia asociada', () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g;
        const nuevaData = Object.assign(Object.assign({}, dataAct), { listaMetas: [{ idMeta: 1, descripcion: 'meta de prueba' }], listaEnlaces: [{ idEnlace: 1, desc: 'enlace de prueba', link: 'http://asd.com' }], listaFechaPuntuales: [{ idFecha: 1, fecha: new Date() }], listaInstituciones: [{ idInstitucion: 1, nom: 'institucion de prueba' }], listaObjetivos: [{ idObjetivo: 1, nom: 'Objetivo est 1', tipoObjetivo: { idTipoObj: 1, nom: 'O.E.' } }], listaProgramaSIPPPEs: [{ idProgramaSippe: 1, nom: 'DDHH' }], listaUbicaciones: [{ idUbicacion: 1, enlace: 'http://asd.com' }] });
        const a = yield GestionDeActividades_1.default.editarActividad(nuevaData, new actividad_1.default(), new actividad_2.default());
        expect(mockValidar).toHaveBeenCalledTimes(1);
        expect(mockGuardarDatos).toHaveBeenCalledTimes(1);
        expect((_a = a.verDatos().listaEnlaces) === null || _a === void 0 ? void 0 : _a.length).toBe(1);
        expect((_b = a.verDatos().listaMetas) === null || _b === void 0 ? void 0 : _b.length).toBe(1);
        expect((_c = a.verDatos().listaFechaPuntuales) === null || _c === void 0 ? void 0 : _c.length).toBe(1);
        expect((_d = a.verDatos().listaInstituciones) === null || _d === void 0 ? void 0 : _d.length).toBe(1);
        expect((_e = a.verDatos().listaObjetivos) === null || _e === void 0 ? void 0 : _e.length).toBe(1);
        expect((_f = a.verDatos().listaProgramaSIPPPEs) === null || _f === void 0 ? void 0 : _f.length).toBe(1);
        expect((_g = a.verDatos().listaUbicaciones) === null || _g === void 0 ? void 0 : _g.length).toBe(1);
    }));
    test('debe dar de baja una actividad', () => __awaiter(void 0, void 0, void 0, function* () {
        yield GestionDeActividades_1.default.bajaActividad(1, new actividad_1.default(), new actividad_2.default());
        expect(mockValidarIdActividad).toHaveBeenCalledTimes(1);
        expect(mockBuscarPorId).toHaveBeenCalledTimes(1);
        expect(mockDarDeBaja).toHaveBeenCalledTimes(1);
        expect(mockDarDeBaja).toHaveBeenCalledWith(1);
    }));
});
