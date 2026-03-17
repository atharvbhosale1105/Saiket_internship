const form = document.getElementById("contactForm");

    form.addEventListener("submit",  (e) => {
      e.preventDefault();

      let valid = true;

      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const message = document.getElementById("message");

      document.getElementById("nameError").classList.add("hidden");
      document.getElementById("emailError").classList.add("hidden");
      document.getElementById("messageError").classList.add("hidden");
      document.getElementById("successMsg").classList.add("hidden");

      if (name.value.trim() === "") {
        document.getElementById("nameError").classList.remove("hidden");
        valid = false;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value)) {
        document.getElementById("emailError").classList.remove("hidden");
        valid = false;
      }

      if (message.value.trim() === "") {
        document.getElementById("messageError").classList.remove("hidden");
        valid = false;
      }

      if (valid) {
        document.getElementById("successMsg").classList.remove("hidden");
        form.reset();
      }
});

tailwind.config = {
      theme: {
        extend: {
          animation: {
            float: "float 3s ease-in-out infinite",
            fadeIn: "fadeIn 1.2s ease-in-out",
          },
          keyframes: {
            float: {
              "0%, 100%": { transform: "translateY(0)" },
              "50%": { transform: "translateY(-10px)" },
            },
            fadeIn: {
              "0%": { opacity: 0, transform: "translateY(20px)" },
              "100%": { opacity: 1, transform: "translateY(0)" },
            },
          },
        },
      },
};

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});
