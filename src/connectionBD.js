const knex = require('knex');

const connection = knex({
    client: "mysql",
    connection: {
        host: process.env.bd_host,
        user: process.env.bd_user,
        password: process.env.bd_password,
        database: process.env.bd,
        port: process.env.bd_port
    }
});

module.exports = connection;