'use client';

export default function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-white py-4 mt-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Pokedex de Jotaka</p>
        <div className="flex gap-4 mt-2 sm:mt-0">
          <a href="#" className="hover:text-blue-400 transition-colors">
            Termos
          </a>
          <a href="#" className="hover:text-blue-400 transition-colors">
            Privacidade
          </a>
          <a href="#" className="hover:text-blue-400 transition-colors">
            Contato
          </a>
        </div>
      </div>
    </footer>
  );
}
