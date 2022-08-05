import React from 'react';

import type { ITableColumn } from '../interfaces/Column';
import type { RowId } from '../interfaces/Row';

import TableCell from './TableCell';
import { ITableRow } from '../interfaces/Row';

interface ITableBodyProps {
  columns: ITableColumn[],
  rows: ITableRow[],
  handleCheckboxChange?: (id: RowId) => void;
  handleExpansionChange?: (id: RowId) => void;
  handleRowClick?: (id: RowId) => void;
  isBlockedRow?: (row: ITableRow) => boolean;
}

const TableBody = React.forwardRef((
  props: ITableBodyProps,
  ref: React.ForwardedRef<HTMLDivElement>,
): JSX.Element => {
  const {
    columns,
    rows,
    handleCheckboxChange,
    handleExpansionChange,
    handleRowClick,
    isBlockedRow,
  } = props;

  const renderBodyCell = (
    column: ITableColumn,
    row: ITableRow,
    isBlocked: boolean,
    index: number,
  ) => (
    <TableCell
      key={`cell-${index}`}
      column={column}
      row={row}
      handleCheckboxChange={handleCheckboxChange}
      handleExpansionChange={handleExpansionChange}
      isBlocked={isBlocked}
    />
  );

  const renderRow = (row: ITableRow) => {
    const isSelected = row?.selected || false;
    const isExpanded = row?.expanded || false;
    const isBlocked = isBlockedRow ? isBlockedRow(row) : false;
    const rowId = row?.id;

    const simpleCells = columns
      .reduce((cols: React.ReactNode[], column: ITableColumn, index: number) => {
        if (column.isShow && !column.isFixed) {
          cols.push(renderBodyCell(column, row, isBlocked, index));
        }
        return cols;
      }, []);

    const stickyCells = columns
      .reduce((cols: React.ReactNode[], column: ITableColumn, index: number) => {
        if (column.isShow && column.isFixed) {
          cols.push(renderBodyCell(column, row, isBlocked, index));
        }
        return cols;
      }, []);

    return (
      <div
        key={`row_${row.id}`}
        className="table-body-row"
      >
        <div
          role="button"
          tabIndex={0}
          className="table-body-row-simple"
          data-selected={`${isSelected}`}
          onKeyDown={() => handleRowClick?.(rowId)}
          onClick={() => handleRowClick?.(rowId)}
        >
          <div
            className="table-sticky-wrapper"
            data-selected={`${isSelected}`}
          >
            {stickyCells}
          </div>
          {simpleCells}
          <div className="table-filler" />
        </div>

        {isExpanded && row?.expandedRowRender && (
          <div className="table-body-row-expanded">
            <div className="table-body-row-expanded-content">
              {row?.expandedRowRender(row)}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      ref={ref}
      className="table-body"
    >
      {rows.map((row: ITableRow) => renderRow(row))}
    </div>
  );
});

TableBody.defaultProps = {
  isBlockedRow: () => false,
  handleCheckboxChange: () => {},
  handleExpansionChange: () => {},
  handleRowClick: () => {},
};

TableBody.displayName = 'TableBody';

export default TableBody;
