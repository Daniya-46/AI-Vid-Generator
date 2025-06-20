"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Suplimax", href: "/suplimax" },
    { name: "Real Estate", href: "/real-estate" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex space-x-8">
          {navItems.map(({ name, href }) => (
            <Link
              key={href}
              href={href}
              className={`relative py-2 text-sm font-medium transition-colors ${
                pathname === href
                  ? "text-[#5c6ac4] font-semibold"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {name}
              {pathname === href && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5c6ac4] rounded-full"></span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
