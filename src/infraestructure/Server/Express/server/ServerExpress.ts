import cors from 'cors';
import express, { json } from 'express';
import { informarPeticion } from '../middlewares/bases';
import IDataBase from '../../../db/IDataBase';
import Server from '../../server';
import IRouter from '../router/Router';


export default class ServerExpress extends Server {
    public express !: express.Express;

    private cRouters !: IRouter[];

    constructor(  db : IDataBase  ){
        super(db);
        
        this.express = express();

        this.cRouters = [];
        

    }

    agregarRouter( router : IRouter ) {
        this.cRouters.push( router );
    }


    public verDataBase() : IDataBase{ return this.db; }

    
    iniciar( puerto : number){
        
        
        this.express.use(cors());
        this.express.use(json());

        this.express.use( '/api/v1' ,informarPeticion  );
        
        this.cRouters.forEach( router => router.usar(this));
        
        return this.express.listen(puerto , async()=>{
            if(process.env.NODE_ENV === 'development'){
                await this.db.sincronizar();
                await this.db.verificar();
            }
            
            console.log(`SERVER INICIADO EN : ${puerto}`)
        });
       
    }

}

