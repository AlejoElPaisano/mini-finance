import { ParseAmount, FormatAmount } from "./helpers.js";
import { STORAGE_KEYS, SaveAmount } from './local-storage.js'


export const simulatorElements = {

    // Form
    $form: document.querySelector('#movement-form'),
    $typeSelect: document.querySelector('#type'),
    $categorySelect: document.querySelector('#category'),
    $descriptionInput: document.querySelector('#description'),
    $amountInput: document.querySelector('#amount') ,
    $dateInput: document.querySelector('#date'),
    $submitBtn: document.querySelector('#submit-btn'),


    // Slider / Savings Form
    $savingsForm: document.querySelector('#savings-form'),
    $savingsSubmitBtn: document.querySelector('#savings-submit-btn'),
    $savingsGoal: document.querySelector('#savings-goal'),
    $savingsGoalOutput: document.querySelector('#savings-goal-output'),
    $savingsScale: document.querySelector('#savings-scale'),      // datalist → ticks
    $sliderScale:  document.querySelector('.slider-scale'),       // div → labels visuales
    $toggleScaleBtn: document.querySelector('#toggle-scale-btn'),
    $savingsEquivHeader: document.querySelector('#savings-equiv-header'),
    $savingsMoneyEquiv: document.querySelector('#savings-money-equiv'),


    // Panel de totales
    $totalAmount: document.querySelector('.card-total-amount'),  
    $adjustedAmount: document.querySelector('#adjusted-amount'),

    // Contenedores dinámicos
    $alertsContainer: document.querySelector('#alerts-container'),
    $movementsList: document.querySelector('#movements-list'),

    // UI global
    $darkModeToggle: document.querySelector('#dark-mode-toggle'),
    $resetBtn: document.querySelector('#reset-btn'),

}

let savingsMode = 'amount' ;

function showToast(message, type = 'success') {

    let $container = document.querySelector('.toast-container') ;

    if ( !$container ) {
        $container = document.createElement('div') ;
        $container.className = 'toast-container' ;
        document.body.appendChild( $container ) ;
    }

    const $toast = document.createElement('div') ;
    $toast.className = `toast toast--${type}` ;

    const icon = type === 'success' ? '✅' : '💡' ;

    $toast.innerHTML = `
        <span class="toast__icon">${icon}</span>
        <span class="toast__text">${message}</span>
    ` ;

    $container.appendChild( $toast ) ;

    setTimeout( () => {
        $toast.classList.add('toast--exit') ;
        $toast.addEventListener('animationend', () => {
            $toast.remove() ;
        }) ;
    }, 3000 ) ;

}

function ComputeAdjusted ( total, savingsValue, mode ) {

    const value = Number( savingsValue ) || 0 ;

    return mode === 'percent'
                ? total - ( total * value / 100 )
                : total - value

}

function RefreshTotal () {

    const { $totalAmount } = simulatorElements

    const totalCurrent = getBalance() ;

    $totalAmount.textContent = FormatAmount( totalCurrent ) ;

    SaveAmount( STORAGE_KEYS.totalAmount, totalCurrent ) ;
}


function RefreshAdjusted () {

    const { $adjustedAmount } = simulatorElements

    const totalCurrent = getBalance() ;

    const savedValue = getSavingsGoal() ;

    const savedMode = localStorage.getItem( STORAGE_KEYS.savingsMode ) || 'amount' ;

    const adjustedCurrent = savedValue > 0
                                        ? ComputeAdjusted( totalCurrent, savedValue, savedMode )
                                        : totalCurrent
    ;

    $adjustedAmount.textContent = FormatAmount( adjustedCurrent ) ;

    SaveAmount( STORAGE_KEYS.adjustedAmount, adjustedCurrent ) ;
}


// ── Render del listado de movimientos ──────────────────

const TYPE_LABELS = {
    income: 'Ingreso',
    expense: 'Gasto',
    savings: 'Meta de ahorro',
}

const CATEGORY_LABELS = {
    salary: 'Sueldo',
    food: 'Alimentos',
    transport: 'Transporte',
    services: 'Servicios',
    entertainment: 'Entretenimiento',
    amount: 'Reserva fija',
    percent: 'Reserva porcentual',
}


function FormatMovementDate ( isoDate ) {

    if ( !isoDate ) return '—'

    const d = new Date( isoDate )

    return d.toLocaleDateString( 'es-AR', { day: '2-digit', month: 'short', year: 'numeric' } )
}


