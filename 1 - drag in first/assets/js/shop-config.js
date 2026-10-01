/*
  ÆGIS SHOP SETTINGS
  ==================
  This is the only file you need to edit to change prices or checkout links.

  For each option, paste the Stripe Payment Link (it starts with https://buy.stripe.com/)
  between the quotes after  link:
  If a link is left empty, the button opens an enquiry email instead, so nothing ever breaks.

  "price" is only what the site displays. The amount actually charged is set in Stripe.
*/
window.AEGIS_SHOP = {
  email: 'info@studioaegis.co.uk',

  products: {
    'chest': {
      name: 'chest cast',
      fromPrice: '£650.00',
      optionLabel: 'finish',
      askWhoFor: true,
      options: [
        { label: 'gilded (gold or silver)', price: '£850', link: '' },
        { label: 'stone', price: '£650', link: '' }
      ]
    },

    'uppertorso': {
      name: 'upper torso',
      fromPrice: '£2,000.00',
      optionLabel: 'finish',
      askWhoFor: true,
      options: [
        { label: 'gilded', price: '', link: '' },
        { label: 'stone', price: '', link: '' }
      ]
    },

    'hand-cast-1': {
      name: 'hand cast',
      fromPrice: '£300.00',
      optionLabel: 'finish',
      askWhoFor: true,
      options: [
        { label: 'gilded', price: '', link: '' },
        { label: 'stone', price: '', link: '' }
      ]
    },

    'fingerprint-pendant': {
      name: 'fingerprint pendant',
      fromPrice: '£190.00',
      optionLabel: 'material',
      askWhoFor: true,
      options: [
        { label: 'solid silver', price: '£190', link: '' },
        { label: 'gold plated silver', price: '£250', link: '' },
        { label: '22ct yellow gold', price: '£500', link: '' }
      ]
    },

    'gift-card': {
      name: 'gift card',
      fromPrice: '£50.00',
      optionLabel: 'value',
      askWhoFor: false,
      options: [
        { label: '£50.00', price: '£50', link: '' },
        { label: '£100.00', price: '£100', link: '' },
        { label: '£250.00', price: '£250', link: '' },
        { label: '£500.00', price: '£500', link: '' },
        { label: '£600.00', price: '£600', link: '' },
        { label: '£800.00', price: '£800', link: '' },
        { label: '£1,000.00', price: '£1,000', link: '' },
        { label: '£2,000.00', price: '£2,000', link: '' }
      ]
    }
  }
};
