// Helpers monetary formats

export function ParseAmount ( text ) {

    return Number( text.trim().replace( /[$\s]/g, '') )

}


export const FormatAmount = ( value ) => `$${ value.toLocaleString('es-AR') }`  ;

