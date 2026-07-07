// ================================================================
// AKA BMW ISGM
// Employee Overtime
// ================================================================

class EmployeeOvertime {

    start(employeeId, workOrderId) {

        return {

            employeeId,

            workOrderId,

            startTime: new Date(),

            finishTime: null,

            duration: 0,

            status: "RUNNING"

        };

    }

    finish(data) {

        data.finishTime = new Date();

        data.duration =

            Math.round(

                (data.finishTime -

                 data.startTime)

                 /60000

            );

        data.status = "FINISHED";

        return data;

    }

}

const Overtime = new EmployeeOvertime();

export {

    Overtime,

    EmployeeOvertime

};