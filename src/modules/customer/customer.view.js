// ==========================================================
// AKA BMW ISGM
// Customer View
// Enterprise v6.0
// ==========================================================

class CustomerView {

    constructor() {

        this.tableBody =
            document.getElementById("customerTableBody");

    }

    render(snapshot) {

        if (!this.tableBody) return;

        this.tableBody.innerHTML = "";

        snapshot.forEach(doc => {

            const c = doc.data();

            this.tableBody.innerHTML += `

            <tr>

                <td>${c.customerCode ?? "-"}</td>

                <td>${c.name ?? "-"}</td>

                <td>${c.phone ?? "-"}</td>

                <td>${c.email ?? "-"}</td>

                <td>${c.city ?? "-"}</td>

                <td>

                    <span class="badge bg-success">

                        ${c.status ?? "ACTIVE"}

                    </span>

                </td>

                <td>

                    <button
                        class="btn btn-sm btn-primary"
                        onclick="editCustomer('${doc.id}')">

                        Edit

                    </button>

                    <button
                        class="btn btn-sm btn-danger"
                        onclick="deleteCustomer('${doc.id}')">

                        Hapus

                    </button>

                </td>

            </tr>

            `;

        });

    }

}

const CustomerViews = new CustomerView();

export {

    CustomerViews,

    CustomerView

};