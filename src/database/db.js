// Import a dependence of sqlite3
const sqlite3 = require("sqlite3").verbose()

//  Obeject que irá fazer operações dentro do banco de dados
const db = new sqlite3.Database("./src/database/database.db")

// Utilizar o objeto de banco de dados, paara nossas operações
db.serialize(() => {
  // Criar uma tabela, com comandos SQL
  // db.run(`
  //   CREATE TABLE IF NOT EXISTS places (
  //     id INTEGER PRIMARY KEY AUTOINCREMENT,
  //     image TEXT,
  //     name TEXT,
  //     address TEXT,
  //     address2 TEXT,
  //     state TEXT,
  //     city TEXT,
  //     items TEXT
  //   );
  // `)
  // // // Inserir dados na tabela
  // const query = `
  //   INSERT INTO places (
  //     image,
  //     name,
  //     address,
  //     address2,
  //     state,
  //     city,
  //     items
  //   ) VALUES (?,?,?,?,?,?,?);
  // `
  // const values = [
  //   "https://images.unsplash.com/photo-1503596476-1c12a8ba09a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80",
  //   "Motive Recycling",
  //   "Guilherme Gemballa, Jardim América",
  //   "Número 260",
  //   "Santa Catarina",
  //   "Rio do Sul",
  //   "Papéis e Papelão"
  // ]
  // // CALLBACK = chamar a função de volta
  // function afterInsertData(err){
  //   if(err) {
  //     return console.log(err)
  //   }

  //   console.log("Cadastrado com sucesso")
  //   console.log(this)
  // }
  // db.run(query, values, afterInsertData)

  // // Consultar os dados da tabela
  // db.all(`SELECT * FROM places`, function(err, rows){
  //   if(err){
  //     return console.log(err)
  //   }

  //   console.log("Seus Registros")
  //   console.log(rows)
  // })

  // Deletar os dados da tabela
  // db.run(`DELETE FROM places WHERE id = ?`, [18], function(err){
  //   if(err){
  //     return console.log(err)
  //   }
  //   console.log("Registro deletado com sucesso!")
  // })
})

module.exports = db