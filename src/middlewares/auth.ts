import { Application, NextFunction } from "express";

export const usrAuth = async( req : Request , res : Response , next : NextFunction)  => {

    /* fetch POST localhost:4006/api/v2/usr/auth */

    next();

}