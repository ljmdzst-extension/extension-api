export default interface IDataBase {
    sincronizar() : Promise<any>;
    verificar() : Promise<boolean>;
} 