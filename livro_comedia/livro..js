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

searchButton.addEventListener("click", async function () {
  let cep = modalInput.value.trim();
  let cepCalc = document.querySelector(".calc-result");

  if (!cep) {
    cepCalc.innerHTML = `<p>Por favor, insira um CEP</p>`;
    cepCalc.style.color = "red";
    return;
  }

  cepCalc.style.color = '';

  if (cep.length !== 8) {
    cepCalc.innerHTML = `<p>Por favor, inisira um CEP válido (8 dígitos)</p>`;
    cepCalc.style.color = "red";
    return;
  }
  cepCalc.style.color = '';

  try {
    let response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    let data = await response.json();

    if (data.erro) {
      cepCalc.innerHTML = `<p>CEP não encontrado</p>`;
      cepCalc.style.color = "red";
    } else {
      cepCalc.innerHTML = `<p>Endereço: ${data.logradouro}</p><p>Bairro: ${data.bairro}</p><p>Cidade: ${data.localidade} - ${data.uf}</p>`;
    }
  } catch (error) {
    cepCalc.innerHTML = `<p>Erro: ${error}</p>`;
    cepCalc.style.color = "red";
  }
});