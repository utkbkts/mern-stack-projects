import React from "react";
import Link from "next/link";
import classNames from "classnames";
const Pagination = ({ pageNo = "1", totalPages, hasNextPage }) => {
  const currentPage = parseInt(pageNo);

  const getPages = () => {
    let start = 1;
    let end = start - 10;

    if (totalPages > 10) {
      if (parseInt(pageNo) % 10 == 0) {
        start = parseInt(pageNo);
      } else {
        let start = parseInt(pageNo) - (parseInt(pageNo) % 10);
      }
    }
    if (end > totalPages) {
      end = totalPages;
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };
  const pages = getPages();
  if (totalPages === 1) return null;
  return (
    <div>
      <div className="flex justify-center mt-2">
        {currentPage !== 1 && (
          <Link
            href={`?pageNo=${currentPage - 1}`}
            className="border border-gray px-4 py-2 bg-amber-100 hover:bg-amber-300 hover:text-white"
          >
            {"<<"}
          </Link>
        )}
        {pages.map((page, i) => (
          <Link
            className={classNames(
              "border",
              "border-gray",
              "px-4",
              "py-2",
              "hover:bg-amber-100",
              "hover:text-white",
              { "bg-amber-100": currentPage !== page },
              { "bg-amber-300": currentPage === page }
            )}
            href={`?pageNo=${page}`}
          >
            {page}
          </Link>
        ))}
        {hasNextPage && (
          <Link
            href={`?pageNo=${currentPage + 1}`}
            className="border border-gray px-4 py-2 bg-amber-100 hover:bg-amber-300 hover:text-white"
          >
            {">>"}
          </Link>
        )}
      </div>
    </div>
  );
};

export default Pagination;
