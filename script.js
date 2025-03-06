document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("contactForm").addEventListener("submit", function (event) {
        event.preventDefault();

        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let message = document.getElementById("message").value.trim();
        let responseMessage = document.getElementById("formResponse");

        if (name === "" || email === "" || message === "") {
            responseMessage.textContent = "Por favor, completa todos los campos.";
            responseMessage.classList.add("text-danger");
            responseMessage.classList.remove("text-success");
            return;
        }

        responseMessage.textContent = "Mensaje enviado con éxito.";
        responseMessage.classList.remove("text-danger");
        responseMessage.classList.add("text-success");

        document.getElementById("contactForm").reset();
    });
});
