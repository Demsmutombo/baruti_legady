# baruti_legady

Site mémorial **Baruti Legacy Foundation** — hommage au Pasteur Léonard Baruti Kasongo Bin N'djadi.

## Stack

- Vue 3 + Vite
- Vue Router
- Tailwind CSS
- GSAP (splash screen)
- AOS + Swiper.js

## Commandes

```bash
npm install
npm run dev
npm run build
```

## Déploiement Vercel

### Option 1 — Interface Vercel (recommandé)

1. Connectez le dépôt GitHub : [github.com/Demsmutombo/baruti_legady](https://github.com/Demsmutombo/baruti_legady)
2. Vercel détecte automatiquement **Vite**
3. Paramètres (déjà dans `vercel.json`) :
   - **Build Command** : `npm run build`
   - **Output Directory** : `dist`
   - **Install Command** : `npm install`
   - **Node.js** : 20.x (`.nvmrc`)
4. Cliquez **Deploy**

### Option 2 — CLI Vercel

```bash
npm i -g vercel
vercel login
vercel
vercel --prod
```

### Fichiers de configuration

| Fichier | Rôle |
|---------|------|
| `vercel.json` | Build, rewrites SPA (Vue Router), cache assets |
| `.nvmrc` | Version Node.js 20 |
| `.vercelignore` | Fichiers exclus du déploiement |

Les routes internes (`/biographie`, `/contact`, etc.) fonctionnent grâce au rewrite vers `index.html`.
