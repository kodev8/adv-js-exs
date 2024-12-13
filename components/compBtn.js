/**
 *
 * @param {string} text // text to display inside the button
 * @param {function} onclick // fn to run whenever clicked
 * @param {string} className // additional classes to the buttons "primary-btn" | "secondary-btn" | "third-color"
 * @returns HTMLButtonElement
 */

export const button = (text, onclick, className) => {
	const btnElem = document.createElement("button")
	btnElem.innerText = text;
	btnElem.classList.add(className);
	btnElem.addEventListener("click", onclick);
	return btnElem
}
