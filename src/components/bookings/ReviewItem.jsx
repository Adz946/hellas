export function ReviewItem({ content, label, icon: Icon }) {
    return (
        <div className={`w-full px-4 py-2 flex flex-col items-center`}>
            <p className="px-2 text-main text-center text-md">{content}</p>
            <hr className="w-full border-t border-inactive my-1" />

            <div className="relative w-full justify-center pt-1">
                <p className="text-main text-center text-sm">{label}</p>
                {Icon && (<Icon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-main w-5 h-5" />)}    
            </div>
        </div>
        
    );
}