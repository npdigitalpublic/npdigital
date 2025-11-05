window.addEventListener("DOMContentLoaded", () => {
  
  // Fade-in do título
  const header = document.querySelector("header h1");
  if (header) {
    header.style.opacity = 0;
    header.style.transition = "opacity 1.5s";
    setTimeout(() => (header.style.opacity = 1), 300);
  }

  // --- Botão "Serviços" ---
  const botaoServicos = document.querySelector(".btn-servicos");
  if (botaoServicos) {
    botaoServicos.addEventListener("click", () => {
      mudarPagina("servicos.html");
    });
  }

});

// Animação suave ao trocar de página
function mudarPagina(destino) {
  document.body.classList.add("fade-out");
  setTimeout(() => {
      window.location.href = destino;
  }, 400);
}

const elementos = document.querySelectorAll(".animar");

function animarScroll() {
    elementos.forEach(el => {
        const posicao = el.getBoundingClientRect().top;
        const altura = window.innerHeight * 0.8;

        if (posicao < altura) {
            el.classList.add("mostrar");
        }
    });
}

window.addEventListener("scroll", animarScroll);
animarScroll();

function abrirWhats() {
    window.open("https://wa.me/5573999413413", "_blank");
}
function abrirInsta() {
    window.open("https://instagram.com/npdigital_publicidade", "_blank");
}



