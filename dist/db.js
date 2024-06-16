"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: "postgres",
    host: "dutifully-cerebral-cormorant.data-1.use1.tembo.io",
    database: "rec",
    password: "968CAvK7FGdnOf9b",
    port: 5432,
});
exports.default = pool;
