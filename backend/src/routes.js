const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./controllers/OngController');

const IncidentController = require('./controllers/IncidentController');

const ProfileController = require('./controllers/ProfileController');

const SessionController = require('./controllers/SessionController');

// const connection = require('./database/connection');

//Desacoplando módulo de rotas do express em uma nova variável
const routes = express.Router();

//Acessando os métodos do SessionController
routes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),
    })
}), SessionController.create);
    
//Acessando os métodos do OngController
routes.get('/ongs', OngController.index);

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.create);

//Acessando os métodos do ProfileController
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object().keys({
        authorization: Joi.string().required(),
    }).unknown(),
}), ProfileController.index);

//Acessando os métodos do IncidentController
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentController.index);


routes.post('/incidents', celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required().min(1),
    })
}), IncidentController.create);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), IncidentController.delete);

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