"use strict"
import { button } from "./components/compBtn.js"
import { eclipseComp } from "./components/eclipseComp.js"
import { headerComp } from "./components/headerComp.js"
import { showModal } from "./services/services.js"

// Get the app container
const app = document.getElementById("app")

// Create and append header component
const header = headerComp()
app.appendChild(header)

// Create button container
const buttonContainer = document.createElement("div")
buttonContainer.style.display = "flex"
buttonContainer.style.justifyContent = "flex-start"
buttonContainer.style.gap = "10px"
buttonContainer.style.padding = "0 20px"

// Create and append buttons
const firstButton = button("First Button", () => showModal("secondary-btn"), "secondary-btn")
const secondButton = button("Second button", () => showModal("primary-btn"), "primary-btn")
const thirdButton = button("Third button", () => showModal("third-color"), "third-color")

buttonContainer.appendChild(firstButton)
buttonContainer.appendChild(secondButton)
buttonContainer.appendChild(thirdButton)

app.appendChild(buttonContainer)

// Create and append eclipse component
const eclipse = eclipseComp("primary")
eclipse.style.position = "fixed"
eclipse.style.bottom = "50%"
eclipse.style.right = "50%"
eclipse.style.transform = "translate(50%, 50%)"
eclipse.style.width = "200px"
eclipse.style.height = "200px"
app.appendChild(eclipse)

// close modal on esc key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        const modal = document.querySelector(".overlay-modal")
        if (modal) {
            modal.classList.add("d-none")
        }
    }
})
