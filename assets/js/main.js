/* StintOps — website corporativo
   Cabeçalho e rodapé partilhados, menu móvel, formulários, réplicas dos ecrãs
   da aplicação e animações. Editar aqui o que é comum a todas as páginas. */

const SITE = {
  // TODO: substituir pelo email real da equipa antes de publicar.
  email: "contacto@stintops.pt",
  // Opcional: endpoint de um serviço de formulários (ex.: Formspree, Getform).
  // Vazio = o formulário valida e mostra a confirmação, mas não envia para lado nenhum.
  formEndpoint: "",
};

const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const LOGO = `<span class="wordmark"><i>S</i>tintops</span>`;

const NAV = [
  ["produto.html", "Produto"],
  ["produto.html#como-funciona", "Como funciona"],
  ["sobre.html", "Sobre nós"],
  ["noticias.html", "Notícias"],
  ["faq.html", "FAQ"],
  ["contactos.html", "Contactos"],
];

/* ---------------------------------------------------------------- cabeçalho e rodapé */

function renderHeader() {
  const slot = document.getElementById("site-header");
  if (!slot) return;
  const here = location.pathname.split("/").pop() || "index.html";
  const links = NAV.map(([href, label]) => {
    const current = href === here ? ' aria-current="page"' : "";
    return `<a href="${href}"${current}>${label}</a>`;
  }).join("");
  slot.outerHTML = `
  <header class="site-header top">
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
          <a class="btn btn-primary btn-sm arrow" href="contactos.html#piloto">Aderir ao programa piloto</a>
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
    <div class="foot-mark" aria-hidden="true"><i>S</i>tintops</div>
  </footer>`;
}

function setupHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const update = () => header.classList.toggle("top", window.scrollY < 12);
  update();
  window.addEventListener("scroll", update, { passive: true });
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

/* ---------------------------------------------------------------- fundo de pista */

const TRACK_PATH = "M150 420C150 300 250 262 340 300S470 380 540 300 600 120 720 110 905 160 880 280 760 362 780 440 862 540 760 560H262C192 560 150 500 150 420Z";

function decorateHeroes() {
  document.querySelectorAll(".hero, .page-hero").forEach((sec, i) => {
    const id = `trk${i}`;
    const bg = document.createElement("div");
    bg.className = "track-bg";
    bg.setAttribute("aria-hidden", "true");
    bg.innerHTML = `
      <svg class="track-svg" viewBox="0 0 1000 640">
        <path id="${id}" class="tarmac" d="${TRACK_PATH}"/>
        <path class="line" d="${TRACK_PATH}"/>
        ${REDUCED ? "" : `
        <circle class="kart" r="6"><animateMotion dur="16s" repeatCount="indefinite"><mpath href="#${id}"/></animateMotion></circle>
        <circle class="kart w" r="5"><animateMotion dur="17.5s" begin="-5s" repeatCount="indefinite"><mpath href="#${id}"/></animateMotion></circle>
        <circle class="kart w" r="4" opacity=".6"><animateMotion dur="18.5s" begin="-11s" repeatCount="indefinite"><mpath href="#${id}"/></animateMotion></circle>`}
      </svg>
      ${REDUCED ? "" : `<div class="speed"><i></i><i></i><i></i><i></i></div>`}`;
    sec.prepend(bg);
  });
}

/* ---------------------------------------------------------------- réplicas dos ecrãs */

const TABS = ["Prova", "Corrida", "Stints e paragens", "Estratégia"];

function appShell(active, status, avatar, body) {
  const tabs = TABS.map((t) => `<span${t === active ? ' class="on"' : ""}>${t}</span>`).join("");
  return `<div class="app">
    <div class="app-bar">${LOGO}<div class="app-tabs">${tabs}</div>${status}<span class="app-av">${avatar}</span></div>
    <div class="app-body">${body}</div>
  </div>`;
}

const LIVE = `<span class="pill green" data-fresh>Dados atuais · há 3 s</span>`;
const field = (l, v, extra = "") => `<div class="app-field"><span class="app-lbl">${l}</span><div class="app-input">${v}${extra}</div></div>`;

