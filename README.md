# PeptidesCanada Static GitHub Pages Site

This folder is a complete static website version of the PeptidesCanada catalog.

## Files

- `index.html` is at the root for GitHub Pages.
- `products.html` lists all products.
- `products/` contains individual product pages.
- `collections/` contains collection pages.
- `assets/` contains local images and the logo.
- `style.css` and `script.js` power the static design and simple interactions.

## Upload to GitHub Pages

1. Create or open your GitHub repository.
2. Upload the contents of this folder, not the folder itself.
3. Make sure `index.html` is directly at the repository root.
4. Go to repository Settings > Pages.
5. Select the branch and root folder, then save.

## Payment Setup

The site does not use Shopify checkout. All order buttons redirect to `payment.html`.

Before publishing, edit:

- `payment.html` and replace `REPLACE_WITH_PAYMENT_EMAIL`.
- `contact.html` and replace the support email placeholder.

## Compliance Note

All product copy is written for research-use-only positioning and avoids medical, therapeutic, cosmetic, human-use, or disease claims.
