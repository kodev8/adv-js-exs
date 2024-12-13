import { naveBar } from "./navBar.js"

export const headerComp = () => {
  const headerElement = document.createElement("header");

  // Add navbar
  const nav = naveBar();
  headerElement.appendChild(nav);

  // Add title
  const title = document.createElement("h1");
  title.style.textAlign = "center";
  title.style.color = "white";
  title.style.margin = "1em";
  title.innerText = "This is a test title";
  headerElement.appendChild(title);

  return headerElement;
}