function CreateMovementNode ( m ) {

    const $li = document.createElement('li')

    const $article = document.createElement('article')
    $article.className = 'movement'
    $article.dataset.type = m.type

    // Header: descripción + fecha
    const $header = document.createElement('header')
    $header.className = 'movement__header'

    const $h3 = document.createElement('h3')
    $h3.className = 'movement__description'
    $h3.textContent = m.description || '(sin descripción)'

    const $time = document.createElement('time')
    $time.className = 'movement__date'
    const dateAttr = m.date || ( m.createdAt ? m.createdAt.split('T')[0] : '' )
    if ( dateAttr ) $time.dateTime = dateAttr
    $time.textContent = FormatMovementDate( m.date || m.createdAt )

    $header.append( $h3, $time )

    // Meta: tipo y categoría como definition list
    const $dl = document.createElement('dl')
    $dl.className = 'movement__meta'

    const $dtType = document.createElement('dt')
    $dtType.textContent = 'Tipo'
    const $ddType = document.createElement('dd')
    $ddType.className = 'movement__type'
    $ddType.textContent = TYPE_LABELS[ m.type ] || m.type

    const $dtCat = document.createElement('dt')
    $dtCat.textContent = 'Categoría'
    const $ddCat = document.createElement('dd')
    $ddCat.className = 'movement__category'
    $ddCat.textContent = CATEGORY_LABELS[ m.category ] || m.category || '—'

    $dl.append( $dtType, $ddType, $dtCat, $ddCat )

    // Monto firmado
    const $amount = document.createElement('p')
    $amount.className = 'movement__amount'
    const sign = m.type === 'income'  ? '+'
               : m.type === 'expense' ? '−'
               : ''                              // savings: sin signo
    $amount.textContent = `${sign}${ FormatAmount( Number(m.amount) || 0 ) }`

    $article.append( $header, $dl, $amount )
    $li.appendChild( $article )

    return $li
}


function RenderMovements () {

    const { $movementsList } = simulatorElements
    const movements = getMovements()

    $movementsList.replaceChildren()

    if ( movements.length === 0 ) {
        const $empty = document.createElement('li')
        $empty.className = 'empty-state'
        $empty.textContent = 'No hay movimientos registrados.'
        $movementsList.appendChild( $empty )
        return
    }

    // Más reciente primero, máximo 5
    const sorted = movements.slice().reverse().slice(0, 5)

    sorted.forEach( m => {
        $movementsList.appendChild( CreateMovementNode(m) )
    })
}


function InitAmounts () {

    const { $adjustedAmount, $totalAmount } = simulatorElements

    RefreshTotal() ;

    const adjustedSaved = localStorage.getItem( STORAGE_KEYS.adjustedAmount ) ;

    if ( adjustedSaved !== null ) {
        $adjustedAmount.textContent = FormatAmount( Number(adjustedSaved) ) ;
    }
    else {
        $adjustedAmount.textContent = $totalAmount.textContent ;
    }
}



function RenderScaleLabels ( containerHTML , labels ) {

    containerHTML.replaceChildren() ;

    labels.forEach( text => {

        const $span = document.createElement('span') ;

        $span.textContent = text ;

        containerHTML.appendChild( $span )

    } )
}


function ToggleSavingsScale () {

    const { $savingsGoal, $savingsGoalOutput, $sliderScale, $toggleScaleBtn, $savingsEquivHeader, $savingsMoneyEquiv, $totalAmount } = simulatorElements

    savingsMode = savingsMode === "amount"  ?  'percent'  :  'amount'

    if (savingsMode === 'percent') {

        $savingsGoal.min = 0;
        
        $savingsGoal.max = 100;
        
        $savingsGoal.step = 1;
        
        $savingsGoal.value = 50;
        
        $savingsGoalOutput.textContent = '50%';
        
        $toggleScaleBtn.textContent = 'Cambiar a escala en $';
        
        
        RenderScaleLabels($sliderScale, ['0%', '25%', '50%', '75%', '100%']);
    
        
        $savingsEquivHeader.removeAttribute('hidden') ;

        const totalCurrent = ParseAmount( $totalAmount.textContent ) ;

        $savingsMoneyEquiv.textContent = FormatAmount( totalCurrent * 50/100 )  // valor inicial por default 50%
    
    } 
    else {
        
        $savingsGoal.min = 0;
        
        $savingsGoal.max = 50000;
        
        $savingsGoal.step = 100;
        
        $savingsGoal.value = 1000;
        
        $savingsGoalOutput.textContent  = '$1000';
        
        $toggleScaleBtn.textContent = 'Cambiar a escala porcentual del total';
        
        RenderScaleLabels($sliderScale, ['$0', '$10k', '$20k', '$30k', '$40k', '$50k']);
    

        $savingsEquivHeader.setAttribute( 'hidden', '' ) ;

    }


    //RefreshAmount()

}


//simulatorElements.$toggleScaleBtn.addEventListener('click', ToggleSavingsScale)


// Init: adjustedAmount arranca igual que totalAmount
/*
function InitAdjustedAmount () {

    const { $totalAmount, $adjustedAmount } = simulatorElements

    $adjustedAmount.textContent = $totalAmount.textContent.trim() ;

}

InitAdjustedAmount()
*/

// Init: pinta los montos a partir del array guardado

//RefreshAmount() ;




