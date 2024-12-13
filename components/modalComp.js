import { button } from "./compBtn.js"

export const modalComp = (
	titleText = "Default title",
	bodyText = "default body",
	className = ""
) => {
	// create the modal and add important attributes likes tabindex and some classes
	const divElement = document.createElement("div")
	divElement.setAttribute("tabindex", "-1")
	divElement.classList.add("overlay-modal")
	divElement.classList.add("d-none")

	const handleClick = (e) => {
    if (
      e.target === divElement ||
      e.target.innerText === "X" ||
      e.target.innerText === "Close"
    ) {
      divElement.classList.add("d-none");
    }
  };

  divElement.addEventListener("click", handleClick);

  // Create modal content
  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  // Create header
  const modalHeader = document.createElement("div");
  modalHeader.classList.add("modal-header");
  modalHeader.classList.add(className);

  const modalTitle = document.createElement("h2");
  modalTitle.innerText = titleText;

  // Create body
  const modalBody = document.createElement("div");
  modalBody.classList.add("modal-body");

  if (typeof bodyText === "string") {
    modalBody.innerText = bodyText;
  } else {
    modalBody.appendChild(bodyText);
  }

  // Create footer
  const modalFooter = document.createElement("footer");
  modalFooter.classList.add("modal-footer");
  modalFooter.classList.add(className);

  const closeButton = button("Close", handleClick, "btn");
  modalFooter.appendChild(closeButton);

  // Add close button to header
  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(button("X", handleClick, "btn"));

  // Assemble modal
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modalContent.appendChild(modalFooter);
	divElement.appendChild(modalContent)

	return divElement
}
