// AKA BMW Global Spinner Overlay Trigger
export function toggleGlobalLoading(show = true) {
  const loader = document.getElementById("global-loader");
  if (!loader) return;
  loader.style.display = show ? "flex" : "none";
}
