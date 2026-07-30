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
// 3. ENVÍO DE FORMULARIO POR CORREO (AJAX)
// ==========================================
const contactForm = document.getElementById('contact-form');
const successBox = document.getElementById('form-success-message');

if (contactForm) {
    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        const submitBtn = document.getElementById('btn-submit');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            

            // Parsear la respuesta como JSON de forma segura
            const result = await response.json();

            // Agrega esto temporalmente para revisar en la consola (F12)
const textoRespuesta = await response.text();
console.log("Respuesta del servidor:", textoRespuesta);

const result = JSON.parse(textoRespuesta);

            // FormSubmit devuelve success como "true" (texto) o la respuesta OK
            if (response.ok && (result.success === "true" || result.success === true || response.status === 200)) {
                // 1. Limpiar los campos del formulario
                contactForm.reset();
                
                // 2. Ocultar el formulario y mostrar el mensaje de éxito
                contactForm.style.display = 'none';
                if (successBox) {
                    successBox.style.display = 'flex';
                }

                // 3. Restaurar el botón de envío (por si se vuelve a mostrar el formulario)
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;

                // Opcional: Volver a mostrar el formulario automáticamente después de 6 segundos
                setTimeout(() => {
                    if (successBox) successBox.style.display = 'none';
                    contactForm.style.display = 'block';
                }, 6000);

            } else {
                alert(result.message || 'Hubo un error al enviar el mensaje. Por favor, intente nuevamente.');
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error de conexión o el formulario aún requiere activación en tu correo.');
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}
});