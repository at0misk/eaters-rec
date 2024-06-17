import { Pool } from "pg";
import fs from "fs";

const pool = new Pool({
  user: "avnadmin",
  host: "pg-1b24397d-eaters-rec.h.aivencloud.com",
  database: "rec",
  password: "AVNS_f3cA-d4HcM__UnM9Tdv",
  port: 21887,
  ssl  : {
    ca : fs.readFileSync(__dirname + '/psql.crt')
  }
});

export default pool;