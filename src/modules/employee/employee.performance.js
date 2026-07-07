// ================================================================
// AKA BMW ISGM
// Employee Performance
// ================================================================

class EmployeePerformance {

    calculate(statistics) {

        let score = 0;

        score += statistics.totalCompleted * 10;

        score += statistics.totalQC * 5;

        score -= statistics.totalComeback * 15;

        return Math.max(score, 0);

    }

}

const Performance = new EmployeePerformance();

export {

    Performance,

    EmployeePerformance

};