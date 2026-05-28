// Helpers monetary formats

export function ParseAmount ( text ) {

    return Number( 
        text.trim()
            .replace( /[$\s]/g, '') 
            .replace( /\./g, '' )
            .replace( ',' , '.' )
    )

}


export const FormatAmount = ( value ) => {

    return `$${ value.toLocaleString('es-AR', { minimumFractionDigits: 0 , maximumFractionDigits: 2} )}`  ;
}

