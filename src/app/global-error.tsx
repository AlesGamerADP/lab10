'use client' // Los componentes de error deben ser Componentes de Cliente

import { Inter } from 'next/font/google' // Importa la fuente aquí también

const inter = Inter({ subsets: ['latin'] })

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en" className={`${inter.className} h-full`}>
      <body className="bg-linear-to-br from-gray-900 to-purple-900 text-white min-h-full flex flex-col items-center justify-center p-8 text-center">
        <div>
          <h2 className="text-3xl font-semibold mb-4 drop-shadow-lg">
            ¡Algo salió mal!
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Ocurrió un error inesperado.
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition-colors"
          >
            Intentar de nuevo
          </button>
        </div>
      </body>
    </html>
  )
}