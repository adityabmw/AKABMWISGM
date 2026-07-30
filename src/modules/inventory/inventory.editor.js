export function renderEditRow(item = {}) {

return `
<tr>

<td><input id="partNumber" class="form-control" value="${item.partNumber ?? ""}"></td>

<td><input id="name" class="form-control" value="${item.name ?? ""}"></td>

<td><input id="category" class="form-control" value="${item.category ?? ""}"></td>

<td><input id="stock" type="number" class="form-control" value="${item.stock ?? 0}"></td>

<td><input id="price" type="number" class="form-control" value="${item.price ?? 0}"></td>

<td>

<button class="btn btn-success btn-sm saveInventory">
Simpan
</button>

<button class="btn btn-secondary btn-sm cancelInventory">
Batal
</button>

</td>

</tr>
`;

}
