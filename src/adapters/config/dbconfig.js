const dotenv = require('dotenv');
const harperive = require("harperive");
dotenv.config();

const DB_CONFIG = {
    harperHost: process.env.REACT_APP_INSTANCE_URL,
    username: process.env.REACT_APP_INSTANCE_USERNAME,
    password: process.env.REACT_APP_INSTANCE_PASSWORD,
    schema: process.env.REACT_APP_INSTANCE_SCHEMA // optional
};

const Client = harperive.Client;
const db = new Client(DB_CONFIG);
export default db;