import { NegociacaoController } from "./controllers/negociacaoController.js";
const controller = new NegociacaoController();
const form = document.querySelector(".form");
if (form) {
    form.addEventListener("submit", e => {
        e.preventDefault();
        console.log("Teste");
        controller.adiciona();
    });
}
else {
    throw Error("Erro ao inicializar a aplicação. Verifique se o form existe!");
}
