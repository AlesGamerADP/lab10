import { ReactNode } from "react";
import { Metadata } from "next";
import { IoPlanetOutline } from "react-icons/io5";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rick and Morty - Next.js",
  description: "Explora el multiverso de Rick and Morty",
};

interface CharacterLayoutProps {
  children: ReactNode;
}

export default function CharacterLayout({ children }: CharacterLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900">
      <nav className="bg-black bg-opacity-30 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link
            href="/character"
            className="text-white text-2xl font-bold hover:text-purple-500 transition"
          >
            <IoPlanetOutline size={30} className="inline-block" /> Rick & Morty App
          </Link>
        </div>
      </nav>
      {children}
    </div>
  );
}