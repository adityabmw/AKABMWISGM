// ==========================================================
// AKA BMW ISGM
// Vehicle View
// Enterprise v6.0
// ==========================================================

class VehicleView {

    constructor() {

        this.tableBody =
            document.getElementById("vehicleTableBody");

    }

    render(snapshot) {

        if (!this.tableBody) return;

        this.tableBody.innerHTML = "";

        snapshot.forEach(doc => {

            const v = doc.data();

            this.tableBody.innerHTML += `

            <tr>

                <td>${v.vehicleCode ?? "-"}</td>

                <td>${v.plateNumber ?? "-"}</td>

                <td>${v.brand ?? "-"}</td>

                <td>${v.model ?? "-"}</td>

                <td>${v.productionYear ?? "-"}</td>

                <td>${v.odometer ?? 0} km</td>

                <td>

                    <span class="badge bg-success">

                        ${v.status ?? "ACTIVE"}

                    </span>

                </td>

                <td>

                    <button
                        class="btn btn-sm btn-primary"
                        onclick="editVehicle('${doc.id}')">

                        Edit

                    </button>

                    <button
                        class="btn btn-sm btn-danger"
                        onclick="deleteVehicle('${doc.id}')">

                        Hapus

                    </button>

                </td>

            </tr>

            `;

        });

    }

}

const VehicleViews = new VehicleView();

export {

    VehicleViews,

    VehicleView

};