const SCREENS = {
  prova: () => appShell("Prova", `<span class="pill">Equipa exemplo</span>`, "GJ", `
    <div class="app-two">
      <div class="app-card">
        <div class="app-h">Regras da prova <span>Endurance 6 h (exemplo)</span></div>
        <div class="app-fields">
          ${field("Duração", "6 h 00 min")}${field("Paragens obrigatórias", "8")}
          ${field("Stint máximo", "50 min")}${field("Tempo mínimo nas boxes", "2 min 00 s")}
          ${field("Condução máxima por piloto", "2 h 30 min")}${field("Condução mínima por piloto", "1 h 00 min")}
          ${field("Boxes fechadas", "primeiros 15 min")}${field("Dados desatualizados após", "30 s")}
        </div>
        <p class="app-note">As regras são conferidas com o regulamento da prova. Os alertas são informativos; a decisão é sempre da equipa.</p>
        <div class="app-btns"><span class="app-btn lime">Guardar regras</span><span class="app-btn ghost">Importar de outra prova</span></div>
      </div>
      <div style="display:grid;gap:10px">
        <div class="app-card">
          <div class="app-h">Cronometragem</div>
          <div style="display:flex;justify-content:space-between;align-items:center"><strong style="font-size:20px">Sessão URD</strong><span class="pill green">Ligada</span></div>
          <em>Fonte: Apex Timing · HTTP + WebSocket</em>
          <div class="app-btns"><span class="app-btn dark">Ligar sessão</span><span class="app-btn ghost">Usar replay de teste</span></div>
        </div>
        <div class="app-card">
          <div class="app-h">Pilotos da equipa</div>
          <table class="app-table"><thead><tr><th>Piloto</th><th>N.º no feed</th><th>Estado</th></tr></thead><tbody>
            <tr><td>Piloto A</td><td>#17</td><td><span class="pill green">Confirmado</span></td></tr>
            <tr><td>Piloto B</td><td>#17</td><td><span class="pill green">Confirmado</span></td></tr>
            <tr><td>Piloto C</td><td>#17</td><td><span class="pill amber">Por confirmar</span></td></tr>
          </tbody></table>
        </div>
      </div>
    </div>`),

  corrida: () => appShell("Corrida", LIVE, "GJ", `
    <div class="app-kpis">
      <div class="app-card"><small>Tempo restante</small><strong class="mono" data-remain>3:10:40</strong><em>Volta <span data-lap>176</span> · posição 5.ª</em></div>
      <div class="app-card"><small>Stint atual · Piloto B · Kart 17</small><strong><span class="mono" data-stint style="font:inherit;color:inherit;letter-spacing:-.035em">46:30</span> <span>/ 50 min</span></strong><div class="bar"><b data-stintbar style="width:93%;background:var(--orange)"></b></div></div>
      <div class="app-card"><small>Paragens obrigatórias</small><strong>3 <span>/ 8 cumpridas</span></strong><div class="bar"><b style="width:37.5%;background:var(--lime)"></b></div></div>
    </div>
    <div class="app-main">
      <div class="app-card">
        <small>Ritmo do stint · <span data-valid>48</span> voltas válidas · 3 excluídas</small>
        <div class="app-stats">
          <div><em>Ritmo (média)</em><strong>54,62 s</strong></div>
          <div><em>Regularidade</em><strong>0,31 s</strong></div>
          <div><em>Melhor volta</em><strong>54,08 s</strong></div>
        </div>
        <svg class="app-chart" viewBox="0 0 300 84" aria-hidden="true">
          <line x1="0" y1="18" x2="300" y2="18" stroke="#eef0f2"/><line x1="0" y1="44" x2="300" y2="44" stroke="#eef0f2"/><line x1="0" y1="70" x2="300" y2="70" stroke="#eef0f2"/>
          <polyline data-line fill="none" stroke="#111418" stroke-width="1.6" stroke-linejoin="round" points=""/>
          <circle data-last r="3.5" fill="#b7df00" stroke="#111418" stroke-width="1"/>
        </svg>
      </div>
      <div class="app-card">
        <small style="margin-bottom:8px">Alertas</small>
        <div class="app-alert amber" data-alert>Stint atinge o limite em 3 min 30 s</div>
        <div class="app-alert gray">Faltam 5 paragens obrigatórias</div>
        <div class="app-alert blue">Piloto C: faltam 24 min de condução mínima</div>
        <span class="app-btn lime">Comparar alternativas de paragem</span>
        <span class="app-btn ghost">Registar paragem</span>
      </div>
    </div>`),

  stints: () => appShell("Stints e paragens", LIVE, "HL", `
    <div class="app-two">
      <div class="app-card">
        <div class="app-h">Stints <span>registo partilhado pela equipa</span></div>
        <table class="app-table"><thead><tr><th>#</th><th>Piloto</th><th>Início</th><th>Duração</th><th>Voltas</th><th>Ritmo</th><th>Origem</th></tr></thead><tbody>
          <tr><td>1</td><td>Piloto A</td><td>0:00:00</td><td>48:12</td><td>52</td><td>54,71 s</td><td><span class="pill blue">URD</span></td></tr>
          <tr><td>2</td><td>Piloto C</td><td>0:50:17</td><td>35:40</td><td>38</td><td>55,02 s</td><td><span class="pill blue">URD</span></td></tr>
          <tr><td>3</td><td>Piloto A</td><td>1:28:02</td><td>32:43</td><td>35</td><td>54,58 s</td><td><span class="pill blue">URD</span> <span class="pill amber">Corrigido</span></td></tr>
          <tr class="cur"><td>4</td><td>Piloto B</td><td>2:02:50</td><td>46:30</td><td>51</td><td>54,62 s</td><td><span class="pill blue">URD</span></td></tr>
        </tbody></table>
        <div class="app-h" style="margin:16px 0 4px">Condução acumulada</div>
        <div class="app-drv"><span>Piloto A</span><div class="bar"><b style="width:54%;background:var(--black)"></b></div><span>1:21 / máx. 2:30</span></div>
        <div class="app-drv"><span>Piloto B</span><div class="bar"><b style="width:31%;background:var(--black)"></b></div><span>0:46 / máx. 2:30</span></div>
        <div class="app-drv"><span>Piloto C</span><div class="bar"><b style="width:24%;background:var(--orange)"></b></div><span>0:36 / mín. 1:00</span></div>
      </div>
      <div class="app-card">
        <div class="app-h">Registar paragem <span>3.ª paragem</span></div>
        <div style="display:grid;gap:8px">
          ${field("Entrada nas boxes", "2:00:45", `<span class="pill blue">Observado URD</span>`)}
          ${field("Saída das boxes", "2:02:50", `<span class="pill blue">Observado URD</span>`)}
          ${field("Tempo oficial de paragem", "2 min 05 s", `<span class="pill">Cumpre o mínimo</span>`)}
          ${field("Troca de piloto", "Piloto A → Piloto B", `<span class="pill amber">Confirmado manualmente</span>`)}
          ${field("Troca de kart", "Não", `<span class="pill amber">Manual</span>`)}
        </div>
        <div class="app-btns"><span class="app-btn lime">Guardar paragem</span><span class="app-btn ghost">Cancelar</span></div>
        <p class="app-note">Os valores manuais ficam identificados e não apagam a origem URD.</p>
      </div>
    </div>`),

  estrategia: () => appShell("Estratégia", LIVE, "GJ", `
    <div class="app-two" style="grid-template-columns:1fr 1.1fr">
      <div class="app-card">
        <div class="app-h">Pressupostos <span>iguais para as duas alternativas</span></div>
        <div class="app-kv"><span>Horizonte de comparação</span><b>60 min</b></div>
        <div class="app-kv"><span>Ritmo atual (r0)</span><b>54,62 s <span class="pill blue">Observado</span></b></div>
        <div class="app-kv"><span>Ritmo previsto após troca (r1)</span><b>54,20 s <span class="pill">Estimado</span></b></div>
        <div class="app-kv"><span>Perda nas boxes (P)</span><b>95 s <span class="pill">Estimado</span></b></div>
        <div class="app-kv"><span>Adiar a paragem</span><b>5 voltas</b></div>
        <div class="app-h" style="margin:12px 0 0">Alternativas</div>
        <div class="app-alt ok"><div><b>A · Parar agora</b><span class="pill green">Cumpre as regras</span></div><em>Distância projetada: <b style="font-size:inherit">64,7 voltas</b></em></div>
        <div class="app-alt"><div><b>B · Adiar 5 voltas</b><span class="pill red">Incompatível</span></div><em>Stint chegaria a 51 min (limite 50 min). Excluída.</em></div>
      </div>
      <div class="app-card" style="display:flex;flex-direction:column">
        <div class="app-h">Explicação <span class="pill" style="font-size:9.5px;padding:3px 6px">IA</span></div>
        <div class="app-ia" data-type>
          <p>A alternativa <b>A (parar agora)</b> é a única compatível com as regras configuradas. Adiar 5 voltas levaria o stint do Piloto B a cerca de 51 min, acima do limite de 50 min.</p>
          <p>Com os pressupostos indicados, parar agora dá <b>64,7 voltas</b> projetadas nos próximos 60 min. O ritmo após a troca e a perda nas boxes são <b>estimativas</b>, não valores observados.</p>
          <p>Esta comparação é uma projeção e não substitui a classificação oficial.</p>
        </div>
        <p class="app-note">Os valores vêm do cálculo do sistema; a explicação não os altera.</p>
        <span class="app-lbl" style="margin-top:auto;padding-top:10px">Decisão da equipa</span>
        <div class="app-dec"><span class="app-btn lime">Confirmar paragem agora</span><span class="app-btn ghost">Manter em pista</span></div>
      </div>
    </div>`),
};

