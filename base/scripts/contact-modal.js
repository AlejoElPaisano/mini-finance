/**
 * contact-modal.js
 * Modal de contacto desde el footer.
 * Mini Finance - IntegrarTEC 2026.
 */

(function () {
  'use strict';

  let modalKeydownHandler = null;

  function openContactModal() {
    const existing = document.querySelector('.contact-modal-overlay');
    if (existing) {
      existing.querySelector('.contact-modal__close')?.focus();
      return;
    }

    const modal = document.createElement('div');
    modal.className = 'contact-modal-overlay';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Formulario de contacto');

    modal.innerHTML = `
      <div class="contact-modal">
        <header class="contact-modal__header">
          <h2>Contáctanos</h2>
          <button type="button" class="contact-modal__close" aria-label="Cerrar">
            <span aria-hidden="true">✕</span>
          </button>
        </header>
        <div class="contact-modal__body">
          <form class="contact-form" id="contact-form" novalidate>
            <div class="form-group">
              <label for="contact-name">Nombre</label>
              <input type="text" id="contact-name" name="name" required placeholder="Tu nombre">
            </div>
            <div class="form-group">
              <label for="contact-lastname">Apellido</label>
              <input type="text" id="contact-lastname" name="lastname" required placeholder="Tu apellido">
            </div>
            <div class="form-group">
              <label for="contact-email">Email</label>
              <input type="email" id="contact-email" name="email" required placeholder="tu@email.com">
            </div>
            <div class="form-group">
              <label for="contact-message">Mensaje</label>
              <textarea id="contact-message" name="message" required placeholder="Escribí tu duda, consulta o inquietud..."></textarea>
            </div>
            <button type="submit" class="btn btn--primary">Enviar</button>
          </form>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    const closeBtn = modal.querySelector('.contact-modal__close');
    closeBtn.addEventListener('click', () => closeModal(modal));

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal);
    });

    const form = modal.querySelector('#contact-form');
    form.addEventListener('submit', (e) => handleSubmit(e, modal));

    modalKeydownHandler = function escHandler(e) {
      if (e.key === 'Escape') closeModal(modal);
    };
    document.addEventListener('keydown', modalKeydownHandler);

    const firstInput = modal.querySelector('#contact-name');
    if (firstInput) firstInput.focus();
  }

  function handleSubmit(event, modal) {
    event.preventDefault();
    const form = event.target;
    const name = form.querySelector('#contact-name').value.trim();
    const lastname = form.querySelector('#contact-lastname').value.trim();
    const email = form.querySelector('#contact-email').value.trim();
    const message = form.querySelector('#contact-message').value.trim();

    if (!name || !lastname || !email || !message) {
      showFormFeedback(form, 'Por favor completá todos los campos.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showFormFeedback(form, 'Por favor ingresá un email válido.');
      return;
    }

    const body = modal.querySelector('.contact-modal__body');
    body.innerHTML = `
      <div class="contact-success">
        <span class="contact-success__icon" aria-hidden="true">✅</span>
        <h3 class="contact-success__title">Mensaje enviado con éxito</h3>
        <p class="contact-success__message">Gracias ${escapeHtml(name)}. Pronto nos pondremos en contacto con vos.</p>
      </div>
    `;
  }

  function showFormFeedback(form, text) {
    let feedback = form.querySelector('.form-feedback');
    if (!feedback) {
      feedback = document.createElement('p');
      feedback.className = 'form-feedback';
      feedback.style.cssText = 'color: #ef4444; font-size: var(--text-sm); margin: 0;';
      form.insertBefore(feedback, form.querySelector('button[type="submit"]'));
    }
    feedback.textContent = text;
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function closeModal(modal) {
    if (!modal || modal.classList.contains('contact-modal-overlay--exit')) return;

    if (modalKeydownHandler) {
      document.removeEventListener('keydown', modalKeydownHandler);
      modalKeydownHandler = null;
    }

    modal.classList.add('contact-modal-overlay--exit');
    modal.addEventListener('animationend', () => {
      modal.remove();
      document.body.style.overflow = '';
    });
  }

  function init() {
    const btn = document.getElementById('footer-contact-btn');
    if (!btn) return;
    btn.addEventListener('click', openContactModal);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
