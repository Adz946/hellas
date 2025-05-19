import "../styles/globals.css";
import { Footer } from "@/components/footer";
import { NavSet } from "@/components/nav/NavSet";

export const metadata = {
	title: "Hellas Security",
	description: "Insert Hellas Descriptive Here...",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className="flex flex-col min-h-screen bg-back">
				<NavSet />
				{children}
				<Footer />
			</body>
		</html>
	);
}