import { Categoria } from "../models/Categoria";
import { Usuario } from "../models/Usuario";


export type DataGetProgramas = { anio : number , usuario ?: {usuario : Usuario, categoria : Categoria}};