const express = require('express');

const OngController = require('./controllers/OngController');

const IncidentController = require('./controllers/IncidentController');

const ProfileController = require('./controllers/ProfileController');

const SessionController = require('./controllers/SessionController');

// const connection = require('./database/connection');

//Desacoplando módulo de rotas do express em uma nova variável
const routes = express.Router();

//Acessando os métodos do SessionController
routes.post('/sessions', SessionController.create);

//Acessando os métodos do OngController
routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

//Acessando os métodos do ProfileController
routes.get('/profile', ProfileController.index);

//Acessando os métodos do IncidentController
routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete);

// routes.get('/ongs', async (request, response) => {
//     const ongs = await connection('ongs').select('*');

//     return response.json(ongs);
// });

// routes.post('/ongs', async (request, response) => {
//     // const body = request.body;
//     const { name, email, whatsapp, city, uf} = request.body;

//     const id = crypto.randomBytes(4).toString('Hex');

//     await connection('ongs').insert({
//         id,
//         name,
//         email,
//         whatsapp,
//         city,
//         uf,
//     })

//     return response.json({ id });

//     // return response.json({
//     //     evento: 'Semana Omnistack 11.0',
//     //     aluno: 'Lucas Freire de Oliveira'
//     // });
// });

//Dessa forma do Node que a gente faz para exportar alguma variável dentro de um arquivo.
module.exports = routes;