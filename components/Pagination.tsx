import Link from 'next/link';

type Props = {
  currentPage: number;
  totalPages: number;
};

export default function Pagination({ currentPage, totalPages }: Props) {
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Síðufletting" className="pagination">
      <Link
        href={`/events?page=${Math.max(1, currentPage - 1)}`}
        className={`page-button ${currentPage === 1 ? 'disabled' : ''}`}
        aria-disabled={currentPage === 1}
      >
        Fyrri
      </Link>

      <span className="pagination-text">
        Síða {currentPage} af {totalPages}
      </span>

      <Link
        href={`/events?page=${Math.min(totalPages, currentPage + 1)}`}
        className={`page-button ${currentPage === totalPages ? 'disabled' : ''}`}
        aria-disabled={currentPage === totalPages}
      >
        Næsta
      </Link>
    </nav>
  );
}