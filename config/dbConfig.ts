import sequelize from 'sequelize';

const sequelizePropuestas = new sequelize.Sequelize({
    host : process.env.DB_HOST,
    username : process.env.DB_USER,
    password : process.env.DB_PASS,
    port : Number(process.env.DB_PORT) || 3306,
    database : process.env.DB_NAME
});

export default sequelizePropuestas;