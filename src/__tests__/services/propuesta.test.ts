import dotenv from 'dotenv'
dotenv.config({path : '.env.test'});
import {describe,test,expect,jest} from '@jest/globals'
import PropuestaPrueba from '../__data__/PropuestaPrueba.test.json'
import PruebaIntegrante from '../__data__/PruebaIntegrante.test.json'
import ServiciosPropuesta from '../../services/propuesta'
import sequelizeExtension from '../../config/dbConfig';
import { initModels } from '../../models/init-models';



describe('Pruebas en services/propuesta', () => { 

    const SPropuesta = new ServiciosPropuesta();
    const {Propuesta} = initModels(sequelizeExtension);

    beforeAll(()=>{jest.resetAllMocks()})

    test('La salida services/propuesta.verDatos() debe ser un JSON de tipo TPropuestaOut', async() => { 
        const iPropuesta = await Propuesta.findByPk('23-02-PEIS-FHUC-ML')
    
       
        if(iPropuesta) {
            await SPropuesta.leerDatosDeBD(iPropuesta);

            let dataPropuesta = SPropuesta.verDatos(iPropuesta);
            
            expect(JSON.stringify(dataPropuesta)).toBe(JSON.stringify(PropuestaPrueba));

        } else {

            console.log('error al obtener data de BD');

        }
     
    })
    
    
    test('services/propuesta.editarDatos() debe editar  y mostrar la data correctamente', async() => { 

        const {Propuesta} = initModels(sequelizeExtension);

        const iPropuesta = await Propuesta.findByPk('23-02-PEIS-FHUC-ML')
        const nuevaData = {
            ...PropuestaPrueba, 
            integrantes : [
                ...PropuestaPrueba.integrantes,
                PruebaIntegrante
            ]}

        if(iPropuesta) {
            SPropuesta.editarDatos(iPropuesta,nuevaData);
            
            let dataPropuesta = SPropuesta.verDatos(iPropuesta);

            expect(dataPropuesta.integrantes).toBe(nuevaData.integrantes);

        } else {

            console.log('error al obtener data de BD');

        }
     
    })
    

 })