import Image from 'next/image';
import { InfoRow } from '@/components/homeElements/infoRow';
import { ItemRow } from '@/components/homeElements/ItemRow';
import { TextGroup } from '@/components/homeElements/TextGroup';
import { reasonCategories, benefitCategories, serviceCategories } from '@/lib/serviceList';

export default function Home() {
	return (
		<main className="flex-grow bg-primary text-main">
			{/* HERO */}
			<div className="w-full animate-imageSlideIn">
				<img src="/images/HERO.png" alt="Hero Banner" className="w-full h-auto object-cover" />
			</div>

			{/* INFO [WHY US] */}
			<div className="w-full flex flex-row">
				<div className="w-2/3 flex flex-col text-center justify-center">
					<h3 className="w-full h3">WHY US</h3>
					{reasonCategories.map(({id, text}) => { return <TextGroup key={id} text={text} />; })}
					<h4 className="w-full h4">Licensed & Registered</h4>
				</div>

				<div className="relative w-1/3 aspect-[0.80] animate-imageSlideIn">
					<Image fill src={"/images/IMG_C.png"} alt='Depiction of 2 guards, arms crossed' />
				</div>
			</div>

			{/* INFO [BENEFITS] */}
			<div className="w-full flex flex-row bg-surface">
				<div className="relative w-1/3 aspect-[0.80] animate-imageSlideIn">
					<Image fill src={"/images/IMG_D.png"} alt='Depiction of a guard watching over a party' />
				</div>

				<div className="w-2/3 flex flex-col text-center justify-center">
					<h3 className="w-full h3">SERVICE BENEFITS</h3>
					{benefitCategories.map(({id, b1, b2}) => { return <InfoRow key={id} text_1={b1} text_2={b2} />; })}
					<h4 className="w-full h4">Emergency Responders <br/> (First Aid)</h4>
				</div>
			</div>

			{/* INFO [SERVICES] */}
			<div className="w-full flex flex-row">
				<div className="w-2/3 flex flex-col text-center justify-center">
					<h3 className="w-full h3">OUR SERVICES</h3>

					{serviceCategories.map(({id, labels, icon}) => {
						return <ItemRow key={id} text_1={labels[0]} text_2={labels[1]} icon={icon} />;
					})}

					<h4 className="w-full h4"> Ensuring Safety & Well-Being of Patrons</h4>
				</div>

				<div className="relative w-1/3 aspect-[0.80] animate-imageSlideIn">
					<Image fill src={"/images/IMG_B.png"} alt='Depiction of a guard protecting an event' />
				</div>
			</div>

			{/* QUOTE */}
			<div className="w-full text-center bg-surface py-25">
				<p className="text-4xl text-active font-quote">“We Protect As God Protects Us”</p>
			</div>

			{/* SLIDESHOW */}
			<div className="flex w-full animate-imageSlideIn">
				<img src="/images/IMG_A.png" alt="EXAMPLE A" className="slide" />
				<img src="/images/IMG_B.png" alt="EXAMPLE B" className="slide" />
				<img src="/images/IMG_C.png" alt="EXAMPLE C" className="slide" />
				<img src="/images/IMG_D.png" alt="EXAMPLE D" className="slide" />
				<img src="/images/IMG_E.png" alt="EXAMPLE E" className="slide" />			
			</div>

			{/* BOOK SELECT */}
			<div className="w-full text-center flex flex-col items-center py-25">
				<p className="text-3xl text-active mb-5">Ready to Enhance Your Security?</p>
				<p className="text-2xl text-inactive mb-5">Contact our team for all your security needs</p>

				<a href="/book" className='btn btn-hover'>Book Now</a>
			</div>
		</main>
	)
}