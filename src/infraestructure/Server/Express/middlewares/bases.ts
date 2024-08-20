import cli from 'cli-color'
import { NextFunction, request, response } from "express"



export const informarPeticion = ( req : typeof request, res : typeof response, next : NextFunction ) => {
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