document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const inputs = form.querySelectorAll("input[required], textarea[required]");
    const alertBox = document.getElementById("formAlert");
  
    function sanitizeInput(value) {
      return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }
  
    inputs.forEach(input => {
      input.addEventListener("input", () => {
        const value = input.value.trim();
        if (value === "") {
          input.classList.remove("is-invalid", "is-valid");
          return;
        }
        if (input.id === "email") {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          toggleValidationClass(input, emailRegex.test(value));
        } else if (input.id === "phone") {
          const phoneRegex = /^[0-9\s()+-]{6,20}$/;
          toggleValidationClass(input, phoneRegex.test(value));
        } else if (input.id === "message") {
          toggleValidationClass(input, value.length >= 5 && value.length <= 500);
        } else {
          toggleValidationClass(input, true);
        }
      });
    });
  
    function toggleValidationClass(input, isValid) {
      input.classList.toggle("is-invalid", !isValid);
      input.classList.toggle("is-valid", isValid);
    }
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      let valid = true;
      alertBox.classList.add("d-none");
  
      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const phone = document.getElementById("phone");
      const message = document.getElementById("message");
  
      inputs.forEach(i => i.classList.remove("is-invalid", "is-valid"));
  
      if (name.value.trim() === "") {
        name.classList.add("is-invalid");
        valid = false;
      } else {
        name.classList.add("is-valid");
      }
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value.trim())) {
        email.classList.add("is-invalid");
        valid = false;
      } else {
        email.classList.add("is-valid");
      }
  
      const phoneRegex = /^[0-9\s()+-]{6,20}$/;
      if (!phoneRegex.test(phone.value.trim())) {
        phone.classList.add("is-invalid");
        valid = false;
      } else {
        phone.classList.add("is-valid");
      }
  
      const msgLength = message.value.trim().length;
      if (msgLength < 5 || msgLength > 500) {
        message.classList.add("is-invalid");
        valid = false;
      } else {
        message.classList.add("is-valid");
      }
  
      if (!valid) {
        showAlert("Por favor, corregí los errores en el formulario.", "danger");
        return;
      }
  
      const formData = new FormData();
      formData.append("name", sanitizeInput(name.value.trim()));
      formData.append("email", sanitizeInput(email.value.trim()));
      formData.append("phone", sanitizeInput(phone.value.trim()));
      formData.append("message", sanitizeInput(message.value.trim()));
      formData.append("_subject", "Nuevo contacto desde abogadodeart.com.ar");
      formData.append("_captcha", "false");
  
      fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      })
        .then(response => {
          if (response.ok) {
            showAlert("\u00a1Mensaje enviado con éxito!", "success");
            form.reset();
            inputs.forEach(i => i.classList.remove("is-valid", "is-invalid"));
          } else {
            throw new Error("Error al enviar el formulario.");
          }
        })
        .catch(() => {
          showAlert("Hubo un problema al enviar el mensaje. Intentalo más tarde.", "danger");
        });
    });
  
    function showAlert(message, type) {
      alertBox.textContent = message;
      alertBox.className = `alert alert-${type} text-center mt-3`;
      alertBox.classList.remove("d-none");
    }
  
    const articles = document.querySelectorAll(".article-cta");
    articles.forEach(article => {
      article.addEventListener("click", () => {
        document.getElementById("contacto").scrollIntoView({ behavior: "smooth" });
      });
    });
  });
  