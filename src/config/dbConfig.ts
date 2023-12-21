import sequelize from 'sequelize';
import  logger  from './logsConfig';

const sequelizeExtension = new sequelize.Sequelize({
    host : process.env.DB_HOST,
    username : process.env.DB_USER,
    password : process.env.DB_PASS,
    port : Number(process.env.DB_PORT) || 3306,
    database : process.env.DB_NAME,
    dialect : 'mysql',
    logging : process.env.NODE_ENV === 'development' ? msg => logger.debug(msg) : undefined,
    timezone : '-03:00'
});



export default sequelizeExtension;