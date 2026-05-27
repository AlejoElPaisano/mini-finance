import { ParseAmount, FormatAmount } from "./helpers.js";
import { STORAGE_KEYS, LoadMovements, SaveMovements, SaveAmount } from './local-storage.js'


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

}

let savingsMode = 'amount' ;
const INITIAL_TOTAL = 10 ;


function ComputeTotal ( movements ) {

    const compute = movements.reduce( (acc, m) => {

        const amount = Number( m.amount ) || 0 ;

        return m.type === 'income'
                        ? acc + amount
                        : acc - amount

    }, INITIAL_TOTAL )


    return compute ;
}


function ComputeAdjusted ( total, savingsValue, mode ) {

    const value = Number( savingsValue ) || 0 ;

    return mode === 'percent'
                ? total - ( total * value / 100 )
                : total - value

}


// Render & persist — separados para que cada form afecte solo lo suyo

function RefreshTotal () {

    const { $totalAmount } = simulatorElements

    const movementsCurrent = LoadMovements() ;

    const totalCurrent = ComputeTotal( movementsCurrent ) ;

    $totalAmount.textContent = FormatAmount( totalCurrent ) ;

    SaveAmount( STORAGE_KEYS.totalAmount, totalCurrent ) ;
}


function RefreshAdjusted () {

    const { $totalAmount, $adjustedAmount, $savingsGoal } = simulatorElements

    const totalCurrent = ParseAmount( $totalAmount.textContent ) ;

    const adjustedCurrent = ComputeAdjusted( totalCurrent, $savingsGoal.value, savingsMode ) ;

    $adjustedAmount.textContent = FormatAmount( adjustedCurrent ) ;

    SaveAmount( STORAGE_KEYS.adjustedAmount, adjustedCurrent ) ;
}


function InitAmounts () {

    const { $adjustedAmount, $totalAmount } = simulatorElements

    // Total: siempre se recomputa desde el array de movimientos
    RefreshTotal() ;

    // Adjusted: leer el último valor confirmado (no recalcular ante un reload)
    const adjustedSaved = localStorage.getItem( STORAGE_KEYS.adjustedAmount ) ;

    if ( adjustedSaved !== null ) {
        $adjustedAmount.textContent = FormatAmount( Number(adjustedSaved) ) ;
    }
    else {
        // primera carga: arranca igual al total
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




// Submite de movimientos => guarda en LocalStorage y recalcula 


simulatorElements.$form.addEventListener( 'submit', (e) => {

    e.preventDefault() ;


    const { $typeSelect, $categorySelect, $descriptionInput, $amountInput, $dateInput } = simulatorElements


    const movement = {

        type: $typeSelect.value ,

        category: $categorySelect.value ,

        description: $descriptionInput.value ,

        amount: Number( $amountInput.value ) || 0 ,

        date: $dateInput.value ,

        createdAt: new Date().toISOString() ,

    }


    const movements = LoadMovements() ;

    movements.push( movement ) ;

    SaveMovements(movements) ;


    RefreshAmount() ;

    e.target.reset()




} )



simulatorElements.$savingsForm.addEventListener( 'submit', (e) => {

    e.preventDefault() ;

    RefreshAmount()

} )


// Init
RefreshAmount()






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