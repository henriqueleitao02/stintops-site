/* StintOps — website corporativo
   Cabeçalho e rodapé partilhados, menu móvel e formulários.
   Editar aqui o que é comum a todas as páginas. */

const SITE = {
  // TODO: substituir pelo email real da equipa antes de publicar.
  email: "contacto@stintops.pt",
  // Opcional: endpoint de um serviço de formulários (ex.: Formspree, Getform).
  // Vazio = o formulário valida e mostra a confirmação, mas não envia para lado nenhum.
  formEndpoint: "",
};

const LOGO = `<span class="wordmark"><i>S</i>tintops</span>`;

const NAV = [
  ["produto.html", "Produto"],
  ["produto.html#como-funciona", "Como funciona"],
  ["sobre.html", "Sobre nós"],
  ["noticias.html", "Notícias"],
  ["faq.html", "FAQ"],
  ["contactos.html", "Contactos"],
];

function renderHeader() {
  const slot = document.getElementById("site-header");
  if (!slot) return;
  const here = location.pathname.split("/").pop() || "index.html";
  const links = NAV.map(([href, label]) => {
    const current = href === here ? ' aria-current="page"' : "";
    return `<a href="${href}"${current}>${label}</a>`;
  }).join("");
  slot.outerHTML = `
  <header class="site-header">
    <div class="wrap">
      <a class="brand" href="index.html" aria-label="StintOps — página inicial">${LOGO}</a>
      <button class="nav-toggle" aria-expanded="false" aria-controls="nav" aria-label="Abrir menu">
        <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" style="margin:auto"><path d="M2 5h16M2 10h16M2 15h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
      </button>
      <nav class="nav" id="nav" aria-label="Principal">
        ${links}
        <a class="btn btn-primary btn-sm" href="contactos.html#piloto">Aderir ao piloto</a>
      </nav>
    </div>
  </header>`;
}

function renderFooter() {
  const slot = document.getElementById("site-footer");
  if (!slot) return;
  const year = new Date().getFullYear();
  slot.outerHTML = `
  <footer class="site-footer">
    <div class="wrap">
      <div class="foot-grid">
        <div>
          <a class="brand" href="index.html">${LOGO}</a>
          <p>Estratégia e gestão para equipas de kart endurance. Um projeto nascido no Iscte.</p>
        </div>
        <div>
          <h4>Produto</h4>
          <ul>
            <li><a href="produto.html">Funcionalidades</a></li>
            <li><a href="produto.html#como-funciona">Como funciona</a></li>
            <li><a href="produto.html#roteiro">Roteiro</a></li>
            <li><a href="contactos.html#piloto">Programa piloto</a></li>
          </ul>
        </div>
        <div>
          <h4>Empresa</h4>
          <ul>
            <li><a href="sobre.html">Sobre nós</a></li>
            <li><a href="sobre.html#equipa">Equipa</a></li>
            <li><a href="noticias.html">Notícias</a></li>
          </ul>
        </div>
        <div>
          <h4>Ajuda</h4>
          <ul>
            <li><a href="faq.html">Perguntas frequentes</a></li>
            <li><a href="contactos.html">Contactos</a></li>
            <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
            <li><a href="privacidade.html">Privacidade</a></li>
          </ul>
        </div>
      </div>
      <div class="foot-bottom">
        <span>© ${year} StintOps · Iscte</span>
        <span>A decisão de corrida é sempre da equipa.</span>
      </div>
    </div>
  </footer>`;
}

function setupNav() {
  const btn = document.querySelector(".nav-toggle");
  const nav = document.getElementById("nav");
  if (!btn || !nav) return;
  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  });
  nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) { nav.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); }
  });
}

async function send(form, data) {
  if (!SITE.formEndpoint) return true; // modo demonstração
  const res = await fetch(SITE.formEndpoint, {
    method: "POST",
    headers: { Accept: "application/json" },
    body: data,
  });
  return res.ok;
}

function setupForms() {
  document.querySelectorAll("form[data-form]").forEach((form) => {
    const msg = form.querySelector(".form-msg");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      msg.className = "form-msg";
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const btn = form.querySelector("[type=submit]");
      btn.disabled = true;
      try {
        const ok = await send(form, new FormData(form));
        if (!ok) throw new Error();
        msg.textContent = form.dataset.ok || "Obrigado! Recebemos o teu pedido.";
        msg.className = "form-msg ok";
        form.reset();
      } catch {
        msg.textContent = `Não foi possível enviar. Escreve-nos para ${SITE.email}.`;
        msg.className = "form-msg err";
      } finally {
        btn.disabled = false;
      }
    });
  });

  // Pré-seleciona o tipo de pedido a partir do link (#piloto, #demo).
  const hash = location.hash.replace("#", "");
  const pick = document.querySelector(`input[name="pedido"][value="${hash}"]`);
  if (pick) pick.checked = true;
}

renderHeader();
renderFooter();
setupNav();
setupForms();
