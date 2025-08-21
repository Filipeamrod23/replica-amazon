let buttonSearch = document.getElementById("button-search");

buttonSearch.addEventListener("click", async () => {
  let inputID = document.getElementById("input-id").value.trim();
  let inputNome = document.getElementById("input-nome").value.trim();
  let inputEmail = document.getElementById("input-email").value.trim();
  let responseDIV = document.getElementById('response')
  console.log(inputID);
  console.log(inputNome);
  console.log(inputEmail);

  try{
    let resp = await fetch(`http://localhost:3000/${inputID}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({nome: inputNome, email: inputEmail})
    })
    if(resp.ok){
        let data = await resp.json();
        responseDI.innerHTML = `
        <p>Nome do usuário: ${data.nome}</p>
        <p>Email do usuário: ${data.email}</p>
        `
    }else{
        alert('Usuário não encontrado no sistema')
    }
  }
  catch(error){
    console.log(error)
  }
});
