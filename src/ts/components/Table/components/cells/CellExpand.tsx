import React from 'react';
import { ReactComponent as ChevronDownOutline } from '@openvtb/admiral-icons/build/system/ChevronDownOutline.svg';

import type { ITableColumn } from '../../interfaces/Column';
import type { RowId, ITableRow } from '../../interfaces/Row';

interface ITableCelButtonProps {
  config: ITableColumn,
  row: ITableRow,
  handleExpansionChange?: (id: RowId) => void;
}

function TableCellExpand(props: ITableCelButtonProps): JSX.Element {
  const { config, row, handleExpansionChange } = props;
  const { width } = config;
  const rowId = row?.id;

  return (
    <div
      role="button"
      tabIndex={0}
      className="table-cell table-cell--expand-button"
      style={{ width }}
      onKeyDown={() => handleExpansionChange?.(rowId)}
      onClick={(e: React.MouseEvent<HTMLElement>) => {
        // клик по кнопке не должен вызывать событие клика по строке
        e.stopPropagation();
        handleExpansionChange?.(rowId);
      }}
    >
      <ChevronDownOutline
        data-opened={!!row.expanded}
        className="table-cell--expand-icon"
      />
    </div>
  );
}

TableCellExpand.defaultProps = {
  handleExpansionChange: () => {},
};

export default TableCellExpand;
