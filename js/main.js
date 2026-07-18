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
