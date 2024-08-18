import { InstitucionAttributes } from "../models/Institucion";
import { PersonaAttributes } from "../models/Persona";
import { ResponsableAttributes } from "../models/Responsable";


export type TInstitucion = (InstitucionAttributes & {
    antecedentes ?: string,
    responsable ?: ResponsableAttributes & PersonaAttributes
});