import { FormatAmount } from './helpers.js' ;
import { LoadMovements, STORAGE_KEYS } from './local-storage.js' ;
import { TYPE_LABELS, CATEGORY_LABELS, SIGN_BY_TYPE } from './state.js' ;

const resumenElements = {

    // Dashboard
    $totalIncome: document.querySelector('#total-income') ,
    $totalExpense: document.querySelector('#total-expense') ,
    $totalSavings: document.querySelector('#total-savings') ,
    $balance: document.querySelector('#balance') ,


    // Ledger
    $ledgerList: document.querySelector('#movements-list') ,
    $movementsCount: document.querySelector('#movements-count') ,
     $rowTemplate:    document.querySelector('#ledger-row-template'),


    // Filtros
    $filterType: document.querySelector('#filter-type') ,
    $filterCategory: document.querySelector('#filter-category')

}


function ComputeTotals ( movements ) {

    const filteredMovements = movements.reduce( ( acc, movement ) => {

        const amount = Number( movement.amount ) || 0 ;

        if( movement.type === 'income' ) acc.income += amount ;

        else if( movement.type === 'expense' ) acc.expense += amount ;

        else if( movement.type === 'savings' ) acc.savings += amount ;


        return acc ;



    }, {income: 0 , expense: 0, savings: 0 } )

    
    return filteredMovements
}


function FormatLedgerDate ( iso ) {

    if( !iso ) return '-' ;

    const d = new Date(iso)

    
    return d.toLocaleDateString( 'es-AR',  { day: '2-digit', month: '2-digit', year: 'numeric' } )

}


function GetMovementTime ( m ) {

    return new Date( m.createdAt || m.date ).getTime()
}


function CountLabel ( n ) {

    if ( n === 1 ) return '1 movimiento'

    return `${n} movimientos`
}





function RenderDashboard ( totals ) {

    const { $totalIncome, $totalExpense, $totalSavings, $balance } = resumenElements


    const balance = totals.income - totals.expense ;
    
    
    if( $totalIncome ) $totalIncome.textContent = FormatAmount( totals.income ) ;

    if( $totalExpense )  $totalExpense.textContent = FormatAmount( totals.expense ) ;

    if( $totalSavings ) $totalSavings.textContent = FormatAmount(totals.savings) ;

    
    if( $balance ) {

        $balance.textContent = FormatAmount(balance) ;

        $balance.dataset.sign = balance < 0 ? 'negative' : 'positive' ; 

    }

}



function CreateLedgerRow ( movement ) {

    const { $rowTemplate } = resumenElements


    const $row = $rowTemplate.content.firstElementChild.cloneNode(true) ;

    $row.dataset.type = movement.type;


    const $date = $row.querySelector( '.ledger-row-date' ) ;

    const $description = $row.querySelector('.ledger-row-description') ;

    const $type = $row.querySelector( '.ledger-row-type' ) ;

    const $category = $row.querySelector('.ledger-row-category') ;

    const $amount = $row.querySelector('.ledger-row-amount') ;

    

    if( movement.date ) $date.dateTime = movement.date ;

    $date.textContent = FormatLedgerDate( movement.date || movement.createdAt ) ;


    $description.textContent = movement.description || '(sin descripción)'

    
    $type.dataset.type = movement.type ;

    $type.textContent = TYPE_LABELS[ movement.type ] || movement.type ;


    $category.textContent = CATEGORY_LABELS[ movement.category ] || movement.category || '-' ;


    const sign = SIGN_BY_TYPE[movement.type] || '' ;

    const amountStr = FormatAmount( Number(movement.amount) || 0 ) ;

    $amount.textContent = `${sign} ${amountStr}` ;

    
    return $row

}


function CreateEmptyRow () {

    const $empty = document.createElement('li') ;

    $empty.className = 'ledger-empty' ;

    $empty.textContent = 'No hay movimientos registrados' ;


    return $empty ;

}


function PopulateFilterCategories ( movements ) {

    const { $filterCategory } = resumenElements


    if( !$filterCategory ) return ;


    const current = $filterCategory.value ;

    const unique = Array.from( new Set(

        ( movements.map( (mov) => mov.category ).filter(Boolean) )

    ) )

    $filterCategory.replaceChildren() ;


    const $all = document.createElement( 'option' ) ;

    $all.value = '' ;

    $all.textContent = 'Todas' ;


    $filterCategory.appendChild( $all ) ;


    unique.forEach( (category) => {

        const $opt = document.createElement('option') ;

        $opt.value = category ;

        $opt.textContent = CATEGORY_LABELS[category] || category ;

        $filterCategory.appendChild( $opt )

    } )

    if( current ) $filterCategory.value = current ;


}


function RenderLedger ( movements ) {

    
    const { $ledgerList, $movementsCount, $filterType, $filterCategory } = resumenElements
    
    if ( !$ledgerList ) return ;


    const typeF = $filterType  ?  $filterType.value  :  '' ;

    const categoryF = $filterCategory  ?  $filterCategory.value  :  '' ;


    let filtered = movements.slice() ;


    if( typeF ) filtered = filtered.filter( (movement) => movement.type === typeF ) ;

    if( categoryF ) filtered = filtered.filter( (movement) => movement.category === categoryF ) ;


    // Más reciente primero

    filtered.sort( ( a , b ) => GetMovementTime( b ) - GetMovementTime(a) )


    $ledgerList.replaceChildren() ;


    if( $movementsCount ) $movementsCount.textContent = CountLabel( filtered.length ) ;
    
    
    if( filtered.length === 0 ) {

        $ledgerList.appendChild( CreateEmptyRow() ) ;

        return ;

    }

    
    filtered.forEach( (movement) => $ledgerList.appendChild( CreateLedgerRow(movement) ) ) ;


}


function Init () {

    const movements = LoadMovements() ;

    const totals = ComputeTotals( movements ) ;


    RenderDashboard( totals ) ;

    PopulateFilterCategories( movements ) ;

    RenderLedger( movements ) ;


    const { $filterType, $filterCategory } = resumenElements


    if( $filterType ){ 
        
        $filterType.addEventListener( 'change', () => RenderLedger( LoadMovements() ) ) ;
    
    }
        
    if ( $filterCategory ){

        $filterCategory.addEventListener( 'change', () => RenderLedger( LoadMovements() ) )
    
    } 
    
    
    // Sync entre pestañas

    window.addEventListener( 'storage', (e) => {

        if( e.key !== STORAGE_KEYS.movements ) return ;


        const movements = LoadMovements() ;


        RenderDashboard( ComputeTotals( movements ) ) ;

        PopulateFilterCategories( movements ) ;

        RenderLedger( movements )

    } )

}


Init()