/* Renders the "buy" controls for each product from assets/js/shop-config.js */
(function () {
  'use strict';
  var cfg = window.AEGIS_SHOP;
  if (!cfg) return;

  function el(tag, attrs, text) {
    var e = document.createElement(tag);
    for (var k in attrs || {}) e.setAttribute(k, attrs[k]);
    if (text) e.textContent = text;
    return e;
  }

  function field(labelText, id, choices) {
    var wrap = el('div', { 'class': 'aegis-field' });
    wrap.appendChild(el('label', { 'for': id }, labelText));
    var sel = el('select', { id: id });
    sel.appendChild(el('option', { value: '' }, 'Select ' + labelText));
    choices.forEach(function (c, i) { sel.appendChild(el('option', { value: String(i) }, c)); });
    wrap.appendChild(sel);
    return { wrap: wrap, select: sel };
  }

  document.querySelectorAll('[data-aegis-buy]').forEach(function (box, n) {
    var key = box.getAttribute('data-aegis-buy');
    var p = cfg.products[key];
    if (!p) return;
    box.classList.add('aegis-buy');

    var who = null;
    if (p.askWhoFor) {
      who = field('who is this for?', 'who-' + key + '-' + n, ['this is for me', 'I would like to buy this as a gift voucher']);
      box.appendChild(who.wrap);
    }
    var opt = field(p.optionLabel, 'opt-' + key + '-' + n, p.options.map(function (o) {
      return o.price && o.label.indexOf('£') !== 0 ? o.label + ' (' + o.price + ')' : o.label;
    }));
    box.appendChild(opt.wrap);

    var msg = el('p', { 'class': 'aegis-buy-msg', 'aria-live': 'polite' });
    var btn = el('a', { 'class': 'aegis-buy-btn', href: '#', role: 'button' }, 'buy now');
    box.appendChild(btn);
    box.appendChild(msg);

    btn.addEventListener('click', function (e) {
      var i = opt.select.value;
      if (i === '' || (who && who.select.value === '')) {
        e.preventDefault();
        msg.textContent = 'Please choose ' + (who && who.select.value === '' ? 'who this is for' : 'a ' + p.optionLabel) + ' first.';
        return;
      }
      msg.textContent = '';
      var o = p.options[+i];
      var isGift = who && who.select.value === '1';
      if (o.link) {
        var url = o.link + (o.link.indexOf('?') > -1 ? '&' : '?') + 'client_reference_id=' + (isGift ? 'gift-voucher' : 'for-me');
        btn.setAttribute('href', url);
        return; // follow the link to Stripe checkout
      }
      // No Stripe link yet: fall back to an enquiry email
      var subject = 'Order enquiry: ' + p.name + ' (' + o.label + ')';
      var body = 'Hello Pen,\n\nI would like to order the ' + p.name + ' (' + o.label + ')' + (isGift ? ' as a gift voucher' : '') + '.\n\nThank you';
      btn.setAttribute('href', 'mailto:' + cfg.email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body));
    });
  });
})();
