export const rupiah=v=>new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR"}).format(v||0);
export const date=v=>new Date(v).toLocaleDateString("id-ID");
