export const STORAGE_KEYS = {

    movements: 'miniFinanceMovements' ,

    totalAmount: 'totalAmount',

    adjustedAmount: 'adjustedAmount' ,


    savingsGoal: 'miniFinanceSavingsGoal',

    savingsMode: 'savingsMode'

}


export function LoadMovements () {

    const raw = localStorage.getItem( STORAGE_KEYS.movements )

    return raw  ?  JSON.parse(raw)  :  [] 

}


export function SaveMovements ( movements ) {

    localStorage.setItem( STORAGE_KEYS.movements , JSON.stringify(movements) )

}


export function SaveAmount ( key, value ) {

    localStorage.setItem( key, String(value) )

}



