import IDataBase from "../db/IDataBase";

export default abstract class Server {
    

    constructor ( protected db : IDataBase ) {}

    public abstract iniciar( puerto : number) : void;
}