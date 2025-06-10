import Image from 'next/image';
import WhyBlock from '@/components/home/whyUs';
import BenefitBlock from '@/components/home/Benefits';
import ServiceBlock from '@/components/home/Services';
import MobileSlideshow from '@/components/home/Slideshow';

export default function Home() {
	return (
		<main className="flex-grow bg-primary text-main">
			{/* HERO */}
			<div className="w-full animate-imageSlideIn aspect-[12/10] md:aspect-auto">
				<img src="/images/HERO.png" alt="Hero Banner" className="w-full h-full object-cover object-center" />
			</div>

			{/* BOOK SELECT */}
			<div className="w-full text-center flex flex-col items-center py-25">
				<p className="text-3xl text-active mb-5">Ready to Enhance Your Security?</p>
				<p className="text-2xl text-inactive mb-5">Contact our team for all your security needs</p>

				<a href="/book" className='btn animate btn-scale'>Book Now</a>
			</div>

			{/* INFO [WHY US] */}
			<div className="w-full flex flex-col-reverse lg:flex-row bg-surface">
				<div className="lg:w-2/3 px-2 py-4 flex flex-col text-center justify-center">
					<h3 className="w-full h3">WHY US</h3>
					<WhyBlock />
					<h4 className="w-full h4">Licensed & Registered</h4>
				</div>

				<div className="relative lg:w-1/3 aspect-[0.80] animate-imageSlideIn">
					<Image fill src={"/images/IMG_A.png"} alt='Depiction of 2 guards, arms crossed' />
				</div>
			</div>

			{/* INFO [BENEFITS] */}
			<div className="w-full flex flex-col lg:flex-row">
				<div className="relative lg:w-1/3 aspect-[0.80] animate-imageSlideIn">
					<Image fill src={"/images/IMG_B.png"} alt='Depiction of a guard watching over a party' />
				</div>

				<div className="lg:w-2/3 px-2 py-4 flex flex-col text-center items-center justify-center">
					<h3 className="w-full h3">SERVICE BENEFITS</h3>
					<BenefitBlock />
					<h4 className="w-full h4">Emergency Responders <br/> (First Aid)</h4>
				</div>
			</div>

			{/* INFO [SERVICES] */}
			<div className="w-full flex flex-col-reverse lg:flex-row bg-surface">
				<div className="lg:w-2/3 px-2 py-4 flex flex-col text-center justify-center">
					<h3 className="w-full h3">OUR SERVICES</h3>
					<ServiceBlock />
					<h4 className="w-full h4">Ensuring Safety & Well-Being of Patrons</h4>
				</div>

				<div className="relative lg:w-1/3 aspect-[0.80] animate-imageSlideIn">
					<Image fill src={"/images/IMG_C.png"} alt='Depiction of a guard protecting an event' />
				</div>
			</div>

			{/* QUOTE */}
			<div className="w-full text-center py-25">
				<p className="text-4xl text-active font-quote">“We Protect As God Protects Us”</p>
			</div>

			{/* SLIDESHOW */}
			<MobileSlideshow />

			<div className="w-full hidden lg:flex">
				<img src="/images/IMG_A.png" alt="EXAMPLE A" className="slide animate img-scale" />
				<img src="/images/IMG_B.png" alt="EXAMPLE B" className="slide animate img-scale" />
				<img src="/images/IMG_C.png" alt="EXAMPLE C" className="slide animate img-scale" />	
			</div>
		</main>
	)
}