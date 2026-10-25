# NeuroPolicy Cognita

The website for NeuroPolicy Cognita, built with [Astro](https://astro.build). Articles live in `src/content/articles/` as simple text files, and every change pushed to GitHub rebuilds and republishes the site automatically.

## Where things are

| You want to change… | Edit this |
|---|---|
| An article | `src/content/articles/<name>.md` (or use Pages CMS) |
| Article images | `public/images/` |
| Section titles and descriptions | `src/lib/site.ts` |
| Home page text | `src/pages/index.astro` |
| About page | `src/pages/about.astro` |
| Contact form key | `src/pages/contact.astro` (line 4) |
| Colours and fonts | `src/styles/global.css` (top of file) |

## Article fields

Each article starts with a short block between `---` lines:

- `section`: the home section (`finance`, `politics`, `marketing` or `thinking`)
- `lenses`: other sections it connects to. This drives the cross-links, the "Crossing over" lists and the map on the home page.
- `concept`: the core idea, shown beside the article
- `featured: true` puts it in the lead slot on the home page
- `draft: true` hides it from the live site

## Launch steps

1. Create a GitHub account and install GitHub Desktop.
2. Create a new repository called `neuropolicycognita`, add this folder to it and publish it (public).
3. On GitHub: Settings → Pages → Source → **GitHub Actions**. The site goes live at `https://<username>.github.io/neuropolicycognita/` a couple of minutes later.
4. Go to https://app.pagescms.org, sign in with GitHub and open this repository to edit articles.
5. Get a free key at https://web3forms.com and paste it into `src/pages/contact.astro`.
6. Custom domain: create a file `public/CNAME` containing just `neuropolicycognita.com`, then set the DNS records at your registrar and enter the domain under Settings → Pages.

## Working on your own computer (optional)

Needs Node.js 20 or newer.

```
npm install
npm run dev      # live preview at http://localhost:4321
npm run build    # production build into dist/
```
