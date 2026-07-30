// AKA BMW Global Reusable Button Component wrapper
export function createButton(label, className = "btn-primary", id = "") {
  const btn = document.createElement("button");
  btn.className = `btn ${className}`;
  if (id) btn.id = id;
  btn.innerText = label;
  return btn;
}
