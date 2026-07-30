// AKA BMW Smooth Transition & UI Animation Helpers
export function fadeInElement(element) {
  if (!element) return;
  element.style.opacity = 0;
  element.style.transition = "opacity 0.3s ease-in";
  setTimeout(() => { element.style.opacity = 1; }, 10);
}
