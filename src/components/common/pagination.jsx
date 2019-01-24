import React from "react";
import _ from "lodash";
import propTypes from "prop-types";
const pagination = props => {
  const { itemsCount, currentPage, pageSize, onPageChange } = props;
  console.log(currentPage);
  const pagesCount = itemsCount / pageSize;
  if (pagesCount < 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => props.onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

pagination.propTypes = {
  itemsCount: propTypes.number.isRequired,
  currentPage: propTypes.number.isRequired,
  pageSize: propTypes.number.isRequired,
  onPageChange: propTypes.func.isRequired
};
export default pagination;
