let buttonSearch = document.getElementById("button-search");
let responseDIV = document.getElementById("response");

buttonSearch.addEventListener("click", async () => {
  let inputID = document.getElementById("input-id").value.trim(); // <-- agora aqui dentro

  try {
    let resp = await fetch(`http://localhost:3000/usuarios/${inputID}`);
    if (resp.ok) {
      let data = await resp.json();
      responseDIV.innerHTML = `
        <p>Nome do usuário atual: ${data.nome}</p>
        <p>E-mail do usuário atual: ${data.email}</p>
        <p>Deseja redefinir? Preencha os novos dados abaixo</p>
        <label>Novo nome: <input id="update-nome" type="text"></label>
        <label>Novo e-mail: <input id="update-email" type="text"></label>
        <button onclick="atualizarUsuario(${data.id})">Salvar alterações</button>
        <button onclick="deletarUsuario(${data.id})">Deletar</button>
      `;
    } else {
      alert("Usuário não encontrado no sistema");
    }
  } catch (error) {
    console.log(error);
  }
});

//função para alterar o usuario
async function atualizarUsuario(id) {
  let inputNome = document.getElementById("update-nome").value.trim();
  let inputEmail = document.getElementById("update-email").value.trim();

  try {
    let resp = await fetch(`http://localhost:3000/usuarios/${id}`, {
      // <-- agora usa o id real
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome: inputNome, email: inputEmail }),
    });

    let data = await resp.json();
    alert(data.mensagem);

    responseDIV.innerHTML = `
      <p>Usuário atualizado para:</p>
      <p><strong>Nome:</strong> ${data.usuario.nome}</p>
      <p><strong>E-mail:</strong> ${data.usuario.email}</p>
      <button onclick="atualizarUsuario(${data.usuario.id})">Alterar novamente</button>
`;
  } catch (error) {
    console.log(error);
    alert("Erro ao atualizar usuário");
  }
}

async function deletarUsuario(id) {
  try{
    let resp = await fetch(`http://localhost:3000/usuarios/${id}`,{
      method: "DELETE"
    });

    let data = await resp.json();
    alert(data.mensagem);
    responseDIV.innerHTML = "";
  }catch(error){
    console.log(error);
  }
}