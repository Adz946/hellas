export function SectionCard({ icon: Icon, title, children }) {
    return (
        <div className="w-full bg-surface rounded-2xl p-4 mb-4 hover:scale-105 hover:shadow-2xl hover:shadow-back
            transform transition-transform duration-300 ease-out">
            <div className="flex items-center justify-center mb-4 gap-2">
                <Icon className="text-accent w-6 h-6" />
                <h5 className="h5">{title}</h5>
            </div>
            {children}
        </div>
    );
}