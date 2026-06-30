# Home Credit Developer Documentation

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator. It serves as the developer documentation portal for Home Credit, covering integration guides, API references, and widgets.

## Installation

```bash
npm install
```

## Local Development

Start the development server for a specific locale:

```bash
# Czech (default locale)
npm run start -- --locale cs

# English
npm run start -- --locale en
```

This starts a local development server with live reload. The site supports two locales: **Czech** (`cs`, default) and **English** (`en`).

## Build

Before building, clear any previous build artifacts to avoid stale files:

```bash
npm run clear
```

Then generate the static site into the `build/` directory:

```bash
npm run build
```

## API Docs Generation

API documentation is generated from OpenAPI spec files located in `api-docs-source/`. Each spec has both an English and a Czech version (e.g. `eshopopenapispec.yaml` and `eshopopenapispec.cs.yaml`).

The generation is configured in `docusaurus.config.ts` under the `docusaurus-plugin-openapi-docs` plugin. Output directories are:

- `docs/api/eshopReference/` — eshop API (English)
- `i18n/cs/docusaurus-plugin-content-docs/current/api/eshopReference/` — eshop API (Czech)
- `docs/api/Reference/` — PSP API (English)
- `i18n/cs/docusaurus-plugin-content-docs/current/api/Reference/` — PSP API (Czech)

To regenerate all API docs (clears existing `.mdx` files and recreates them from the spec files):

```bash
npm run cleangen:apidocs
```

This runs `docusaurus clean-api-docs all && docusaurus gen-api-docs all` under the hood.

## Sidebars

Sidebars are defined in `sidebars.ts` and consist of three sections:

- **`docSidebar`** — Main documentation (integration guide, process flow, communication security, dev/prod environment setup, test cases, widgets, FAQ, etc.)
- **`eshopApiReference`** — Auto-generated from `docs/api/eshopReference/sidebar` (eshop API reference)
- **`apiReference`** — Auto-generated from `docs/api/Reference/sidebar` (PSP API reference)

## Search

Search is powered by [Algolia DocSearch](https://docsearch.algolia.com/). Configuration is in `docusaurus.config.ts` under `themeConfig.algolia`. The index is configured to strip the `/cs/` prefix from URLs since Czech is the default locale served at the root path.

App ID, API key, and index name can be overridden via environment variables:

```
ALGOLIA_APP_ID
ALGOLIA_API_KEY
ALGOLIA_INDEX_NAME
ALGOLIA_SITE_VERIFICATION
```

## Deployment

### Option 1: GitHub Pages

> NOTE: these scripts might need some adjustments for particular needs and might not be entirely correct as it is not tested yet

Using SSH:

```bash
USE_SSH=true npm run deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> npm run deploy
```

This builds the site and pushes it to the `gh-pages` branch.

### Option 2: Cloudflare Pages (via Wrangler)

Authenticate first (only needed once):

```bash
wrangler login
```

Then deploy the `build/` directory to Cloudflare Pages:

```bash
wrangler pages deploy build --project-name=hc-docs # or any other name for the project
```

Make sure to run `npm run clear` and `npm run build` before deploying to ensure a fresh build.
