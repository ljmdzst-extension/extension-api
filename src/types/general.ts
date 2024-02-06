import { Transaction } from "sequelize";

export enum ESTADO_BD { B, A, M }

export type servicio<ENTRADA  ,SALIDA > = ( data : ENTRADA, transaction : Transaction, transactionInsituciones ?: Transaction) => Promise<SALIDA>
