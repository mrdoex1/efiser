window.onscroll = function () {
        let winScroll =
          document.body.scrollTop || document.documentElement.scrollTop;
        let height =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;
        let scrolled = (winScroll / height) * 100;
        document.getElementById("scroll-progress").style.width = scrolled + "%";
      };

      // Navegación por pestañas (Tabs)
      function switchTab(tabId, element) {
        const panels = document.querySelectorAll(".tab-content-panel");
        panels.forEach((panel) => panel.classList.remove("active"));

        const buttons = document.querySelectorAll(".tab-btn");
        buttons.forEach((btn) => btn.classList.remove("active"));

        document.getElementById(tabId).classList.add("active");
        element.classList.add("active");
      }

      // FUNCIONALIDAD DE ENVÍO DIRECTO A WHATSAPP
      function sendWhatsApp(event) {
        event.preventDefault();

        const nombre = document.getElementById("form-nombre").value.trim();
        const email = document.getElementById("form-email").value.trim();
        const unidadSelect = document.getElementById("form-unidad");
        const unidad = unidadSelect.options[unidadSelect.selectedIndex].value;
        const mensaje = document.getElementById("form-mensaje").value.trim();

        const phone = "56987296918";

        const text =
          `*Nueva Consulta desde Web EFISER*\n\n` +
          `*Nombre / Razón Social:* ${nombre}\n` +
          `*Correo Electrónico:* ${email}\n` +
          `*Unidad de Interés:* ${unidad}\n` +
          `*Mensaje:* ${mensaje}`;

        const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

        window.open(whatsappUrl, "_blank");
      }