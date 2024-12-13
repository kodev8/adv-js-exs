import { modalComp } from "../components/modalComp.js"

/**
 *
 * @param {string} className // three names "primary-btn" | "secondary-btn" | "third-color"
 * @returns {void}
 */

export const showModal = (className) => {
  // Remove any existing modals first
  const existingModal = document.querySelector(".overlay-modal");
  if (existingModal) {
    existingModal.remove();
  }

  let modalBody;
  let modalTitle;
  const app = document.getElementById("app");

  if (className === "secondary-btn") {
    modalTitle = "The first title is here !";
    modalBody = document.createElement("div");
    modalBody.innerText = "This is the first button body !";

    app.appendChild(modalComp(modalTitle, modalBody, className));
  } else if (className === "primary-btn") {
    modalTitle = "Some other cool title now!";
    modalBody = document.createElement("div");
    modalBody.innerText = "This is the another text of the body 📝";

    app.appendChild(modalComp(modalTitle, modalBody, className));
  } else if (className === "third-color") {
    modalTitle = "Third title now";
    modalBody = document.createElement("div");

    // Create and add subtitle
    const subtitle = document.createElement("h3");
    subtitle.innerText = "This is a special body sub-title";
    subtitle.style.marginBottom = "1em";
    modalBody.appendChild(subtitle);

    // Create and add image with corrected path
    const img = document.createElement("img");
    img.src = "./assets/mountain.jpeg"; // Corrected extension
    img.alt = "Mountain landscape with moon";
    img.style.width = "100%";
    modalBody.appendChild(img);

    app.appendChild(modalComp(modalTitle, modalBody, className));
  }

  // Show the newly created modal
  const newModal = document.querySelector(".overlay-modal");
  if (newModal) {
    newModal.classList.remove("d-none");
  }
}