function renderScreens() {
  document.querySelectorAll("[data-screen]").forEach((el) => {
    const make = SCREENS[el.dataset.screen];
    if (!make) return;
    el.classList.add("screen");
    el.innerHTML = `<div class="screen-inner">${make()}</div>`;
  });
  fitScreens();
  if ("ResizeObserver" in window) {
    const ro = new ResizeObserver(fitScreens);
    document.querySelectorAll(".screen").forEach((s) => ro.observe(s.parentElement));
  } else {
    window.addEventListener("resize", fitScreens);
  }
}

// Os ecrãs são desenhados a 760 px e escalados para caber, como uma captura.
function fitScreens() {
  document.querySelectorAll(".screen").forEach((s) => {
    const inner = s.firstElementChild;
    const w = s.clientWidth;
    if (!inner || !w) return;
    const k = Math.min(w / 760, 1.25);
    inner.style.transform = `scale(${k})`;
    s.style.height = `${inner.offsetHeight * k}px`;
  });
}

/* ---------------------------------------------------------------- painel ao vivo */

const fmt2 = (n) => String(n).padStart(2, "0");

function setupLive() {
  document.querySelectorAll("[data-live]").forEach((root) => {
    const $ = (s) => root.querySelector(s);
    const remainEl = $("[data-remain]"), stintEl = $("[data-stint]"), bar = $("[data-stintbar]");
    const alertEl = $("[data-alert]"), fresh = $("[data-fresh]"), lapEl = $("[data-lap]"), validEl = $("[data-valid]");
    const line = $("[data-line]"), last = $("[data-last]");
    let remain = 3 * 3600 + 10 * 60 + 40, stint = 46 * 60 + 30, lap = 176, valid = 48, age = 3, sinceLap = 0;
    // ritmo das últimas voltas (s), a melhorar ligeiramente ao longo do stint
    const laps = [];
    for (let i = 0; i < 30; i++) laps.push(54.95 - i * 0.01 + (Math.random() - .5) * .34);

    const draw = () => {
      const pts = laps.map((t, i) => `${4 + i * 9.8},${Math.max(8, Math.min(80, 44 + (t - 54.7) * 48)).toFixed(1)}`);
      line.setAttribute("points", pts.join(" "));
      const [x, y] = pts[pts.length - 1].split(",");
      last.setAttribute("cx", x); last.setAttribute("cy", y);
    };
    const paint = () => {
      remainEl.textContent = `${Math.floor(remain / 3600)}:${fmt2(Math.floor(remain / 60) % 60)}:${fmt2(remain % 60)}`;
      stintEl.textContent = `${fmt2(Math.floor(stint / 60))}:${fmt2(stint % 60)}`;
      bar.style.width = `${Math.min(100, (stint / 3000) * 100).toFixed(1)}%`;
      const left = Math.max(0, 3000 - stint);
      alertEl.textContent = left > 0
        ? `Stint atinge o limite em ${Math.floor(left / 60)} min ${fmt2(left % 60)} s`
        : "Stint no limite: chamar o piloto às boxes";
      fresh.textContent = `Dados atuais · há ${age} s`;
      lapEl.textContent = lap; validEl.textContent = valid;
    };
    draw(); paint();
    if (REDUCED) return;

    setInterval(() => {
      remain--; stint++; age = (age + 1) % 4; sinceLap++;
      if (sinceLap >= 5) {           // nova volta (acelerado para a demonstração)
        sinceLap = 0; lap++; valid++; age = 0;
        laps.shift(); laps.push(54.4 + Math.random() * .5);
        draw();
      }
      if (stint >= 3000 - 60) {      // volta ao início antes de chegar ao limite
        stint = 46 * 60 + 30; remain = 3 * 3600 + 10 * 60 + 40; lap = 176; valid = 48;
      }
      paint();
    }, 1000);
  });
}

