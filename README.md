# Mailson Alves — Psicólogo Clínico
### Landing Page Premium · v1.0

Desenvolvido por **Vórtex Systems BR**

---

## Estrutura do projeto

```
mailson-alves/
├── index.html          → Página principal (SEO, Schema.org, todas as seções)
├── style.css           → Estilos (CSS puro, custom properties, responsivo)
├── script.js           → JavaScript (scroll, navbar, FAQ, animações)
├── robots.txt          → Diretivas para motores de busca
├── sitemap.xml         → Mapa do site (SEO)
├── manifest.json       → Web App Manifest (PWA)
├── README.md           → Este arquivo
└── assets/
    └── img/
        ├── hero.jpg    → Foto principal (Hero) — Mailson na mesa
        ├── sobre.jpg   → Foto Sobre — Mailson sorrindo
        ├── extra.jpg   → Foto extra disponível
        └── logo.png    → Logomarca oficial
```

---

## Publicação

1. Faça upload de todos os arquivos na raiz do seu domínio (ex: `mailsonalves.com.br`)
2. Certifique-se de que a pasta `assets/img/` mantém a estrutura acima
3. Substitua as URLs placeholder `mailsonalves.com.br` pelas definitivas em:
   - `index.html` → meta tags og:url, og:image, canonical
   - `sitemap.xml` → tag `<loc>`
4. Adicione o Google Maps Embed ID real (opcional — o embed atual funciona via busca)

---

## Tecnologias

| Recurso         | Implementação                                   |
|-----------------|-------------------------------------------------|
| HTML5 semântico | Roles ARIA, landmark regions, alt texts         |
| CSS3 puro       | Custom Properties, Grid, Flexbox, Glassmorphism |
| JS Vanilla ES6+ | IntersectionObserver, Parallax, FAQ Accordion   |
| Fontes          | Cormorant Garamond + Inter (Google Fonts)       |
| SEO             | Meta, OG, Twitter Cards, JSON-LD Schema.org     |
| Performance     | loading="lazy", fetchpriority, defer scripts    |
| Acessibilidade  | ARIA labels, keyboard nav, prefers-reduced-motion|

---

## Personalização rápida

**Trocar número WhatsApp:**  
Busque `5518991250514` em `index.html` e `script.js` e substitua.

**Trocar foto hero:**  
Substitua `assets/img/hero.jpg` mantendo o mesmo nome.

**Trocar cores:**  
Edite as variáveis no topo de `style.css` (bloco `:root`).

---

*© 2025 Vórtex Systems BR · Todos os direitos reservados*
