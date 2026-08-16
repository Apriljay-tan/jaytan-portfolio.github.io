// Scroll reveal animation
function revealOnScroll() {
  const elements = document.querySelectorAll('.reveal, .reveal-item');
  const windowHeight = window.innerHeight;

  elements.forEach((element, index) => {
    const elementTop = element.getBoundingClientRect().top;
    if (elementTop < windowHeight - 90) {
      setTimeout(() => element.classList.add('active'), Math.min(index * 35, 260));
    }
  });
}

window.addEventListener('scroll', revealOnScroll, { passive: true });
window.addEventListener('load', revealOnScroll);
revealOnScroll();

// Light / dark mode toggle with saved preference
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('portfolio-theme');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

function setTheme(mode) {
  document.body.classList.toggle('dark-mode', mode === 'dark');
  localStorage.setItem('portfolio-theme', mode);
  themeToggle?.setAttribute('aria-label', mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
}

setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

themeToggle?.addEventListener('click', () => {
  const nextMode = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
  setTheme(nextMode);
});

// Mobile menu
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ================================================
// PROJECT DETAIL MODAL
// ================================================

const projectModal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const modalImageWrap = document.getElementById('modalImageWrap');
const modalImageFallback = document.getElementById('modalImageFallback');
const modalCategoryEl = document.getElementById('modalCategory');
const modalTitleEl = document.getElementById('modalTitle');
const modalDescriptionEl = document.getElementById('modalDescription');
const modalTechEl = document.getElementById('modalTech');

function openProjectModal(card) {
  const title = card.dataset.modalTitle || 'Project';
  const category = card.dataset.modalCategory || '';
  const description = card.dataset.modalDescription || '';
  const tech = card.dataset.modalTech || '';
  const image = card.dataset.modalImage || '';

  // Update image
  const existingImg = modalImageWrap.querySelector('img');
  if (existingImg) existingImg.remove();

  if (image) {
    modalImageFallback.style.display = 'none';
    const img = document.createElement('img');
    img.src = image;
    img.alt = title;
    modalImageWrap.appendChild(img);
  } else {
    modalImageFallback.style.display = '';
  }

  // Update text
  modalCategoryEl.textContent = category;
  modalTitleEl.textContent = title;
  modalDescriptionEl.textContent = description;

  // Update tech tags
  modalTechEl.innerHTML = '';
  if (tech) {
    const label = document.createElement('span');
    label.className = 'modal-tech-label';
    label.textContent = 'Skills & Tools';
    modalTechEl.appendChild(label);
    tech.split(',').forEach(t => {
      const span = document.createElement('span');
      span.textContent = t.trim();
      modalTechEl.appendChild(span);
    });
  }

  projectModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  projectModal.classList.remove('open');
  document.body.style.overflow = '';
}

// Open on card click
document.querySelectorAll('.popup-card').forEach(card => {
  card.addEventListener('click', () => openProjectModal(card));
});

// Close via button
modalClose?.addEventListener('click', closeProjectModal);

// Close on backdrop click
projectModal?.addEventListener('click', e => {
  if (e.target === projectModal) closeProjectModal();
});

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && projectModal?.classList.contains('open')) {
    closeProjectModal();
  }
});
