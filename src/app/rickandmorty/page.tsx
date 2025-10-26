import Link from "next/link";
import { CharacterListResponse, Character } from "@/types/rick-and-morty";
import { IoMdList } from "react-icons/io";
import Image from "next/image";
import SearchBar from "./components/SearchBar";

async function getCharacters(): Promise<Character[]> {
  const res = await fetch("https://rickandmortyapi.com/api/character", {
    next: { revalidate: 864000 }, 
  });

  if (!res.ok) throw new Error("Error al cargar los personajes");

  const data: CharacterListResponse = await res.json();

  return data.results;
}

export default async function CharacterList() {
  const characters = await getCharacters();

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-left mb-12 drop-shadow-lg">
          <IoMdList size={40} className="inline-block" /> Lista de Personajes (ISR)
        </h1>

        <SearchBar characters={characters} />

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {characters.map((character, index) => (
            <Link
              key={character.id}
              href={`/rickandmorty/character/${character.id}`}
              className="transform transition hover:scale-105"
            >
              <div className="bg-white text-gray-700 rounded-xl shadow-lg hover:shadow-2xl cursor-pointer overflow-hidden">
                <Image
                  width={300}
                  height={300}
                  src={character.image}
                  alt={character.name}
                  className="w-full h-auto object-cover"
                  priority={index < 8}
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold text-center capitalize mt-2">
                    {character.name}
                  </h2>
                  <p className="text-gray-500 text-center">
                    #{character.id.toString().padStart(3, "0")}
                  </p>
                  <div className="flex justify-center gap-2 mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      character.status === 'Alive' ? 'bg-green-100 text-green-800' :
                      character.status === 'Dead' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {character.status}
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                      {character.species}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}