/* ---------------------------------------------------------------- feed de cronometragem */

function setupFeed() {
  document.querySelectorAll("[data-feed]").forEach((feed) => {
    let lap = 176;
    const row = (n, t, cls = "") => {
      const r = document.createElement("div");
      r.className = `feed-row ${cls}`;
      const manual = n % 7 === 0;
      r.innerHTML = `<span>V${n}</span><b>Piloto B</b><span>${t.toFixed(2).replace(".", ",")} s</span>${manual ? '<span class="pill amber">Manual</span>' : '<span class="pill blue">URD</span>'}`;
      return r;
    };
    for (let i = 0; i < 6; i++) feed.append(row(lap - i, 54.3 + Math.random() * .6));
    if (REDUCED) return;
    setInterval(() => {
      if (document.hidden) return;
      lap++;
      feed.prepend(row(lap, 54.2 + Math.random() * .7, "new"));
      if (feed.children.length > 7) feed.lastElementChild.remove();
    }, 2600);
  });
}

/* ---------------------------------------------------------------- escrita da IA */

function typeOut(el) {
  if (!el || el.dataset.typing === "1") return;
  if (!el.dataset.html) el.dataset.html = el.innerHTML;
  if (REDUCED) { el.innerHTML = el.dataset.html; return; }
  el.dataset.typing = "1";
  const tmp = document.createElement("div");
  tmp.innerHTML = el.dataset.html;
  const paras = [...tmp.querySelectorAll("p")];
  const texts = paras.length ? paras.map((p) => p.textContent) : [tmp.textContent.trim()];
  el.innerHTML = texts.map(() => "<p></p>").join("");
  const ps = [...el.querySelectorAll("p")];
  let pi = 0, ci = 0;
  const step = () => {
    if (pi >= texts.length) { el.innerHTML = el.dataset.html; el.dataset.typing = ""; return; }
    ps.forEach((p) => p.classList.remove("typing"));
    ps[pi].classList.add("typing");
    ci += 2;
    ps[pi].textContent = texts[pi].slice(0, ci);
    if (ci >= texts[pi].length) { pi++; ci = 0; setTimeout(step, 260); } else setTimeout(step, 16);
  };
  step();
}

