import React from "react";

interface PaginationProps {
  currentPage: number;
  pageSize: number;
  totalResults: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  pageSize,
  totalResults,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalResults / pageSize);

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex items-center justify-center mt-4 gap-2">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md ${
          currentPage === 1
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        Previous
      </button>

      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded-md ${
              page === currentPage
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-md ${
          currentPage === totalPages
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
