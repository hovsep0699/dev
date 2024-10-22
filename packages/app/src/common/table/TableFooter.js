import React from 'react';
import TableRow from './TableRow';
import TableCell from './TableCell';
import PropTypes from 'prop-types';
import GroupRight from '../GroupRight';
import Pagination from './Pagination';

const TableFooter = props => {
  const leftColspan = Math.floor(props.colsnum / 2);
  const rightColspan = Math.ceil(props.colsnum / 2);
  return (
    <tfoot>
      <TableRow>
        <TableCell colSpan={leftColspan}>{props.children}</TableCell>
        {props.colsnum > 1 && (
          <TableCell colSpan={rightColspan} align="right">
            <GroupRight>
              {!!props.totalRecords && (
                <Pagination
                  limit={props.limit}
                  totalRecords={props.totalRecords}
                  currentPage={props.currentPage}
                  handleChange={props.handleChange}
                />
              )}
            </GroupRight>
          </TableCell>
        )}
      </TableRow>
    </tfoot>
  );
};
TableFooter.propTypes = {
  colsnum: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  totalRecords: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default TableFooter;