/* ---------------------------------------------------------------- visita guiada */

function setupTours() {
  document.querySelectorAll("[data-tour]").forEach((tour) => {
    const tabs = [...tour.querySelectorAll(".tour-tab")];
    const screens = [...tour.querySelectorAll(".tour-screens > .screen")];
    const url = tour.querySelector("[data-url]");
    const cap = tour.querySelector(".tour-caption");
    let idx = 0;
    const show = (i) => {
      idx = (i + tabs.length) % tabs.length;
      tabs.forEach((t, k) => {
        t.setAttribute("aria-selected", String(k === idx));
        t.tabIndex = k === idx ? 0 : -1;
        const bar = t.querySelector("i"); // reinicia a barra de progresso
        if (bar) { bar.style.animation = "none"; void bar.offsetWidth; bar.style.animation = ""; }
      });
      screens.forEach((s, k) => s.classList.toggle("active", k === idx));
      if (url) url.textContent = `app.stintops.pt/${tabs[idx].dataset.slug}`;
      if (cap) cap.textContent = tabs[idx].querySelector("span").textContent;
      typeOut(screens[idx].querySelector("[data-type]"));
      fitScreens();
    };
    tabs.forEach((t, k) => {
      t.addEventListener("click", () => { show(k); tour.classList.add("paused"); });
      t.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); show(idx + 1); tabs[idx].focus(); }
        if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); show(idx - 1); tabs[idx].focus(); }
      });
      const bar = t.querySelector("i");
      if (bar) bar.addEventListener("animationend", () => { if (k === idx && !tour.classList.contains("paused")) show(idx + 1); });
    });
    if (REDUCED) tour.classList.add("paused");
    // só roda sozinha quando está à vista
    tour.classList.add("idle");
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([e]) => tour.classList.toggle("idle", !e.isIntersecting), { threshold: 0.35 }).observe(tour);
    }
    show(0);
  });
}

