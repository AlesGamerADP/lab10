import Link from 'next/link';
import { GiPortal } from 'react-icons/gi';
import { IoGameController } from 'react-icons/io5';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-purple-900 p-8 text-white">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">
          Bienvenido al Laboratorio 10
        </h1>
        <p className="text-xl text-gray-300 mb-12">
          Elige un universo para explorar
        </p>

        <div className="flex flex-col sm:flex-row gap-8 justify-center">
          <Link href="/pokemon">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg hover:bg-white/20 transform hover:scale-105 transition-all duration-300 w-64">
              <IoGameController size={60} className="mx-auto text-purple-400 mb-4" />
              <h2 className="text-2xl font-bold">Universo Pokémon</h2>
              <p className="text-gray-400 mt-2">Explora el Pokédex</p>
            </div>
          </Link>

          <Link href="/rickandmorty">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg hover:bg-white/20 transform hover:scale-105 transition-all duration-300 w-64">
              <GiPortal size={60} className="mx-auto text-cyan-400 mb-4" />
              <h2 className="text-2xl font-bold">Universo Rick & Morty</h2>
              <p className="text-gray-400 mt-2">Viaja entre dimensiones</p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
