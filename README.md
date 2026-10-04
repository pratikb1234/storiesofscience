# Stories of Science

An illustrated collection of 37 historical science narratives, connected to an atlas of 228 milestones and 378 people.

## Run locally

Serve `dist` using any static HTTP server. For example:

```sh
python3 -m http.server 8000 --directory dist
```

## Validate

```sh
node scripts/validate.mjs
```

## GitHub Pages

The workflow in `.github/workflows/pages.yml` publishes the contents of `dist` on pushes to `main`. In the repository's Settings → Pages, select **GitHub Actions** as the source. No build service, backend, or secret is required.

All asset references are relative, so the site works under a repository path. Story and atlas links use URL fragments.

## Content and images

Narratives include reading sources and notes on historical uncertainty. Image metadata includes authorship, licence information and original source links. Individual image licences remain applicable.

The network distinguishes recorded personal relationships from shared milestone and connected idea associations. An association between two scientists' work does not claim they met or collaborated.

The `uncommon-stories.js` collection adds 12 sourced histories, including the dissolved Nobel medals. Each includes a historical caution, story specific extended reading, and a clearly labelled original explanatory diagram.
