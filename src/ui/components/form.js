// AKA BMW Global Form Utilities & Serializer
export function serializeFormData(formId) {
  const form = document.getElementById(formId);
  if (!form) return {};
  const formData = new FormData(form);
  return Object.fromEntries(formData.entries());
}
