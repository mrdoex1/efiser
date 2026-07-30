/**
 * ==========================================================================
 * SCRIPT PRINCIPAL DE INTERACTIVIDAD Y UI (CORREGIDO)
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================================================
     1. BARRA DE PROGRESO DE LECTURA (SCROLL PROGRESS)
     ========================================================================== */
  const initScrollProgress = () => {
    const progressBar = document.getElementById("scroll-progress");

    if (!progressBar) return;

    window.addEventListener("scroll", () => {
      const totalScrollableHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      if (totalScrollableHeight > 0) {
        const scrolledPercentage = (window.scrollY / totalScrollableHeight) * 100;
        progressBar.style.width = `${scrolledPercentage}%`;
      }
    });
  };

  /* ==========================================================================
     2. CARRUSEL DE PROVEEDORES (CORREGIDO BOTONES + DRAG)
     ========================================================================== */
  const initProvidersCarousel = () => {
    const viewport = document.getElementById("providerViewport");
    // Selección por ID correspondiente al HTML
    const btnPrev = document.getElementById("providerPrevBtn");
    const btnNext = document.getElementById("providerNextBtn");

    if (!viewport) return;

    // Obtiene el ancho dinámico de desplazamiento según el tamaño de la tarjeta y su gap
    const getScrollAmount = () => {
      const firstCard = viewport.querySelector(".logo-card-item");
      return firstCard ? firstCard.offsetWidth + 20 : 300;
    };

    // Navegación mediante botones
    if (btnPrev) {
      btnPrev.addEventListener("click", () => {
        viewport.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
      });
    }

    if (btnNext) {
      btnNext.addEventListener("click", () => {
        viewport.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
      });
    }

    // Arrastre con el mouse en Escritorio (Drag to Scroll)
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    viewport.addEventListener("mousedown", (e) => {
      isDragging = true;
      viewport.classList.add("dragging");
      startX = e.pageX - viewport.offsetLeft;
      scrollLeft = viewport.scrollLeft;
    });

    viewport.addEventListener("mouseleave", () => {
      isDragging = false;
      viewport.classList.remove("dragging");
    });

    viewport.addEventListener("mouseup", () => {
      isDragging = false;
      viewport.classList.remove("dragging");
    });

    viewport.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - viewport.offsetLeft;
      const walk = (x - startX) * 1.5;
      viewport.scrollLeft = scrollLeft - walk;
    });
  };

  /* ==========================================================================
     3. SISTEMA DE PESTAÑAS (TABBED NAVIGATION)
     ========================================================================== */
  const initTabbedNavigation = () => {
    const tabBtns = document.querySelectorAll(".tab-btn");
    const tabPanels = document.querySelectorAll(".tab-content-panel");

    if (tabBtns.length === 0 || tabPanels.length === 0) return;

    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Soporte tanto para atributo inline onclick como para listener JS
        const targetTabId = btn.getAttribute("onclick")?.match(/'([^']+)'/)?.[1] || btn.getAttribute("data-tab");

        if (!targetTabId) return;

        tabBtns.forEach((b) => b.classList.remove("active"));
        tabPanels.forEach((panel) => panel.classList.remove("active"));

        btn.classList.add("active");
        const activePanel = document.getElementById(targetTabId);
        if (activePanel) {
          activePanel.classList.add("active");
        }
      });
    });
  };

  /* ==========================================================================
     4. FILTRADO DINÁMICO DE OBRAS Y PROYECTOS (CORREGIDO data-client)
     ========================================================================== */
  const initWorksFilter = () => {
    const filterBtns = document.querySelectorAll(".client-logo-btn");
    const workCards = document.querySelectorAll(".work-card-item");

    if (filterBtns.length === 0 || workCards.length === 0) return;

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Lee el atributo correcto del HTML
        const filterValue = btn.getAttribute("data-client");

        // Actualizar estado del botón activo
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        // Filtrar tarjetas
        workCards.forEach((card) => {
          const cardClient = card.getAttribute("data-client");

          if (filterValue === "all" || cardClient === filterValue) {
            card.classList.remove("hide");
          } else {
            card.classList.add("hide");
          }
        });
      });
    });
  };

  /* ==========================================================================
     INICIALIZACIÓN DE MÓDULOS
     ========================================================================== */
  initScrollProgress();
  initProvidersCarousel();
  initTabbedNavigation();
  initWorksFilter();
});

/* ==========================================================================
   FUNCIÓN DE ENVÍO A WHATSAPP
   ========================================================================== */
function sendWhatsApp(event) {
  event.preventDefault();
  const nombre = document.getElementById("form-nombre").value;
  const email = document.getElementById("form-email").value;
  const unidad = document.getElementById("form-unidad").value;
  const mensaje = document.getElementById("form-mensaje").value;

  const phone = "56987296918";
  const text = `*Consulta Web EFISER SpA*%0A%0A*Nombre:* ${encodeURIComponent(
    nombre
  )}%0A*Correo:* ${encodeURIComponent(
    email
  )}%0A*Unidad de Interés:* ${encodeURIComponent(
    unidad
  )}%0A*Mensaje:* ${encodeURIComponent(mensaje)}`;

  window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
}