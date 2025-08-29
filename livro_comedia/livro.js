let modalShow = document.querySelector("#buy-button");
let modal = document.querySelector(".modal");
let modalInput = document.querySelector(".modalInput");

modalShow.addEventListener("click", () => {
  modal.style.display = "flex";
});
let modalClose = document.querySelector(".button-close", function () {});
modalClose.addEventListener("click", () => {
  modal.style.display = "none";
});

let searchButton = document.querySelector("#searchButton");

async function enviarDados() {
  let nome = document.getElementById("input-nome").value.trim();
  let email = document.getElementById("input-email").value.trim();

  //
  if (!nome || !email) {
    alert("Preencha todos os campos");
  }

  try {
    // a API ela é especial, ela é um recurso assincrono, eu não sei onde está minha API, e para acessar a API, eu preciso de uma função especial

    let resp = await fetch("https://server-amazon-o1zh.onrender.com/enviar-dados", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nome, email }),
    });

    if (resp.ok) {
      alert("Dados enviados com sucesso");
    } else {
      alert("Erro ao enviar dados");
    }
  } catch (error) {
    console.log(error);
  }
}

searchButton.addEventListener("click", async function () {
  let cep = modalInput.value.trim();
  let cepCalc = document.querySelector(".calc-result");

  if (!cep) {
    cepCalc.innerHTML = `<p>Por favor, insira um CEP</p>`;
    cepCalc.style.color = "red";
    return;
  }

  cepCalc.style.color = "";

  if (cep.length !== 8) {
    cepCalc.innerHTML = `<p>Por favor, inisira um CEP válido (8 dígitos)</p>`;
    cepCalc.style.color = "red";
    return;
  }
  cepCalc.style.color = "";

  try {
    let response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    let data = await response.json();

    if (data.erro) {
      cepCalc.innerHTML = `<p>CEP não encontrado</p>`;
      cepCalc.style.color = "red";
    } else {
      cepCalc.innerHTML = `
      <p>Endereço: ${data.logradouro}</p>
      <p>Bairro: ${data.bairro}</p>
      <p>Cidade: ${data.localidade} - ${data.uf}</p>
      <input class="input-api" id="input-nome" placeholder = "Digite seu nome"></input>
      <input class="input-api" id="input-email" placeholder = "Digite seu email"></input>
      <button id="button-api">Enviar</button>
      `;
      document
        .querySelector("#button-api")
        .addEventListener("click", enviarDados);
    }
  } catch (error) {
    cepCalc.innerHTML = `<p>Erro: ${error}</p>`;
    cepCalc.style.color = "red";
  }
});
