// ==========================================================
// AKA BMW ISGM
// Reception View
// Enterprise v6.0
// ==========================================================

class ReceptionView {

    constructor() {

        this.tableBody =
            document.getElementById("receptionTableBody");

    }

    render(snapshot) {

        if (!this.tableBody) return;

        this.tableBody.innerHTML = "";

        snapshot.forEach(doc => {

            const r = doc.data();

            this.tableBody.innerHTML += `

            <tr>

                <td>${r.receptionCode ?? "-"}</td>

                <td>${r.customerName ?? "-"}</td>

                <td>${r.plateNumber ?? "-"}</td>

                <td>${r.serviceAdvisor ?? "-"}</td>

                <td>${r.odometer ?? 0} km</td>

                <td>${r.status ?? "CHECK-IN"}</td>

                <td>

                    <button
                        class="btn btn-sm btn-primary"
                        onclick="editReception('${doc.id}')">

                        Edit

                    </button>

                    <button
                        class="btn btn-sm btn-danger"
                        onclick="deleteReception('${doc.id}')">

                        Hapus

                    </button>

                </td>

            </tr>

            `;

        });

    }

}

const ReceptionViews = new ReceptionView();

export {

    ReceptionViews,

    ReceptionView

};