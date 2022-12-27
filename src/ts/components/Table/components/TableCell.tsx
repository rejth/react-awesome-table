import React from 'react';

import parser from 'src/ts/utils/parser';
import type { ColumnType, ITableColumn } from '../interfaces/Column';
import type { RowId, ITableRow } from '../interfaces/Row';
import { ColumnTypesEnum } from '../interfaces/Column';

import TableCellString from './cells/CellString';
import TableCellNumber from './cells/CellNumber';
import TableCellContextMenu from './cells/CellOverflowMenu';
import TableCellCheckbox from './cells/CellCheckbox';
import TableCellExpand from './cells/CellExpand';
import TableCellList from './cells/CellList';
import TableCellLink from './cells/CellLink';
import TableCellDropdown from './cells/CellDropdown';

interface ITableCellProps {
  column: ITableColumn;
  row: ITableRow;
  isBlocked?: boolean;
  handleCheckboxChange?: (id: RowId) => void;
  handleExpansionChange?: (id: RowId) => void;
}

const cells = {
  [ColumnTypesEnum.STRING]: TableCellString,
  [ColumnTypesEnum.NUMBER]: TableCellNumber,
  [ColumnTypesEnum.MENU]: TableCellContextMenu,
  [ColumnTypesEnum.CHECKBOX]: TableCellCheckbox,
  [ColumnTypesEnum.EXPAND]: TableCellExpand,
  [ColumnTypesEnum.LINK]: TableCellLink,
  [ColumnTypesEnum.LIST]: TableCellList,
  [ColumnTypesEnum.DROPDOWN]: TableCellDropdown,
};

const getSpecificCell = (type: ColumnType) => cells[type];

function TableCell(props: ITableCellProps): JSX.Element | null {
  const {
    column, row, isBlocked, handleCheckboxChange, handleExpansionChange,
  } = props;

  const cellValues = column.properties.map(
    (property: string) => parser.getValueByKeys(row, property.split('.')) ?? '',
  );

  const Cell = getSpecificCell(column.template);

  return (
    <Cell
      row={row}
      config={column}
      values={cellValues}
      isBlocked={isBlocked}
      handleCheckboxChange={handleCheckboxChange}
      handleExpansionChange={handleExpansionChange}
    />
  );
}

TableCell.defaultProps = {
  isBlocked: false,
  handleCheckboxChange: () => {},
  handleExpansionChange: () => {},
};

export default TableCell;
