// =============================
// IMPORTANDO E CONFIGURANDO O SERVIDOR
// =============================
const express = require("express"); //Importando o Express (framework que facilita criar servidor no Node)
const app = express(); //Criando o servidor usando o express
app.use(express.json()); //Middleware: permite que o servidor entenda dados enviados em JSON no body. Ele executa antes da resposta final. Fica entre a requisição e a resposta.
// =============================
// BANCO DE DADOS FICTÍCIO
// =============================
// Aqui estamos simulando um banco de dados.
// Em vez de usar um banco real, usamos um array.
// Cada objeto dentro do array representa um filme.
// Array de objetos [{},{},{}]
const filmes = [
  {
    id: 1,
    titulo: "Interestelar",
    genero: "Ficção",
  },
  {
    id: 2,
    titulo: "velozes e furiosos 5",
    genero: "Ação",
  },
  {
    id: 3,
    titulo: "As branquelas",
    genero: "Comédia",
  },
  {
    id: 4,
    titulo: "O Poderoso Chefão",
    genero: "Drama",
  },
  {
    id: 5,
    titulo: "missão impossive ",
    genero: "Ação",
  },
  { id: 6, titulo: "Até que a sorte nos separe", genero: "Comédia" },
  {
    id: 7,
    titulo: "Oblivion",
    genero: "Ficção",
  },
];
// =============================
// ROTAS
// Estrutura geral:
// app.verbo("caminho", (req, res) => {Função} )
// =============================
// =====  Criando Rota principal "/"  =====
// Quando alguém acessa a raiz do servidor,
// enviamos uma mensagem simples.
//req entra no servidor.
//res sai do servidor
app.get("/", (req, res) => {
  res.send("API de Filmes");
});
// =====  Criando Rota para Listar todos os filmes ( /filmes ) =====
// Retorna o array completo em formato JSON.
app.get("/filmes", (req, res) => {
  res.json(filmes);
});
// --------------------------------------------------
//Parâmetros de rotas
// ROTA: BUSCAR FILME POR ID
// GET /filmes/:id
// --------------------------------------------------
// :id é um parâmetro de rota. Significa que estamos esperando receber um valor pela URL. Tudo que vem da url vem como texto (string)
app.get("/filmes/:id", (req, res) => {
  // Tudo que vem da URL é string.
  // Exemplo: se acessarmos /filmes/2
  // req.params.id será "2" (texto).
  // Convertendo para número para poder comparar com o id do array.
  // JavaScript diferencia string de número, mesmo que pareçam iguais.
  const idQueFoiPegoNaURL = Number(req.params.id);
  // IMPORTANTE:
  // "filmes" (plural) é o ARRAY inteiro.
  // Já "filme" (singular) representa UM item por vez dentro do array.
  // O .find() percorre o array automaticamente.
  // A cada volta, ele pega um item e coloca dentro da variável (filme).
  // Esse nome "filme" poderia ser qualquer outro nome,
  // mas usamos singular porque estamos olhando um item individual.
  const filmeEncontrado = filmes.find(
    // Aqui estamos dizendo:
    // "Encontre o filme cujo id seja igual ao id recebido na URL"
    // Se essa comparação for verdadeira (true),
    // o .find() para e retorna esse objeto.
    (filme) => filme.id === idQueFoiPegoNaURL, //(filme) é apenas uma variável temporária.
  );
  // Se encontrar, retornamos o filme em formato JSON.
  // Se não encontrar, o resultado será undefined.
  res.json(filmeEncontrado);
});
// --------------------------------------------------
// ROTA: CADASTRAR NOVO FILME
// POST /filmes
// --------------------------------------------------
// O cliente envia dados no body (JSON).
// O servidor recebe e adiciona no array.
app.post("/filmes", (req, res) => {
  const novoFilme = {
    id: filmes.length + 1, //ID é gerado com base no tamanho da array.
    titulo: req.body.titulo,
    genero: req.body.genero,
  };
  filmes.push(novoFilme); //Adiciona o novo objeto (novoFilme) no final da array
  res.send(`O Filme ${novoFilme.titulo} foi cadastrado com sucesso`);
});
// =============================
// CONFIGURAÇÃO DA PORTA
// =============================
const PORT = 3000; // Definindo a porta onde o servidor vai rodar.
//Servidor(app), escute (listen) a nossa porta(PORT). E faça tal coisa: Mostre no localhost na porta 3000
// Faz o servidor "escutar" requisições nessa porta.
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});

//Series

const series = [
  {
    id: 1,
    titulo: "Stranger Things",
    genero: "Ficção"
  },
  {
    id: 2,
    titulo: "Reacher",
    genero: "Ação"
  },
  {
    id: 3,
    titulo: "Lock & Key",
    genero: "Fantasia"
  },
  {
    id: 4,
    titulo: "Black Mirror",
    genero: "Ficção"
  }
]

app.get("/series", (req, res) => {
  res.send(series)
})

app.post("/series", (req, res) => {
  const novaSerie = {
    id: series.length +1,
    titulo: req.body.titulo,
    genero: req.body.genero
  }

  series.push(novaSerie)

  res.send(`A Série ${novaSerie.titulo} foi cadastrada com sucesso!`)
})