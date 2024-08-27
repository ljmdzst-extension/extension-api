import cli from 'cli-color'
import IMiddleware from './middleware';
import { NextFunction, Request,  Response } from "express"


export class MiddlewareInformarPeticion implements IMiddleware {
    constructor(){}
    usar() {
        return async( req : Request, res : Response, next : NextFunction ) => {
            switch (req.method) {
                case 'GET':
                    console.log(cli.green(`${new Date(Date.now()).toISOString()}-[${req.method}]-${req.path}`));
                    break;
                case 'PUT':
                    console.log(cli.yellow(`${new Date(Date.now()).toISOString()}-[${req.method}]-${req.path}`));
                    break;
                case 'POST':
                    console.log(cli.magenta(`${new Date(Date.now()).toISOString()}-[${req.method}]-${req.path}`));
                    break;
                default:
                    break;
            }
            next();
        }
    }

}
