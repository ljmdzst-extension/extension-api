import { NextFunction, Request, Response } from "express";

export default interface IMiddleware { 
    usar() : (req : Request , res : Response, next : NextFunction)=>Promise<any> ;

}