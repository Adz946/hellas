export function ConfirmBtn({section, onAdvance}) {
    return ( 
        <button id={`${section}_verification`} onClick={onAdvance} 
            className='btn animate btn-scale'>Confirm & Continue</button> 
    );
}