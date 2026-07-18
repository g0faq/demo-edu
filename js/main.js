(function () {
  'use strict';

  var form = document.getElementById('lead-form');
  var success = document.getElementById('form-success');
  var errorBox = document.getElementById('form-error');

  if (!form) return;

  function showError(message) {
    errorBox.textContent = message;
    errorBox.hidden = false;
  }

  function clearError() {
    errorBox.textContent = '';
    errorBox.hidden = true;
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    clearError();

    var data = {
      name: form.name.value.trim(),
      grade: form.grade.value.trim(),
      contact: form.contact.value.trim()
    };

    if (!data.name || !data.grade || !data.contact) {
      showError('Пожалуйста, заполните все поля.');
      return;
    }

    var button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    button.textContent = 'Отправляем…';

    fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(function (response) {
        return response.json().then(function (body) {
          return { ok: response.ok, body: body };
        });
      })
      .then(function (result) {
        if (!result.ok || !result.body || !result.body.ok) {
          throw new Error('bad response');
        }
        form.hidden = true;
        success.hidden = false;
      })
      .catch(function () {
        button.disabled = false;
        button.textContent = 'Отправить заявку';
        showError('Не удалось отправить заявку. Попробуйте ещё раз.');
      });
  });
})();

/* Scroll reveal with stagger */
(function () {
  'use strict';

  var reduceMotion =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || !('IntersectionObserver' in window)) return;

  // Groups whose direct children reveal with a staggered delay.
  var groups = document.querySelectorAll('.stats, .steps, .plans, .accordion');
  Array.prototype.forEach.call(groups, function (group) {
    Array.prototype.forEach.call(group.children, function (child, i) {
      child.classList.add('reveal');
      child.style.transitionDelay = i * 80 + 'ms';
    });
  });

  // Standalone blocks that reveal as a whole.
  var singles = document.querySelectorAll(
    '.section h2, .section__sub, .form'
  );
  Array.prototype.forEach.call(singles, function (el) {
    el.classList.add('reveal');
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  );

  Array.prototype.forEach.call(
    document.querySelectorAll('.reveal'),
    function (el) {
      observer.observe(el);
    }
  );
})();

/* Sticky mobile CTA — appears after the first screen */
(function () {
  'use strict';

  var cta = document.getElementById('sticky-cta');
  if (!cta) return;

  function update() {
    if (window.scrollY > window.innerHeight * 0.9) {
      cta.classList.add('is-visible');
    } else {
      cta.classList.remove('is-visible');
    }
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();
