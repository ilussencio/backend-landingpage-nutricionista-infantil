const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
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

const app = express();

const PORT = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//rota post/create
app.post("/lead", async (req, res) => {
    //Verificando se o email está vazio
    if (!req.body.email || req.body.email === "") {
        res.status(400).send("Email is required");
    } else {
        // 4. Preparando o Lead em um objeto
        const option = {
            nome: req.body.nome,
            email: req.body.email,
            telefone: req.body.telefone,
        };
        // 5. Verificando erros
        try {
            // 6. If para Lead em bracp/vazio
            const response = await db.insert({
                table: "lead",
                records: [option],
            });
            // 7. Mensagem de sucesso para o frontend
            res.status(200).send(response);
        } catch (error) {
            // 7. Mensagem de erro para o frontend
            res.status(500).send(error);
        }
    }
});
//rota get/read
// 1. rta para GET de todos os leads
app.get("/leads", async (req, res) => {
    // 2. try/catch para pegar erros
    
        // 3. query para pegar todos os leads
        const response = await db.query("SELECT * FROM leads.lead");
        // 4. Mensagem de sucesso para o frontend
        res.status(200).send(response);
   
});
// 1 - rota put/update
app.post("/edit", async (req, res) => {
    // 2. set o Lead a ser atualizado pegando o id
    const option = {
        "#": req.body.id,
        nome: req.body.nome,
        email: req.body.email,
        telefone: req.body.telefone,
    };
    // 3. try/catch para pegar erros
    try {
        // 4. enciando o update para o banco de dados
        const response = await db.update({
            table: "lead",
            records: [option],
        });
        // 5. enviando mensagem de sucesso para o frontend
        res.status(200).send(response);
    } catch (error) {
        // 5. enviando mensagem de erro para o frontend
        res.status(500).send(error);
    }
});
// 1. Rota para deletar um Lead usando o id
app.post("/delete/:lead_id", async (req, res) => {
    // 2. gpegar o id do Lead através da url
    const { lead_id } = req.params;
    // 3. try/catch para pegar erros
    try {
        // 4. enviando o delete request para o banco de dados
        const response = await db.delete({
            table: "lead",
            hashValues: [lead_id],
        });
        // 5. enviando mensagem de sucesso para o frontend
        res.status(200).send(response);
    } catch (error) {
        // 5. enviando mensagem de erro para o frontend
        res.status(500).send(error);
    }
});

//ROTA PARA POST PERSONALIZADO
//rota post/create
app.post("/section", async (req, res) => {
    const option = {
        link: req.body.link,
        status: req.body.status,
        titulo: req.body.titulo,
        subtitulo: req.body.subtitulo,
        texto: req.body.texto
    };
    try {
        const response = await db.insert({
            table: "section",
            records: [option],
        });
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(error);
    }
});
//rota get ativo
app.get("/section/active", async (req, res) => {
    try {
        const response = await db.query("SELECT * FROM leads.section WHERE status = 'active'");
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send("something went wrong");
    }
});

//rota get all
app.get("/section", async (req, res) => {
    try {
        const response = await db.query("SELECT * FROM leads.section");
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send("something went wrong");
    }
});

//rota update
app.post("/section/edit", async (req, res) => {
    const option = {
        "#": req.body.id,
        link: req.body.link,
        status: req.body.status,
        titulo: req.body.titulo,
        subtitulo: req.body.subtitulo,
        texto: req.body.texto
    };
    try {

        const response = await db.update({
            table: "section",
            records: [option],
        });
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(error);
    }
});
//rota delete
app.post("/section/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const response = await db.delete({
            table: "section",
            hashValues: [id],
        });
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(error);
    }
});





//ROTA PARA USUARIO
//rota post/create
app.post("/users", async (req, res) => {
    const option = {
        email: req.body.email,
        nome: req.body.nome,
        token: req.body.token
    };
    try {
        const response = await db.insert({
            table: "users",
            records: [option],
        });
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(error);
    }
});

//rota get all
app.get("/users", async (req, res) => {
    try {
        const response = await db.query("SELECT * FROM leads.users");
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send("something went wrong");
    }
});

//rota update
app.post("/users/edit", async (req, res) => {
    const option = {
        "#": req.body.id,
        email: req.body.email,
        nome: req.body.nome,
        token: req.body.token
    };
    try {

        const response = await db.update({
            table: "users",
            records: [option],
        });
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(error);
    }
});
//rota delete
app.post("/users/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const response = await db.delete({
            table: "users",
            hashValues: [id],
        });
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(error);
    }
});


// just a notification in the console
app.listen(PORT, () => {
    console.log(`Your server ⚡ is running 🏃‍♂️ on http://localhost:${PORT}`);
});



