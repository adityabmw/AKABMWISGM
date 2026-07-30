export function financeDashboard(data){

return{

income:data.income||0,

expense:data.expense||0,

profit:(data.income||0)-(data.expense||0)

};

}
