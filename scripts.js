// Function global para los tabs
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
            // Encuentra el botón .client-logo-btn más cercano al clic
            const button = e.target.closest('.client-logo-btn');
            if (!button) return;

            const selectedClient = button.getAttribute('data-client');

            // 1. Cambiar clase active en botones
            const allButtons = filterContainer.querySelectorAll('.client-logo-btn');
            allButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // 2. Ocultar / Mostrar obras
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
    // 3. ENVÍO DE FORMULARIO A WHATSAPP
    // ==========================================
    window.sendWhatsApp = function(event) {
        event.preventDefault();
        
        const name = document.getElementById('form-nombre')?.value.trim();
        const email = document.getElementById('form-email')?.value.trim();
        const unit = document.getElementById('form-unidad')?.value;
        const message = document.getElementById('form-mensaje')?.value.trim();

        if (!name || !email || !message) {
            alert('Por favor, complete todos los campos requeridos.');
            return;
        }

        const phone = '56987296918';
        const text = `Hola EFISER, quisiera realizar una consulta:\n\n*Nombre/Empresa:* ${name}\n*Email:* ${email}\n*Área de Interés:* ${unit || 'No especificada'}\n*Mensaje:* ${message}`;
        
        const encodedText = encodeURIComponent(text);
        const whatsappUrl = `https://wa.me/${phone}?text=${encodedText}`;
        
        window.open(whatsappUrl, '_blank');
    };
});