function UpdateSavingsOutput () {

    const { $savingsGoal , $savingsGoalOutput, $totalAmount, $savingsMoneyEquiv } = simulatorElements ; 


    const sliderValue = Number( $savingsGoal.value ) ;



    if( savingsMode === 'percent' ){

        $savingsGoalOutput.textContent = `${$savingsGoal.value}%` ;
    
        const totalCurrent = ParseAmount( $totalAmount.textContent ) ;

        const equiv = totalCurrent * sliderValue / 100 ;

        $savingsMoneyEquiv.textContent = FormatAmount( equiv ) ;

    }
    else $savingsGoalOutput.textContent = `$${$savingsGoal.value}`
}


simulatorElements.$toggleScaleBtn.addEventListener( 'click', ToggleSavingsScale ) ;

simulatorElements.$savingsGoal.addEventListener( 'input', UpdateSavingsOutput ) ;

if (simulatorElements.$resetBtn) {
    simulatorElements.$resetBtn.addEventListener('click', () => {
        if (simulatorElements.$form) {
            simulatorElements.$form.reset();
        }
    });
}




// Submite de movimientos => guarda en LocalStorage y recalcula 


simulatorElements.$form.addEventListener( 'submit', (e) => {

    e.preventDefault() ;


    const { $typeSelect, $categorySelect, $descriptionInput, $amountInput, $dateInput } = simulatorElements


    const movement = {

        id: crypto.randomUUID(),

        type: $typeSelect.value ,

        category: $categorySelect.value ,

        description: $descriptionInput.value ,

        amount: Number( $amountInput.value ) || 0 ,

        date: $dateInput.value ,

        createdAt: new Date().toISOString() ,

    }


    const movements = getMovements() ;

    movements.push( movement ) ;

    saveMovements(movements) ;

    const typeLabel = movement.type === 'income' ? 'ingreso' : 'gasto' ;
    showToast( `Movimiento agregado: ${typeLabel} de ${ FormatAmount(movement.amount) }`, 'success' ) ;

    RefreshTotal() ;

    RefreshAdjusted() ;

    RenderMovements() ;

    if ( typeof checkAchievements === 'function' ) checkAchievements() ;

    e.target.reset()


} )



simulatorElements.$savingsForm.addEventListener( 'submit', (e) => {

    e.preventDefault() ;

    const { $savingsGoal, $totalAmount } = simulatorElements ;

    const sliderValue = Number( $savingsGoal.value ) || 0 ;
    const totalCurrent = ParseAmount( $totalAmount.textContent ) ;

    // Equivalente en $ y descripción según el modo activo
    const equivAmount = savingsMode === 'percent'
                            ? totalCurrent * sliderValue / 100
                            : sliderValue ;

    const description = savingsMode === 'percent'
                            ? `Reserva ${sliderValue}% sobre ${ FormatAmount(totalCurrent) }`
                            : `Reserva fija de ${ FormatAmount(sliderValue) }` ;

    // Commit: el slider actual pasa a ser la meta vigente
    setSavingsGoal( sliderValue ) ;
    SaveAmount( STORAGE_KEYS.savingsMode, savingsMode ) ;

    // Registro de la meta en el feed de movimientos
    const savingsMovement = {
        type: 'savings',
        category: savingsMode,                              // 'amount' | 'percent'
        description,
        amount: equivAmount,
        date: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
    }

    const movements = getMovements() ;
    movements.push( savingsMovement ) ;
    saveMovements( movements ) ;

    const goalLabel = savingsMode === 'percent'
                        ? `${sliderValue}% del total`
                        : FormatAmount(sliderValue) ;
    showToast( `Meta de ahorro actualizada: ${goalLabel}`, 'info' ) ;

    RefreshAdjusted() ;
    RenderMovements() ;

    if ( typeof checkAchievements === 'function' ) checkAchievements() ;

} )


// Init
InitAmounts()
RenderMovements()






/*

// Solo panel derecho — dispara al submit
function UpdateAdjustedAmount () {
    
    const { $savingsGoal, $totalAmount, $adjustedAmount, $amountInput } = simulatorElements

    
    // 1. Leer monto a descontar

    const amountToSubtract = Number( $amountInput.value ) || 0 ;


    //2. Restar del total actual

    const totalCurrent = ParseAmount( $totalAmount.textContent ) ;

    const newTotal = totalCurrent - amountToSubtract ;

    $totalAmount.textContent = FormatAmount( newTotal ) ;


    // 3. Recalcular adjustedAmount según modo

    if( savingsMode === 'percent' ) {

        const sliderValue = Number( $savingsGoal.value ) ;

        const savings = newTotal * sliderValue / 100 ;


        $adjustedAmount.textContent = FormatAmount( newTotal - savings ) 

    }
    else $adjustedAmount.textContent = FormatAmount( newTotal ) ;

}

// Submit del form de movimientos → descuenta monto y recalcula panel derecho
simulatorElements.$form.addEventListener('submit', (e) => {
    e.preventDefault()
    UpdateAdjustedAmount()
    simulatorElements.$amountInput.value = ''
})

// Submit del form de meta de ahorro → recalcula panel derecho con la meta actual
simulatorElements.$savingsForm.addEventListener('submit', (e) => {
    e.preventDefault()
    UpdateAdjustedAmount()
})


*/