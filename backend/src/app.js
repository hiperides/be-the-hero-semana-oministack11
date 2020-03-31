//Contém todas as funcionalidades do express o require('express')
const express = require('express');

//Importando routes do arquivo routes.js, sempre nesse modo pra identificar que é um arquivo ./routes
const routes = require('./routes');

const { errors } = require('celebrate');

//Importando Cors
const cors = require('cors');

//Variável que armazena a minha aplicação
const app = express();

//Módulo que determina quem vai poder acessar a nossa aplicação
app.use(cors());

//Antes de todas as requisições, ir no corpo da minha requisição e converter o json pra objeto do JS
app.use(express.json())

//Para funcionar da mesma forma
app.use(routes);

// app.get acessando uma rota

app.use(errors());

/**
 * Rota / Recurso associado a uma tabela no banco, algo que queremos buscar no banco

/**
 * Métodos HTTP:
 * 
 * GET: Buscar uma informação do back-end
 * POST: Criar uma informação do back-end
 * PUT: Alterar uma informação do back-end
 * DELETE: Deletar uma informação do back-end
 */

 /**
  * Tipos de parâmetros:
  * 
  * Query Params: Parâmetros nomeados enviados na rota após o "?"(Filtros, paginação)
  * Route Params: Pârametros utilizados para identificar recursos
  * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
  */

  /**
   * SQL: MySQL, SQLite, PostegreSQL, Oracle, Microsfot SQL Server
   * NoSQL: MongoDB, CouchDB, etc.
   */

   /**
    * Driver: SELECT * FROM users
    * Query Builder: table('users').select('*').where()
    */

// app.post('/users', (request, response) => {
//     const body = request.body;

//     console.log(body);

//     return response.json({
//         evento: 'Semana Omnistack 11.0',
//         aluno: 'Lucas Freire de Oliveira'
//     });
// });

module.exports = app;