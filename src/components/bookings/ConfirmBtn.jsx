export function ConfirmBtn({section, onAdvance}) {
    return ( 
        <button id={`${section}_verification`} onClick={onAdvance} className='btn btn-hover'>Confirm & Continue</button> 
    );
}