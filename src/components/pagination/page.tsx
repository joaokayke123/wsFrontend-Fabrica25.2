'use client';

import React from 'react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
  pokemonsPerPage?: number;
  maxPokemonId?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  onPreviousPage,
  onNextPage,
}) => {
  // Gera números das páginas para exibir
  const getPageNumbers = () => {
    const delta = 2; // Quantas páginas mostrar de cada lado da atual
    const pages: (number | string)[] = [];
    const start = Math.max(1, currentPage - delta);
    const end = Math.min(totalPages, currentPage + delta);

    // Primeira página
    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push('...');
    }

    // Páginas próximas à atual
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Última página
    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  const goToFirstPage = () => {
    onPageChange(1);
  };

  const goToLastPage = () => {
    onPageChange(totalPages);
  };

  return (
    <div className="pagination-container">
      {/* Controles de paginação */}
      <div className="flex justify-center items-center mt-8 mb-8 gap-2">
        {/* Botão Primeira Página */}
        <button
          onClick={goToFirstPage}
          disabled={currentPage === 1}
          className="px-3 py-2 rounded-md bg-blueBotton text-white hover:bg-bottonHover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Primeira página"
        >
          «
        </button>

        {/* Botão Página Anterior */}
        <button
          onClick={onPreviousPage}
          disabled={currentPage === 1}
          className="px-3 py-2 rounded-md bg-blueBotton text-white hover:bg-bottonHover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Página anterior"
        >
          ‹
        </button>

        {/* Números das páginas */}
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => (typeof page === 'number' ? onPageChange(page) : undefined)}
            className={`px-3 py-2 rounded-md transition-colors ${
              page === currentPage
                ? 'bg-bottonHover text-white'
                : typeof page === 'number'
                  ? 'bg-blueBotton text-white hover:bg-bottonHover'
                  : 'bg-transparent text-gray-400 cursor-default'
            }`}
            disabled={typeof page !== 'number'}
          >
            {page}
          </button>
        ))}

        {/* Botão Próxima Página */}
        <button
          onClick={onNextPage}
          disabled={currentPage === totalPages}
          className="px-3 py-2 rounded-md bg-blueBotton text-white hover:bg-bottonHover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Próxima página"
        >
          ›
        </button>

        {/* Botão Última Página */}
        <button
          onClick={goToLastPage}
          disabled={currentPage === totalPages}
          className="px-3 py-2 rounded-md bg-blueBotton text-white hover:bg-bottonHover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title="Última página"
        >
          »
        </button>
      </div>
    </div>
  );
};

export default Pagination;
