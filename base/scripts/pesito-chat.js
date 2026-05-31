/**
 * pesito-chat.js
 * Lógica interactiva del Asistente Virtual Pesito.
 * Gestiona apertura/cierre, renderizado de mensajes, typing indicator
 * y navegación por el árbol de decisiones definido en pesito-brain.js.
 * Mini Finance - IntegrarTEC 2026.
 */

(function () {
  'use strict';

  /* ================================================================
     REFERENCIAS AL DOM
     ================================================================ */
  const container   = document.getElementById('pesito-container');
  const toggleBtn   = document.getElementById('pesito-toggle');
  const closeBtn    = document.querySelector('.pesito-header__close');
  const messagesEl  = document.getElementById('pesito-messages');
  const optionsEl   = document.getElementById('pesito-options');
  const typingEl    = document.getElementById('pesito-typing');

  /* ================================================================
     ESTADO
     ================================================================ */
  let isOpen      = false;
  let isFirstOpen = true;

  /* ================================================================
     INICIALIZACIÓN
     ================================================================ */
  function init() {
    if (!container || !toggleBtn) {
      console.warn('[Pesito] No se encontraron elementos esenciales del chat.');
      return;
    }

    toggleBtn.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);

    /* Cerrar al hacer clic fuera del chat (delegación eficiente) */
    document.addEventListener('click', onDocumentClick);

    /* Tecla Escape para cerrar (accesibilidad) */
    document.addEventListener('keydown', onKeyDown);
  }

  /* ================================================================
     EVENT HANDLERS
     ================================================================ */

  /**
   * Cierra el chat si se hace clic fuera de él y del botón toggle.
   */
  function onDocumentClick(event) {
    if (!isOpen) return;
    const target = event.target;
    const clickedInsideChat = container.contains(target);
    const clickedToggle = toggleBtn === target || toggleBtn.contains(target);
    if (!clickedInsideChat && !clickedToggle) {
      toggleChat();
    }
  }

  /**
   * Cierra el chat con la tecla Escape.
   */
  function onKeyDown(event) {
    if (isOpen && event.key === 'Escape') {
      toggleChat();
    }
  }

  /* ================================================================
     APERTURA / CIERRE DEL CHAT
     ================================================================ */

  function toggleChat() {
    isOpen = !isOpen;

    /* Clases CSS para animar entrada/salida */
    container.classList.toggle('is-open', isOpen);
    toggleBtn.classList.toggle('is-open', isOpen);

    /* Atributos ARIA para lectores de pantalla */
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
    toggleBtn.setAttribute(
      'aria-label',
      isOpen ? 'Cerrar asistente virtual Pesito' : 'Abrir asistente virtual Pesito'
    );

    /* Primer apertura: saludo amigable con delay para que termine la animación */
    if (isOpen && isFirstOpen) {
      isFirstOpen = false;
      setTimeout(() => renderNode('root'), 350);
    }
  }

  /* ================================================================
     RENDERIZADO DE NODOS (Cerebro)
     ================================================================ */

  /**
   * Renderiza un nodo del árbol: muestra typing indicator, luego
   * el mensaje del bot y finalmente los botones de opciones.
   * @param {string} nodeKey - Clave del nodo en pesitoBrain.
   */
  function getBrain() {
    const path = window.location.pathname;
    if (path.includes('simulador')) {
      return window.pesitoBrainSimulator;
    }
    if (path.includes('resumen')) {
      return window.pesitoBrainResumen;
    }
    if (path.includes('market-rates') || path.includes('cotizaciones')) {
      return window.pesitoBrainCotizaciones;
    }
    return window.pesitoBrainHome;
  }

  function renderNode(nodeKey) {
    const brain = getBrain();
    const node = brain && brain[nodeKey];
    if (!node) {
      console.warn('[Pesito] Nodo no encontrado:', nodeKey);
      return;
    }

    showTyping();

    setTimeout(() => {
      hideTyping();
      addMessage(node.message, 'bot');
      renderOptions(node.options);
    }, 800); /* 800ms de "pensando" para imitar a BOTI */
  }

  /* ================================================================
     MENSAJES
     ================================================================ */

  /**
   * Inyecta una burbuja de mensaje en el área de chat.
   * @param {string} text  - Contenido del mensaje.
   * @param {string} sender - 'bot' | 'user'.
   */
  function addMessage(text, sender) {
    const msgEl = document.createElement('div');
    msgEl.className = `pesito-message pesito-message--${sender}`;
    msgEl.textContent = text;
    messagesEl.appendChild(msgEl);
    scrollToBottom();
  }

  /**
   * Fuerza el scroll al último mensaje con requestAnimationFrame
   * para garantizar que el DOM ya reflejó la inserción.
   */
  function scrollToBottom() {
    requestAnimationFrame(() => {
      messagesEl.scrollTop = messagesEl.scrollHeight;
    });
  }

  /* ================================================================
     TYPING INDICATOR
     ================================================================ */

  function showTyping() {
    typingEl.hidden = false;
    scrollToBottom();
  }

  function hideTyping() {
    typingEl.hidden = true;
  }

  /* ================================================================
     BOTONES DE OPCIONES (Opciones Guiadas)
     ================================================================ */

  /**
   * Renderiza los botones de opciones dinámicamente.
   * Cada botón aparece con un delay escalonado para crear un efecto
   * de "revelado" pulido.
   * @param {Array<{label:string, next:string}>} options
   */
  function renderOptions(options) {
    optionsEl.innerHTML = '';

    if (!Array.isArray(options) || options.length === 0) return;

    const fragment = document.createDocumentFragment();

    options.forEach((opt, index) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'pesito-option-btn';
      btn.textContent = opt.label;

      /* Microanimación de entrada escalonada */
      btn.style.animation = `messageIn 250ms var(--ease-out-expo) both`;
      btn.style.animationDelay = `${index * 60}ms`;

      btn.addEventListener('click', (event) => handleOptionClick(event, opt));
      fragment.appendChild(btn);
    });

    optionsEl.appendChild(fragment);
  }

  /**
   * Gestiona el clic en una opción:
   * 1. Detiene la propagación para evitar que el documento interprete
   *    el clic como "fuera del chat" (el botón se elimina del DOM
   *    inmediatamente con innerHTML, lo que rompe contains()).
   * 2. Pinta el mensaje del usuario.
   * 3. Limpia los botones anteriores inmediatamente.
   * 4. Navega al siguiente nodo (con typing indicator incluido).
   * @param {Event} event
   * @param {{label:string, next:string}} option
   */
  function handleOptionClick(event, option) {
    event.stopPropagation();
    addMessage(option.label, 'user');
    optionsEl.innerHTML = '';
    renderNode(option.next);
  }

  /* ================================================================
     ARRANQUE
     ================================================================ */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
