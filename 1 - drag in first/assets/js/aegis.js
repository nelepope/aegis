/* ÆGIS site scripts: small replacements for the bits Squarespace did with JavaScript. */
(function () {
  'use strict';

  /* 1. "Fit to box" headings (Squarespace scaled text) */
  function fitText() {
    document.querySelectorAll('.sqsrte-scaled-text-container').forEach(function (box) {
      var block = box.closest('.fe-block') || box.parentElement;
      var span = box.querySelector('.sqsrte-scaled-text');
      if (!span) return;
      var maxW = block.clientWidth, maxH = block.clientHeight;
      if (!maxW || !maxH) return;
      var lo = 4, hi = 400, size = lo;
      box.style.fontSize = '';
      while (lo <= hi) {
        var mid = (lo + hi) >> 1;
        box.style.setProperty('--sqsrte-scaled-text-size', mid + 'px');
        span.style.fontSize = mid + 'px';
        var lines = span.querySelectorAll("br").length + 1;
        if (span.scrollWidth <= maxW + 1 && span.offsetHeight <= Math.min(maxH + 1, mid * 1.35 * lines)) { size = mid; lo = mid + 1; } else { hi = mid - 1; }
      }
      span.style.fontSize = size + 'px';
      box.classList.add('is-fitted');
    });
  }

  /* 2. Mobile menu */
  function menu() {
    document.querySelectorAll('.header-burger-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var open = document.body.classList.toggle('header--menu-open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        document.querySelectorAll('.header-menu').forEach(function (m) { m.setAttribute('aria-hidden', open ? 'false' : 'true'); });
      });
    });
  }

  /* 3. Lightbox for gallery images */
  function lightbox() {
    var imgs = Array.prototype.slice.call(document.querySelectorAll('[data-lightbox] img'));
    if (!imgs.length) return;
    var box = document.createElement('div');
    box.className = 'aegis-lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.innerHTML = '<button class="lb-close" aria-label="Close">&times;</button><button class="lb-prev" aria-label="Previous">&#8249;</button><img alt=""><button class="lb-next" aria-label="Next">&#8250;</button>';
    document.body.appendChild(box);
    var big = box.querySelector('img'), i = 0;
    function show(n) { i = (n + imgs.length) % imgs.length; big.src = imgs[i].src; big.alt = imgs[i].alt || ''; box.classList.add('open'); }
    function hide() { box.classList.remove('open'); }
    imgs.forEach(function (im, n) { im.style.cursor = 'zoom-in'; im.addEventListener('click', function (e) { e.preventDefault(); show(n); }); });
    box.querySelector('.lb-close').onclick = hide;
    box.querySelector('.lb-prev').onclick = function () { show(i - 1); };
    box.querySelector('.lb-next').onclick = function () { show(i + 1); };
    box.addEventListener('click', function (e) { if (e.target === box) hide(); });
    document.addEventListener('keydown', function (e) {
      if (!box.classList.contains('open')) return;
      if (e.key === 'Escape') hide(); if (e.key === 'ArrowLeft') show(i - 1); if (e.key === 'ArrowRight') show(i + 1);
    });
  }

  /* 4. Product image carousels: thumbnails swap the main image */
  function productGallery() {
    document.querySelectorAll('.aegis-product-gallery').forEach(function (g) {
      var main = g.querySelector('.apg-main img');
      g.querySelectorAll('.apg-thumbs button').forEach(function (b) {
        b.addEventListener('click', function () {
          main.src = b.querySelector('img').src;
          g.querySelectorAll('.apg-thumbs button').forEach(function (x) { x.classList.remove('active'); });
          b.classList.add('active');
        });
      });
    });
  }


  /* 5. Enquiry form: send to Formspree without leaving the page */
  function enquiryForm() {
    var f = document.querySelector('.aegis-form');
    if (!f) return;
    var status = f.querySelector('.aegis-form-status');
    f.addEventListener('submit', function (e) {
      if (f.action.indexOf('FORMSPREE_ID') > -1) {
        e.preventDefault();
        status.textContent = 'The form is not connected yet. Please email info@studioaegis.co.uk.';
        return;
      }
      e.preventDefault();
      var btn = f.querySelector('button');
      btn.disabled = true;
      status.textContent = 'Sending…';
      fetch(f.action, { method: 'POST', body: new FormData(f), headers: { Accept: 'application/json' } })
        .then(function (r) {
          if (!r.ok) throw new Error();
          f.reset();
          status.textContent = 'Thank you. Pen will be in touch soon.';
        })
        .catch(function () { status.textContent = 'Sorry, something went wrong. Please email info@studioaegis.co.uk.'; })
        .then(function () { btn.disabled = false; });
    });
  }

  function ready() { fitText(); menu(); lightbox(); productGallery(); enquiryForm(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready); else ready();
  window.addEventListener('load', fitText);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitText);
  var t; window.addEventListener('resize', function () { clearTimeout(t); t = setTimeout(fitText, 120); });
})();
