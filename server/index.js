
// CRUD (CREATE)(POST), (READ)(GET), (UPDATE)(PUT), (DELETE)(DELETE)
// FUNÇÕES DO BACKEND: (GET), (POST), (PUT), (DELETE)
// ROTAS, https://example.net (HOME)

const express = require('express')
const app = express()
const port = 3000;

// banco de dados mocado
const users = [
    {id: 1, nome: "Tábata", email: "devinec465@discrip.com"},
    {id: 2, nome: "Filipe", email: "2347865@discrip.com"}
]

app.use(express.json())
// localhost:3000
app.get('/usuarios', (req, res)=>{
    res.json(users)
});

app.get('/usuarios/:id', (req, res)=>{
    const id = parseInt(req.params.id);

    const usuario = users.find(u => u.id == id)
    if(!usuario){
        return res.status(404).json({mensagem: 'usuário não foi encontrado'})
    }
    res.json(usuario);
})

app.listen(port, ()=>{
    console.log('porta está sendo escutada no endereço localhost')
})