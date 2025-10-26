import Link from 'next/link';
import { Metadata } from 'next';
import { CharacterListResponse, Character } from "@/types/rick-and-morty";
import Image from 'next/image';

interface CharacterPageProps {
  params: Promise<{
    id: string; 
  }>;
}

async function getCharacter(id: string): Promise<Character> {
  try {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`, {
      next: { revalidate: 864000 }
    });
    
    if (!res.ok) {
      throw new Error(`Personaje no encontrado (ID: ${id}, Status: ${res.status})`);
    }
    
    const character = await res.json();
    return character;
  } catch (error) {
    console.error('Error en getCharacter:', error);
    throw error;
  }
}

export async function generateStaticParams() { 
  try {
    console.log('Generando parámetros estáticos para TODOS los personajes...');
        const firstPageRes = await fetch('https://rickandmortyapi.com/api/character', {
      next: { revalidate: 864000 }
    });
    
    if (!firstPageRes.ok) {
      console.error('Error al obtener la primera página:', firstPageRes.status);
      return [];
    }
    
    const firstPageData: CharacterListResponse = await firstPageRes.json();
    const totalPages = firstPageData.info.pages;
    console.log(`Total de páginas a procesar: ${totalPages}`);
    
    const allCharacters: Character[] = [...firstPageData.results];
    
    for (let page = 2; page <= totalPages; page++) {
      try {
        const pageRes = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`, {
          next: { revalidate: 864000 }
        });
        
        if (pageRes.ok) {
          const pageData: CharacterListResponse = await pageRes.json();
          allCharacters.push(...pageData.results);
          console.log(`Procesada página ${page}/${totalPages}`);
        }
      } catch (error) {
        console.error(`Error procesando página ${page}:`, error);
      }
    }
    
    console.log(`Generando ${allCharacters.length} páginas estáticas`);
    
    return allCharacters.map((character) => ({
      id: character.id.toString(),
    }));
  } catch (error) {
    console.error('Error en generateStaticParams:', error);
    return [];
  }
}

export async function generateMetadata({ params }: CharacterPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  
  if (!id) {
    return {
      title: 'Personaje no encontrado - Rick and Morty App',
      description: 'El personaje solicitado no fue encontrado',
    };
  }
  
  try {
    const character = await getCharacter(id);
    
    return {
      title: `${character.name} - Rick and Morty App`,
      description: `Información sobre ${character.name}: ${character.status} - ${character.species}`,
    };
  } catch (error) {
    return {
      title: 'Personaje no encontrado - Rick and Morty App',
      description: 'El personaje solicitado no fue encontrado',
    };
  }
}

const statusColors: Record<string, string> = {
  Alive: 'bg-green-500',
  Dead: 'bg-red-500',
  unknown: 'bg-gray-400',
};

export default async function CharacterDetail({ params }: CharacterPageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  
  if (!id || isNaN(Number(id))) {
    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8 text-center">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
            <p className="text-gray-700">ID de personaje inválido: {id}</p>
            <Link
              href="/rickandmorty"
              className="inline-block mt-4 bg-black hover:bg-purple-900 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              ← Volver a la Lista
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  const character = await getCharacter(id);

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Encabezado con color de estado */}
        <div className={`bg-gradient-to-r from-black ${statusColors[character.status] || 'bg-gray-500'} p-8`}>
          <h1 className="text-5xl font-bold text-white capitalize text-center">
            {character.name}
          </h1>
          <p className="text-white text-center text-xl mt-2">
            #{character.id.toString().padStart(3, '0')}
          </p>
        </div>

        <div className="p-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Imagen del Personaje */}
            <div className="flex-1 flex justify-center items-center">
              <Image
                width={300} // Las imágenes de R&M son cuadradas
                height={300}
                src={character.image} // Usar la URL de la imagen del personaje
                alt={character.name}
                className="w-64 h-64 rounded-lg shadow-xl"
              />
            </div>

            {/* Información del Personaje */}
            <div className="flex-1">
              {/* Sección de Estado y Especie (reemplaza 'Tipos') */}
              <div className="mb-6">
                <h3 className="text-2xl text-gray-700 font-bold mb-3">Estado y Especie</h3>
                <div className="flex flex-wrap gap-2">
                  <span
                    className={`${statusColors[character.status] || 'bg-gray-400'} text-white px-4 py-2 rounded-full font-semibold capitalize`}
                  >
                    {character.status}
                  </span>
                  <span
                    className={`bg-blue-500 text-white px-4 py-2 rounded-full font-semibold capitalize`}
                  >
                    {character.species}
                  </span>
                </div>
              </div>

              {/* Sección de Información (reemplaza 'Estadísticas') */}
              <div className="mb-6 text-gray-700">
                <h3 className="text-2xl font-bold mb-3">Información</h3>
                <div className="space-y-2">
                  <p><strong>Género:</strong> {character.gender}</p>
                  <p><strong>Origen:</strong> {character.origin.name}</p>
                  <p><strong>Última Ubicación:</strong> {character.location.name}</p>
                </div>
              </div>

               <div className='text-gray-700'>
                 <h3 className="text-2xl font-bold mb-3">Apariciones</h3>
                 <p>Aparece en <strong>{character.episode.length}</strong> episodios.</p>
               </div>
            </div>
          </div>
        </div>

        {/* Link de 'Volver' actualizado */}
        <div className="p-8 bg-gray-50">
          <Link
            href="/rickandmorty" // Apuntar a la lista de Rick and Morty
            className="inline-block bg-black hover:bg-purple-900 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            ← Volver a la Lista
          </Link>
        </div>
      </div>
    </div>
  );
}