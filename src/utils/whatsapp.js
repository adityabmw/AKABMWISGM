export function waLink(phone, text){
  const p = phone.replace(/[^0-9]/g,'').replace(/^0/,'62');
  return `https://wa.me/${p}?text=${encodeURIComponent(text)}`;
}
export function sendWA(phone, text){ window.open(waLink(phone,text),'_blank'); }
