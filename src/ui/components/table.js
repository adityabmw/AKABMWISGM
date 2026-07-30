// AKA BMW Global Table Renderer Data Helper
export function renderTableRows(targetId, dataArray, rowTemplateFn) {
  const target = document.getElementById(targetId);
  if (!target) return;
  target.innerHTML = dataArray.map(rowTemplateFn).join("");
}
