# Peptides Canada Static GitHub Pages Build

This folder is a static conversion of a Shopify theme export.

It is designed to run on GitHub Pages with only static files:

- `index.html`
- `style.css`
- `script.js`
- `assets/`

No Shopify Liquid templates, Shopify sections, Shopify cart, Shopify checkout, product forms, or Shopify API calls are required.

## What Was Converted

- Shopify Liquid templates were replaced with static HTML.
- Shopify product loops were replaced with static product cards.
- Product images and collection images were downloaded into `assets/`.
- Shopify cart and checkout buttons were replaced with external placeholder links.
- A small standalone `script.js` handles:
  - mobile menu toggle
  - outside click close behavior
  - Escape key close behavior
  - static search/filter behavior
  - disclaimer close button
  - research-use confirmation modal

## Before Publishing

Open `index.html` and replace every placeholder product button URL:

```html
https://example.com/replace-with-payment-link
```

Use your approved external payment, product, or inquiry URL.

Also replace the contact email:

```html
support@example.com
```

## Upload To GitHub Pages

1. Create a new GitHub repository.
2. Upload the full contents of this folder to the repository root.
3. Make sure `index.html` is at the root, not inside a subfolder.
4. Go to repository `Settings`.
5. Open `Pages`.
6. Under `Build and deployment`, choose:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
7. Save.

GitHub will publish the site at a URL similar to:

```text
https://your-username.github.io/your-repository-name/
```

## Notes

- This is a static catalog, not a Shopify storefront.
- It does not process payments.
- It does not manage cart state.
- It does not connect to Shopify inventory or checkout.
- Product buttons are placeholders until you replace them.
- All paths are relative, such as `./assets/logo.svg`, `./style.css`, and `./script.js`.
