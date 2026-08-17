const MARK = `
<svg class="gl-spinner__mark" viewBox="0 0 273 256" aria-hidden="true">
  <path class="gl-spinner__wings" d="M123.252 90.0859L77.1926 186.911L120.551 208.576L0 256L123.252 0V90.0859Z"/>
  <path class="gl-spinner__wings" d="M148.983 90.0859L195.042 186.911L151.684 208.576L272.235 256L148.983 0V90.0859Z"/>
  <path class="gl-spinner__diamond" d="M135.449 121.915L162.433 175.271L135.449 188.498L109.913 175.215L135.449 121.915Z"/>
</svg>
`;

export function renderSpinner(el) {
  const size = el.getAttribute("data-size") || "md";
  const label = el.getAttribute("aria-label") || "Loading";
  el.classList.add("gl-spinner");
  el.setAttribute("data-size", size);
  el.setAttribute("role", "status");
  el.setAttribute("aria-label", label);
  el.innerHTML = `${MARK}<span class="gl-spinner__orbit" aria-hidden="true"><span class="gl-spinner__orbit-dot"></span></span>`;
}

document.querySelectorAll("[data-gl-spinner]").forEach(renderSpinner);
