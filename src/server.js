const express = require("express");
const nunjucks = require("nunjucks")
const db = require("./database/db")
const server = express()


server.use(express.static("./public"))
// Habilitar o uso do req.body
server.use(express.urlencoded({extended:true}))

// Config Nunjucks
nunjucks.configure("src/views", {
  express: server,
  noCache: true
})

// Config de Rotas
// Home Pag
server.get("/", (req, res) => {
  return res.render("index.html")
})

server.get("/create-point", (req, res) => {

  return res.render("create-point.html")
})

server.post("/save-point", (req, res) => {
  // req.body = corpo do formulário
  // console.log(req.body)
  // inserir dados no banco de dados
  const query = `
    INSERT INTO places (
      image,
      name,
      address,
      address2,
      state,
      city,
      items
    ) VALUES (?,?,?,?,?,?,?);
  `
  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items
  ]
  // CALLBACK = chamar a função de volta
  function afterInsertData(err){
    if(err) {
      console.log(err)
      return res.send("Erro no cadastro")
    }

    console.log("Cadastrado com sucesso")
    console.log(this)

    return res.render("create-point.html", { saved: true })
  }
  db.run(query, values, afterInsertData)
})

server.get("/search-results", (req, res) => {

  const search = req.query.search
  if(search == ""){
    // Pesquisa vazia
    return res.render("search-results.html", { total: 0 })
  }

  // Pegar os dados do banco de dados
  db.all(`SELECT * FROM places`, function(err, rows){
    if(err){
      return console.log(err)
    }
    const total = rows.length
    // Page HTML já com os dados
    return res.render("search-results.html", { places: rows, total: total })
  })
})

// Ligar server na porta
server.listen(3000)