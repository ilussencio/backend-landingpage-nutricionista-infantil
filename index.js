const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require('dotenv');
const harperive = require("harperive");
dotenv.config();
const Moment = require('moment');

const DB_CONFIG = {
    harperHost: process.env.REACT_APP_INSTANCE_URL,
    username: process.env.REACT_APP_INSTANCE_USERNAME,
    password: process.env.REACT_APP_INSTANCE_PASSWORD,
    schema: process.env.REACT_APP_INSTANCE_SCHEMA
};

const Client = harperive.Client;
const db = new Client(DB_CONFIG);
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post("/lead", async (req, res) => {
    console.log(req.body)
    if (!req.body.email || req.body.email === "") {
        res.status(400).send("Email is required");
    } else {
        const option = {
            nome: req.body.nome,
            email: req.body.email,
            telefone: req.body.telefone,
            data: Moment().format('YYYY-MM-DD')
        };
        try {
            const response = await db.insert({
                table: "lead",
                records: [option],
            });
            res.status(200).send(response);
        } catch (error) {
            res.status(500).send(error);
        }
    }
});
app.get("/section/active", async (req, res) => {
    try {
        const response = await db.query("SELECT * FROM leads.section WHERE status = 'true'");
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send("something went wrong");
    }
});

app.listen(PORT, () => {
    console.log(`Your server ⚡ is running 🏃‍♂️ on http://localhost:${PORT}`);
});



