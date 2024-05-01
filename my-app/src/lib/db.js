import knex from 'knex'

export default knex({
  client: 'mysql',
  version: '5.7',
  connection: {
    host: 'genome-euro-mysql.soe.ucsc.edu',
    port: 3306,
    user: 'genome',
    password: '',
    database: 'hg38'
  },
})