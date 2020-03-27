
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table) {
        //Toda vez que criar um novo Caso ele vai adicionar um novo id na ordem
        table.increments();

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        //Relacionamento com a tabela 'ongs'
        table.string('ong_id').notNullable();

        //Chave estrangeira
        table.foreign('ong_id').references('id').inTable('ongs');
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
