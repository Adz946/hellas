import "./globals.css";
import { NavSet } from "@/components/nav/NavSet";

export const metadata = {
	title: "Hellas Security",
	description: "Insert Hellas Descriptive Here...",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className="flex flex-col min-h-screen bg-primary">
				<NavSet />
				<main className="flex-grow"> {children} </main>
			</body>
		</html>
	);
}