const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('OnlineBank', 'postgres', 'testpass', {
    host: '127.0.0.1',
    dialect: 'postgres',
    port: 5432
});

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

testConnection();
