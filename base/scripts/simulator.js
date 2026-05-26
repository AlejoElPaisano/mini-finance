export const simulatorElements = {

    // Form
    $form: document.querySelector('#movement-form'),
    $typeSelect: document.querySelector('#type'),
    $categorySelect: document.querySelector('#category'),
    $descriptionInput: document.querySelector('#description'),
    $dateInput: document.querySelector('#date'),
    $submitBtn: document.querySelector('#submit-btn'),

    // Slider
    $savingsGoal: document.querySelector('#savings-goal'),
    $savingsGoalOutput: document.querySelector('#savings-goal-output'),
    $savingsScale: document.querySelector('#savings-scale'),      // datalist → ticks
    $sliderScale:  document.querySelector('.slider-scale'),       // div → labels visuales
    $toggleScaleBtn: document.querySelector('#toggle-scale-btn'),



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

function RenderScaleLabels ( containerHTML , labels ) {

    containerHTML.replaceChildren() ;

    labels.forEach( text => {

        const $span = document.createElement('span') ;

        $span.textContent = text ;

        containerHTML.appendChild( $span )

    } )
}

function ToggleSavingsScale () {

    const { $savingsGoal, $savingsGoalOutput, $sliderScale, $toggleScaleBtn } = simulatorElements

    savingsMode = savingsMode === "amount"  ?  'percent'  :  'amount'

    if (savingsMode === 'percent') {

        $savingsGoal.min = 0;
        
        $savingsGoal.max = 100;
        
        $savingsGoal.step = 1;
        
        $savingsGoal.value = 50;
        
        $savingsGoalOutput.textContent = '50%';
        
        $toggleScaleBtn.textContent = 'Cambiar a escala en $';
        
        
        RenderScaleLabels($sliderScale, ['0%', '25%', '50%', '75%', '100%']);
    } 
    else {
        
        $savingsGoal.min = 0;
        
        $savingsGoal.max = 50000;
        
        $savingsGoal.step = 100;
        
        $savingsGoal.value = 1000;
        
        $savingsGoalOutput.textContent  = '$1000';
        
        $toggleScaleBtn.textContent = 'Cambiar a escala porcentual';
        
        RenderScaleLabels($sliderScale, ['$0', '$10k', '$20k', '$30k', '$40k', '$50k']);
    }

}


simulatorElements.$toggleScaleBtn.addEventListener('click', ToggleSavingsScale)

