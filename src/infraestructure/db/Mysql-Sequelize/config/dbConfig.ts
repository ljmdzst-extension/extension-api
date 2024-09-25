import sequelize from 'sequelize';
import { initModels } from '../models/init-models';

const sequelizeExtension = new sequelize.Sequelize({
    host : process.env.DB_HOST,
    username : process.env.DB_USER,
    password : process.env.DB_PASS,
    port : Number(process.env.DB_PORT) || 3306,
    database : process.env.DB_NAME,
    dialect : 'mysql',
    logging : false,
    // logging : process.env.NODE_ENV === 'development' ? console.log : undefined,
    timezone : '-03:00'
});

export const BD = initModels(sequelizeExtension);



export default sequelizeExtension;