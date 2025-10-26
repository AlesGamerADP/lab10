'use client';

import { useState, useEffect, useMemo } from 'react';
import { Character } from '@/types/rick-and-morty';
import Link from 'next/link';
import Image from 'next/image';
import { IoSearch, IoClose } from 'react-icons/io5';

interface SearchBarProps {
  characters: Character[];
}

export default function SearchBar({ characters }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [showResults, setShowResults] = useState(false);

  // Filtrar personajes en tiempo real
  const filteredCharacters = useMemo(() => {
    return characters.filter(character => {
      const matchesName = character.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = !statusFilter || character.status.toLowerCase() === statusFilter.toLowerCase();
      const matchesGender = !genderFilter || character.gender.toLowerCase() === genderFilter.toLowerCase();
      const matchesType = !typeFilter || character.type.toLowerCase().includes(typeFilter.toLowerCase());
      
      return matchesName && matchesStatus && matchesGender && matchesType;
    });
  }, [characters, searchTerm, statusFilter, genderFilter, typeFilter]);

  // Obtener valores únicos para los filtros
  const uniqueStatuses = useMemo(() => {
    return Array.from(new Set(characters.map(c => c.status))).filter(Boolean);
  }, [characters]);

  const uniqueGenders = useMemo(() => {
    return Array.from(new Set(characters.map(c => c.gender))).filter(Boolean);
  }, [characters]);

  const uniqueTypes = useMemo(() => {
    return Array.from(new Set(characters.map(c => c.type))).filter(Boolean);
  }, [characters]);

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setGenderFilter('');
    setTypeFilter('');
  };

  const hasActiveFilters = searchTerm || statusFilter || genderFilter || typeFilter;

  return (
    <div className="mb-8">
      {/* Barra de búsqueda principal */}
      <div className="relative mb-4">
        <div className="relative">
          <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setShowResults(true)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <IoClose size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Filtro por Estado */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">Estado</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Todos los estados</option>
            {uniqueStatuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        {/* Filtro por Género */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">Género</label>
          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Todos los géneros</option>
            {uniqueGenders.map(gender => (
              <option key={gender} value={gender}>{gender}</option>
            ))}
          </select>
        </div>

        {/* Filtro por Tipo */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">Tipo</label>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Todos los tipos</option>
            {uniqueTypes.map(type => (
              <option key={type} value={type}>{type || 'Sin tipo'}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Botón para limpiar filtros */}
      {hasActiveFilters && (
        <div className="mb-4">
          <button
            onClick={clearFilters}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
          >
            <IoClose size={16} />
            Limpiar filtros
          </button>
        </div>
      )}

      {/* Contador de resultados */}
      <div className="mb-4">
        <p className="text-white">
          Mostrando {filteredCharacters.length} de {characters.length} personajes
        </p>
      </div>

      {/* Resultados de búsqueda */}
      {showResults && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCharacters.map((character) => (
            <Link
              key={character.id}
              href={`/rickandmorty/character/${character.id}`}
              className="transform transition hover:scale-105"
              onClick={() => setShowResults(false)}
            >
              <div className="bg-white text-gray-700 rounded-xl shadow-lg hover:shadow-2xl cursor-pointer overflow-hidden">
                <Image
                  width={300}
                  height={300}
                  src={character.image}
                  alt={character.name}
                  className="w-full h-auto object-cover"
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
      )}

      {/* Mensaje cuando no hay resultados */}
      {hasActiveFilters && filteredCharacters.length === 0 && (
        <div className="text-center py-8">
          <p className="text-white text-lg">No se encontraron personajes con los filtros aplicados</p>
          <button
            onClick={clearFilters}
            className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
}
