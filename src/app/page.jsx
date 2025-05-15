export default function Home() {
	return (
		<main className="bg-primary text-main min-h-screen flex flex-col items-center justify-start">
			<div className="w-full animate-imageSlideIn">
				<img src="/images/HERO.png" alt="Hero Banner" className="w-full h-auto object-cover" />
			</div>

			<h1 className="text-primary">COLOR CHECKER</h1>

			<div className="m-8 flex w-full animate-imageSlideIn">
				<img src="/images/IMG_A.png" alt="EXAMPLE A" 
				className="w-0 flex-grow h-auto transform transition-transform duration-300 ease-out hover:scale-105 hover:rounded-2xl" />

				<img src="/images/IMG_B.png" alt="EXAMPLE B" 
				className="w-0 flex-grow h-auto transform transition-transform duration-300 ease-out hover:scale-105 hover:rounded-2xl" />

				<img src="/images/IMG_C.png" alt="EXAMPLE C" 
				className="w-0 flex-grow h-auto transform transition-transform duration-300 ease-out hover:scale-105 hover:rounded-2xl" />

				<img src="/images/IMG_D.png" alt="EXAMPLE D" 
				className="w-0 flex-grow h-auto transform transition-transform duration-300 ease-out hover:scale-105 hover:rounded-2xl" />

				<img src="/images/IMG_E.png" alt="EXAMPLE E" 
				className="w-0 flex-grow h-auto transform transition-transform duration-300 ease-out hover:scale-105 hover:rounded-2xl" />
			</div>
		</main>
	)
}