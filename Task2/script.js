const menuBtn = document.getElementById("menuBtn")
const mobileMenu = document.getElementById("mobileMenu")

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden")
})

const form = document.getElementById("newsletterForm")
const email = document.getElementById("email")
const error = document.getElementById("error")

form.addEventListener("submit", (event) => {
    event.preventDefault()

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    if(!email.value.matches(emailPattern))
        error.classList.remove("hidden")
    else{
        error.classList.add("hidden")
        alert("Thank you for subscribing")
        email.value == ""
    }
})