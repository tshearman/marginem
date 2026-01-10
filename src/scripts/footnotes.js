const selector = 'a[data-footnote-ref], a[href*="#fnref"], a[href*="#user-content-fnref"]';
let panel;
let panelContent;
let panelNumber;
let activeLink = null;

function ensurePanel() {
  if (panel) return panel;
  panel = document.createElement('aside');
  panel.className = 'footnote-panel';
  panel.setAttribute('role', 'note');
  panel.setAttribute('aria-live', 'polite');

  const inner = document.createElement('div');
  inner.className = 'footnote-panel__inner';

  panelNumber = document.createElement('span');
  panelNumber.className = 'footnote-panel__number';

  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'footnote-panel__close';
  closeButton.setAttribute('aria-label', 'Dismiss footnote');
  closeButton.textContent = '×';
  closeButton.addEventListener('click', hidePanel);

  const content = document.createElement('div');
  content.className = 'footnote-panel__content';

  panelContent = document.createElement('div');
  panelContent.className = 'footnote-panel__text';

  content.appendChild(panelNumber);
  content.appendChild(panelContent);
  inner.appendChild(content);
  panel.appendChild(inner);
  panel.appendChild(closeButton);
  document.body.appendChild(panel);
  return panel;
}

function stripBackrefs(node) {
  node.querySelectorAll('a[data-footnote-backref]').forEach((el) => el.remove());
  return node;
}

function extractContent(id) {
  if (!id) return null;
  const anchor = document.getElementById(id) || document.getElementById(`user-content-${id}`);
  if (!anchor) return null;
  const clone = stripBackrefs(anchor.cloneNode(true));
  return clone.innerHTML?.trim() ?? null;
}

function showPanel(content, label, sourceLink) {
  const el = ensurePanel();

  const openPanel = () => {
    panelNumber.textContent = label ? `${label}.` : '';
    panelContent.innerHTML = content;
    requestAnimationFrame(() => {
      el.classList.add('footnote-panel--visible');
      activeLink = sourceLink;
    });
  };

  const needsClosing = el.classList.contains('footnote-panel--visible') && activeLink && activeLink !== sourceLink;
  const wait = needsClosing ? hidePanel() : Promise.resolve();
  wait.then(openPanel);
}

function hidePanel() {
  if (!panel) return Promise.resolve();
  const el = panel;

  const clear = () => {
    panelNumber.textContent = '';
    panelContent.innerHTML = '';
    activeLink = null;
  };

  if (!el.classList.contains('footnote-panel--visible')) {
    el.classList.remove('footnote-panel--visible');
    clear();
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      el.removeEventListener('transitionend', onTransitionEnd);
      clear();
      resolve();
    };
    const onTransitionEnd = (event) => {
      if (event.target !== el) return;
      finish();
    };

    el.addEventListener('transitionend', onTransitionEnd);
    requestAnimationFrame(() => {
      el.classList.remove('footnote-panel--visible');
    });
    setTimeout(finish, 350);
  });
}

function handleDocClick(event) {
  if (!panel || !panel.classList.contains('footnote-panel--visible')) return;
  if (panel.contains(event.target)) return;
  if (activeLink && activeLink.contains(event.target)) return;
  hidePanel();
}

function setup() {
  const links = document.querySelectorAll(selector);
  if (!links.length) return;
  links.forEach((link) => {
    if (link.hasAttribute('data-footnote-backref')) return;
    if (link.closest('.footnotes')) return;
    link.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (activeLink === link) {
        hidePanel();
        return;
      }
      const href = link.getAttribute('href') || '';
      const id = href.startsWith('#') ? href.slice(1) : href;
      const text = extractContent(id);
      const label = link.textContent?.trim() ?? '';
      if (text) showPanel(text, label, link);
    });
  });
  window.addEventListener('scroll', hidePanel, { passive: true });
  document.addEventListener('click', handleDocClick);
}

export default function initFootnotes() {
  if (typeof document === 'undefined') return;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup, { once: true });
  } else {
    setup();
  }
}
