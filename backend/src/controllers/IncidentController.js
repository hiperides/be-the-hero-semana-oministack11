const connection = require('../database/connection')

module.exports = {
    async index(request, response) {
        //Buscar o parametro chamado page, se ele não existir vai pegar os dados da pag 1
        const { page = 1} = request.query;

        //Contador de registros de casos
        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id' )
        .limit(5)
        .offset((page - 1) * 5)
        .select(['incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
                ]);

        response.header('x-Total-Cout', count['count(*)']);

        return response.json(incidents);
    },

    async create(request, response) {
        const {title, description, value} = request.body;
        /**
         * O cabeçalho da requisição é algo que a gente acessa
         * através do request.headers, ele guarda informações
         * do contexto dessa nossa requisição que geralmente
         * vem dados da autenticação do usuário, localização
         * do usuário, dados sobre o idioma.
         */
        const ong_id = request.headers.authorization;

        //O 1o valor dessse array vai ser armazenado numa var chamada id
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        /**
         * Pra verificar se o nosso incident que tá sendo deletado acima
         * foi criado pela ong que tá querendo deletar ele, senão preciso
         * vetar esse delete pq senão alguém pode deletar um incident de uma
         * outra ong
         */
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if(incident.ong_id != ong_id ){
            //401 não autorizado
            return response.status(401).json({ error: "Operation not permitted!"});
        }

        await connection('incidents').where('id', id).delete();

        //204 Deu sucesso mas não tem conteúdo algum para retornar
        return response.status(204).send();

    }
}