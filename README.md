# ÆGIS Body Casting website

The static version of [studioaegis.co.uk](https://www.studioaegis.co.uk), moved from Squarespace to GitHub Pages in October 2026.

Every page keeps its old address (`/about`, `/selectworks`, `/shop1`, `/shop/p/chest` and so on), so existing links, Instagram bio links and Google results keep working.

## What's where

| Path | What it is |
| --- | --- |
| `index.html` | Home page |
| `about/` | Explore |
| `selectworks/` | Gallery |
| `testimonials/`, `story/`, `appointments/`, `enquiries/` | The pages of the same name |
| `shop1/`, `body/`, `jewellery/`, `gift-vouchers-1/` | Shop pages |
| `shop/p/<product>/` | Product pages (chest, uppertorso, hand-cast-1, fingerprint-pendant, gift-card) |
| `assets/img/` | All images (WebP, resized for the web) |
| `assets/fonts/` | Editor's Note, Medino and Josefin (your uploaded fonts) plus the theme fonts, all self-hosted |
| `assets/css/theme.css` | The original Squarespace theme styles, trimmed to what the site uses. Best left alone. |
| `assets/css/aegis.css` | Your custom CSS from Squarespace plus the static-site additions. Make style changes here. |
| `assets/js/shop-config.js` | **Prices and Stripe checkout links** |
| `assets/js/shop.js`, `assets/js/aegis.js` | Small scripts for the buy buttons, mobile menu, gallery lightbox and contact form |
| `CNAME` | Tells GitHub Pages to serve the site on www.studioaegis.co.uk |
| `404.html` | "Page not found" page |

## Editing text

Open the page's `index.html` in any text editor (VS Code is free and good), search for the sentence you want to change, edit it and save. Keep the surrounding tags as they are.

To swap an image, put the new file in `assets/img/` and change the file name in the `src="/assets/img/..."` of the image you're replacing.

## Shop: connecting Stripe

The basket from Squarespace can't run on a static site, so each product has a **buy now** button that opens a Stripe checkout.

1. In Stripe, go to **Payment Links** and create one link per product option (for example "chest cast, gilded" at £850). Turn on **Collect customers' addresses** and add a custom field such as "Is this a gift?" if you'd like.
2. Copy each link (it starts `https://buy.stripe.com/`) into `assets/js/shop-config.js`, between the quotes after `link:` for that option.
3. Save, commit and push. That's it.

Until a link is filled in, the button opens a pre-written enquiry email to info@studioaegis.co.uk instead, so nothing breaks in the meantime.

When someone chooses "I would like to buy this as a gift voucher", the checkout is tagged `gift-voucher` (shown as the client reference on the payment in Stripe); otherwise it's tagged `for-me`.

## Contact form: connecting Formspree

1. Make a free account at [formspree.io](https://formspree.io) using info@studioaegis.co.uk and create a form.
2. Copy the form ID (the code at the end of `https://formspree.io/f/xxxxxxx`).
3. In `enquiries/index.html`, replace `FORMSPREE_ID` with that code.

Until then, the form tells visitors to email you directly.

## Publishing changes

With GitHub Desktop: make your edits, write a short note in the **Summary** box, click **Commit to main**, then **Push origin**. The live site updates within a minute or two.
