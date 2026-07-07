// ==========================================================
// AKA BMW ISGM
// Work Order View
// Enterprise v6.0
// ==========================================================

class WorkOrderView {

    constructor() {

        this.tableBody =
            document.getElementById("workOrderTableBody");

    }

    render(snapshot) {

        if (!this.tableBody) return;

        this.tableBody.innerHTML = "";

        snapshot.forEach(doc => {

            const wo = doc.data();

            this.tableBody.innerHTML += `

            <tr>

                <td>${wo.workOrderCode ?? "-"}</td>

                <td>${wo.customerName ?? "-"}</td>

                <td>${wo.plateNumber ?? "-"}</td>

                <td>${wo.serviceAdvisor ?? "-"}</td>

                <td>${wo.mechanic ?? "-"}</td>

                <td>${wo.status ?? "OPEN"}</td>

                <td>${wo.grandTotal ?? 0}</td>

                <td>

                    <button
                        class="btn btn-sm btn-primary"
                        onclick="editWorkOrder('${doc.id}')">

                        Edit

                    </button>

                    <button
                        class="btn btn-sm btn-danger"
                        onclick="deleteWorkOrder('${doc.id}')">

                        Hapus

                    </button>

                </td>

            </tr>

            `;

        });

    }

}

const WorkOrderViews = new WorkOrderView();

export {

    WorkOrderViews,

    WorkOrderView

};