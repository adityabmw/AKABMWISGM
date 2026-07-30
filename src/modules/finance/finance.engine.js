/*
==================================================
 AKA BMW ISGM
 Automatic Journal Engine
==================================================
*/

export function createJournal({
date=new Date().toISOString(),
reference="",
description="",
debit=[],
credit=[]
}){

return{
date,
reference,
description,
debit,
credit,
balance:debit.reduce((a,b)=>a+Number(b.amount||0),0)
};

}
