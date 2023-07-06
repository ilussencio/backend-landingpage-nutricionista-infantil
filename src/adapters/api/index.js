import db from "../config/dbconfig.js";


exports.addLead = (request, response) => {
    db.insert(
        {
            table: 'leads',
            records: [
                {
                    nome: request.body.title,
                    email: request.body.email,
                    telefone: request.body.telefone
                }
            ]
        },
        (err, res) => {
            if (err) response.status(500).json(err);

            response.status(res.statusCode).json(res.data);
        }
    );
};

