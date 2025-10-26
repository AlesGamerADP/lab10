import './globals.css';
import { Geist } from 'next/font/google';
import type { Metadata } from 'next';
import Link from 'next/link';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '404 - Página No Encontrada',
  description: 'La página que estás buscando no existe.',
};

export default function NotFound() {
  return (
        <main className="grid min-h-full place-items-center bg-gradient-to-br from-gray-900 to-purple-900 px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-2xl font-semibold text-purple-400">404</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">Página no encontrada</h1>
            <p className="mt-6 text-base leading-7 text-gray-300">Lo sentimos, no pudimos encontrar la página que estás buscando.</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/" className="rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">Volver al inicio</Link>
            </div>
          </div>
        </main>
  );
}