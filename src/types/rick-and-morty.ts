export interface Info {
    count: number;    // El número total de personajes
    pages: number;    // El número total de páginas
    next: string | null; // URL a la siguiente página
    prev: string | null; // URL a la página anterior
  }
  

  export interface CharacterListResponse {
    info: Info;
    results: Character[]; // La API de R&M devuelve los objetos completos en la lista
  }
  

  export interface CharacterLocationInfo {
    name: string;
    url: string; // URL al recurso de la ubicación
  }
  
  export interface Character {
    id: number;
    name: string;
    status: "Alive" | "Dead" | "unknown"; // Estado del personaje
    species: string;
    type: string; // El tipo o sub-especie
    gender: "Female" | "Male" | "Genderless" | "unknown";
    origin: CharacterLocationInfo;
    location: CharacterLocationInfo;
    image: string; // URL a la imagen (análogo a 'sprites')
    episode: string[]; // Lista de URLs a los episodios en los que aparece
    url: string; // URL al endpoint de este personaje
    created: string; 
  }
  
  export interface SimpleCharacter {
    id: number;
    name: string;
  }