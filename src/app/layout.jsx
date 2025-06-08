import "../styles/globals.css";
import NavSet from "@/components/nav/NavSet";
import FootSet from "@/components/footer/FootSet";
import { DM_Serif_Display } from 'next/font/google';

const quoteFont = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-quote'
});

export const metadata = {
	title: "Hellas Security",
	description: "Insert Hellas Descriptive Here...",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`flex flex-col min-h-screen bg-back ${quoteFont.variable}`}>
				<NavSet /> {children} <FootSet />
			</body>
		</html>
	);
}