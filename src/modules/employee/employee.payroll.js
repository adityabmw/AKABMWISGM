// ================================================================
// AKA BMW ISGM
// Employee Payroll
// ================================================================

class EmployeePayroll {

    calculate(employee){

        return{

            basicSalary:employee.basicSalary,

            overtime:0,

            incentive:employee.incentive,

            allowance:employee.allowance,

            deduction:0,

            total:

                employee.basicSalary+

                employee.incentive+

                employee.allowance

        };

    }

}

const Payroll = new EmployeePayroll();

export{

Payroll,

EmployeePayroll

};