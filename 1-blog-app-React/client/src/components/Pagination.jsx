const Pagination = ({ totalPages, onPageChange }) => {
  // Mevcut sayfa numarasını URL'den alıyoruz veya varsayılan olarak 1 kullanıyoruz
  const searchParams = new URLSearchParams(window.location.search);
  const currentPage = parseInt(searchParams.get("page")) || 1;

  // Verilen aralıktaki sayıları oluşturan bir fonksiyon
  const range = (start, end) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  // 8'den fazla sayfa varsa '...' göster
  const showEllipses = totalPages > 8;

  return (
    <div className="pagination">
      {/* Önceki sayfa düğmesi */}
      <button
        className="pagination-btn"
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {/* '...' ve ilk sayfa düğmesi */}
      {showEllipses && currentPage > 4 && (
        <>
          <button className="pagination-btn" onClick={() => onPageChange(1)}>
            1
          </button>
          <span className="pagination-ellipsis">...</span>
        </>
      )}

      {/* Sayfa numaraları */}
      {range(
        Math.max(1, currentPage - 3),
        Math.min(totalPages, currentPage + 4)
      ).map((page) => (
        <button
          key={page}
          className={`pagination-btn ${page === currentPage ? "active" : ""}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {/* '...' ve son sayfa düğmesi */}
      {showEllipses && currentPage < totalPages - 3 && (
        <>
          <span className="pagination-ellipsis">...</span>
          <button
            className="pagination-btn"
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Sonraki sayfa düğmesi */}
      <button
        className="pagination-btn"
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
