# Stories of Science

An illustrated collection of 25 historical science narratives, connected to an atlas of 219 milestones and 362 people.

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
