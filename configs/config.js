const config = {
        db: {
                /* don't expose password or any sensitive info, done only for demo */
                host: "localhost",
                user: "root",
                password: "",
                database: "kubotadatabase",
                // socketPath: '/var/run/mysqld/mysqld.sock',
                connectionLimit: 100, //important

        },
};
module.exports = config;