import BookMenu from '@/bookSections/menu';
import SectionContact from '@/bookSections/contact'; 

export default function Book() {
    return (
        <main className="flex-grow bg-primary text-main flex flex-row">
            <BookMenu />
            <SectionContact />
        </main> 
    );
};