// Función global para los tabs
window.switchTab = function(tabId, btnElement) {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-content-panel');

    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabPanels.forEach(panel => panel.classList.remove('active'));

    if (btnElement) {
        btnElement.classList.add('active');
    }
    
    const activePanel = document.getElementById(tabId);
    if (activePanel) {
        activePanel.classList.add('active');
    }
};

document.addEventListener('DOMContentLoaded', function() {

    // ==========================================
    // 1. LÓGICA DE FILTROS: OBRAS POR CLIENTE (DELEGACIÓN DE EVENTOS)
    // ==========================================
    const filterContainer = document.querySelector('.client-logo-filter-nav');
    const workCards = document.querySelectorAll('.work-card-item');

    if (filterContainer) {
        filterContainer.addEventListener('click', function(e) {
            const button = e.target.closest('.client-logo-btn');
            if (!button) return;

            const selectedClient = button.getAttribute('data-client');

            const allButtons = filterContainer.querySelectorAll('.client-logo-btn');
            allButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            workCards.forEach(card => {
                const cardClient = card.getAttribute('data-client');

                if (cardClient === selectedClient) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    }

    // ==========================================
    // 2. BARRA DE PROGRESO DE LECTURA (SCROLL)
    // ==========================================
    const scrollProgress = document.getElementById('scroll-progress');
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            scrollProgress.style.width = scrolled + '%';
        });
    }

    // ==========================================
    // 3. ENVÍO DE FORMULARIO CON EMAILJS
    // ==========================================
    emailjs.init({
        publicKey: "nWl9Dk6kaLnImlNOW",
    });

    const contactForm = document.getElementById('contact-form');
    const successBox = document.getElementById('form-success-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const submitBtn = document.getElementById('btn-submit');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;

            emailjs.sendForm('service_rvselfr', 'template_kavk0c8', this)
                .then(function() {
                    contactForm.reset();
                    
                    contactForm.style.display = 'none';
                    if (successBox) {
                        successBox.style.display = 'flex';
                    }

                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;

                }, function(error) {
                    console.error('Error al enviar:', error);
                    alert('Hubo un error al enviar el mensaje. Por favor, intente nuevamente.');
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }

    // ==========================================
    // 4. SLIDESHOW AUTOMÁTICO DEL HERO
    // ==========================================
    const slides = document.querySelectorAll("#heroSlideshow .slide");
    if (slides.length > 0) {
        let currentSlide = 0;
        const slideInterval = 5000; // Cambia de foto cada 5 segundos

        function nextSlide() {
            slides[currentSlide].classList.remove("active");
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add("active");
        }

        setInterval(nextSlide, slideInterval);
    }

    
});

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('#header nav');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('is-active');
      navMenu.classList.toggle('is-active');
    });

    // Opcional: cerrar el menú al hacer clic en cualquier enlace del menú móvil
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('is-active');
        navMenu.classList.remove('is-active');
      });
    });
  }
});