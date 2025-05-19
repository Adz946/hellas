export function ItemRow({text_1, text_2, icon}) {
    return (
        <div className='w-full flex flex-row justify-evenly py-2'>
            <p className="p text-right w-2/5">{text_1}</p>
            <span className="text-center scale-150">{icon}</span>
            <p className="p text-left w-2/5">{text_2}</p>
        </div>
    );
}