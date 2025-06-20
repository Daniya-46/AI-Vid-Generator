import "./globals.css";
import Navbar from "./components/Navbar/page";

export const metadata = {
  title: "AI Video Generator",
  description: "Marketing & Real Estate Video Generator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full flex flex-col bg-white text-gray-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="bg-gray-100 text-center py-4">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} AI Video Generator. All rights
            reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
