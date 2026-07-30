export function validateInventory(data) {

  const errors = [];

  if (!data.partNumber?.trim())
    errors.push("Part Number wajib diisi.");

  if (!data.name?.trim())
    errors.push("Nama Part wajib diisi.");

  if (Number(data.stock) < 0)
    errors.push("Stock tidak boleh minus.");

  if (Number(data.price) < 0)
    errors.push("Harga tidak boleh minus.");

  return {
    valid: errors.length === 0,
    errors
  };

}




