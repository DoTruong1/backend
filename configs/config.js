const config = {
    db: {
        /* don't expose password or any sensitive info, done only for demo */
        host: "localhost",
        user: "root",
        database: "database",
        connectionLimit: 100, //important

    },
};
module.exports = config;