/* ---------------------------------------------------------------- contadores */

function countUp(el) {
  const target = Number(el.dataset.count);
  if (REDUCED || !target) { el.textContent = target; return; }
  const t0 = performance.now(), dur = 1400;
  const tick = (t) => {
    const p = Math.min(1, (t - t0) / dur);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ---------------------------------------------------------------- capas das notícias */

const COVERS = {
  prototipo: `<svg viewBox="0 0 320 180" aria-hidden="true"><rect width="320" height="180" fill="#0b0d10"/>
    <g stroke="rgba(255,255,255,.07)"><path d="M0 45h320M0 90h320M0 135h320M80 0v180M160 0v180M240 0v180"/></g>
    <rect x="58" y="34" width="204" height="118" rx="8" fill="#15191f" stroke="#2b313a"/>
    <rect x="58" y="34" width="204" height="18" rx="8" fill="#1c2128"/><rect x="70" y="40" width="30" height="6" rx="3" fill="#b7df00"/>
    <rect x="70" y="62" width="58" height="32" rx="5" fill="#1c2128"/><rect x="134" y="62" width="58" height="32" rx="5" fill="#1c2128"/><rect x="198" y="62" width="52" height="32" rx="5" fill="#1c2128"/>
    <rect x="76" y="84" width="40" height="4" rx="2" fill="#c2541f"/><rect x="140" y="84" width="22" height="4" rx="2" fill="#b7df00"/>
    <polyline points="72,138 90,128 104,132 120,122 136,126 152,116 170,120 186,110 204,114" fill="none" stroke="#b7df00" stroke-width="2"/>
    <rect x="214" y="104" width="36" height="10" rx="3" fill="#b7df00"/><rect x="214" y="120" width="36" height="10" rx="3" fill="none" stroke="#3a414b"/>
    <text x="22" y="168" font-family="Inter,sans-serif" font-style="italic" font-weight="900" font-size="15" fill="#fff" letter-spacing="-.5">PROTÓTIPO</text></svg>`,
  aovivo: `<svg viewBox="0 0 320 180" aria-hidden="true"><rect width="320" height="180" fill="#0b0d10"/>
    <path d="M0 140 C40 130 60 60 100 80 S150 140 190 90 240 40 320 60" fill="none" stroke="rgba(183,223,0,.25)" stroke-width="14" stroke-linecap="round"/>
    <path d="M0 140 C40 130 60 60 100 80 S150 140 190 90 240 40 320 60" fill="none" stroke="#b7df00" stroke-width="2.5"/>
    <circle cx="190" cy="90" r="6" fill="#fff"/><circle cx="190" cy="90" r="14" fill="none" stroke="#fff" opacity=".3"/>
    <g font-family="JetBrains Mono,monospace" font-size="11" fill="#9ba3ae"><text x="22" y="34">V176  54,62</text><text x="22" y="50">V177  54,48</text><text x="22" y="66" fill="#b7df00">V178  54,31</text></g>
    <circle cx="28" cy="160" r="5" fill="#e5484d"/>
    <text x="40" y="165" font-family="Inter,sans-serif" font-style="italic" font-weight="900" font-size="15" fill="#fff">AO VIVO</text></svg>`,
  arranque: `<svg viewBox="0 0 320 180" aria-hidden="true"><defs><pattern id="chk" width="20" height="20" patternUnits="userSpaceOnUse"><rect width="10" height="10" fill="#fff"/><rect x="10" y="10" width="10" height="10" fill="#fff"/></pattern></defs>
    <rect width="320" height="180" fill="#0b0d10"/><rect x="210" width="110" height="180" fill="url(#chk)" opacity=".12"/>
    <text x="150" y="104" text-anchor="middle" font-family="Inter,sans-serif" font-style="italic" font-weight="900" font-size="42" letter-spacing="-2" fill="#fff"><tspan fill="#b7df00">S</tspan>tintops</text>
    <text x="150" y="130" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="10" fill="#9ba3ae">12.10.2026 · ISCTE</text></svg>`,
};

function renderCovers() {
  document.querySelectorAll("[data-cover]").forEach((el) => { el.innerHTML = COVERS[el.dataset.cover] || ""; });
}

/* ---------------------------------------------------------------- aparecer ao fazer scroll */

const REVEAL = [
  ".section-head", ".pain", ".feature", ".tile", ".step", ".value", ".testi", ".post", ".member",
  ".stat", ".vs-col", ".vs-arrow", ".tour", ".quote-box", ".faq details", ".faq h2", ".card", ".info-list",
  ".timeline li", ".prose > *", ".table-scroll", ".cta-band .wrap > *", ".crew", ".perks li", ".more",
].join(",");

function setupReveal() {
  const els = [...document.querySelectorAll(REVEAL)].filter((el) => !el.closest(".hero, .page-hero, .tour-tabs, .app"));
  const groups = new Map();
  els.forEach((el) => {
    el.classList.add("reveal");
    const n = groups.get(el.parentElement) || 0;
    groups.set(el.parentElement, n + 1);
    el.style.setProperty("--d", `${Math.min(n, 6) * 90}ms`);
  });
  const watch = [...els, ...document.querySelectorAll(".steps, [data-count], [data-type-on-view]")];
  if (REDUCED || !("IntersectionObserver" in window)) {
    watch.forEach(onEnter);
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { onEnter(e.target); io.unobserve(e.target); } });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  watch.forEach((el) => io.observe(el));
}

function onEnter(el) {
  el.classList.add("in");
  if (el.dataset.count) countUp(el);
  if (el.hasAttribute("data-type-on-view")) setTimeout(() => typeOut(el), 500);
}

/* ---------------------------------------------------------------- formulários */

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

/* ---------------------------------------------------------------- faixa em movimento */

function setupTicker() {
  document.querySelectorAll(".ticker-track").forEach((t) => { t.innerHTML += t.innerHTML; });
}

renderHeader();
renderFooter();
setupHeader();
setupNav();
decorateHeroes();
renderScreens();
renderCovers();
setupTicker();
setupLive();
setupFeed();
setupTours();
setupForms();
setupReveal();
window.addEventListener("load", fitScreens);
