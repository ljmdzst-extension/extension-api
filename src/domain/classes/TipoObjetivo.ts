import { Transaction } from "sequelize";
import { BD } from "../../infraestructure/db/Mysql-Sequelize/config/dbConfig";
import { ERROR } from "../../infraestructure/server/Express/logs/errores";
import { INVALIDO } from "../../infraestructure/server/Express/logs/validaciones";


type ID_TIPO_OBJ = number;

type TDataTipoObjetivo = {
    idTipoObj : ID_TIPO_OBJ,
    nom ?: string,
}

class TipoObjetivo {

    constructor
    (
       private data : TDataTipoObjetivo
    ){ }

    public verDatos () : TDataTipoObjetivo {
        return this.data;
    }

   
}

export {
    TDataTipoObjetivo,
    ID_TIPO_OBJ
};

export default TipoObjetivo;