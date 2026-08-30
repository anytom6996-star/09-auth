'use client';

import ReactPaginate from 'react-paginate';

import css from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const handlePageChange = ({ selected }: { selected: number }) => {
    onPageChange(selected + 1);
  };

  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      forcePage={currentPage - 1}
      onPageChange={handlePageChange}
      containerClassName={css.pagination}
      pageClassName={css.page}
      pageLinkClassName={css.pageLink}
      activeClassName={css.active}
      previousClassName={css.previous}
      nextClassName={css.next}
      breakClassName={css.break}
      disabledClassName={css.disabled}
      previousLabel="←"
      nextLabel="→"
      breakLabel="..."
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;