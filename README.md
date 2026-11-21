# StintOps — Website corporativo

Site estático (HTML + CSS + JS, sem dependências nem build). Abre-se com qualquer servidor estático ou pode ser publicado tal como está (GitHub Pages, Netlify, Vercel, Railway).

## Estrutura

```
index.html        Homepage
produto.html      Funcionalidades, como funciona, roteiro
sobre.html        História, missão, valores, equipa
noticias.html     Notícias e agenda
faq.html          Perguntas frequentes
contactos.html    Formulário (programa piloto / demonstração / outro)
privacidade.html  Política de privacidade
assets/css/style.css   Estilos de todas as páginas
assets/js/main.js      Cabeçalho, rodapé, menu móvel e formulários (editar aqui o que é comum)
assets/img/            Logótipo e favicon
entrega/               Documento do exercício: site map, CTA e copy da homepage
```

## Ver localmente

```bash
python3 -m http.server 8000
```

Depois abrir http://localhost:8000.

## Antes de publicar

- [ ] Email real em `assets/js/main.js` (`SITE.email`), `contactos.html` e `privacidade.html` (hoje: `contacto@stintops.pt`, provisório).
- [ ] Endpoint de formulários em `SITE.formEndpoint` (ex.: Formspree). Sem ele, os formulários só mostram a confirmação.
- [ ] Fotografias da equipa em `sobre.html` (hoje: iniciais).
- [ ] Testemunhos reais na homepage, depois do programa piloto.
- [ ] Domínio final nos `canonical`, `sitemap.xml` e `robots.txt` (hoje: `stintops.pt`).
- [ ] Confirmar com a equipa: datas das notícias, «sem custos» do programa piloto, funções da equipa.
