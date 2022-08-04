import React from 'react';
import { CheckboxField } from '@admiral-ds/react-ui';
import { ReactComponent as LockOutline } from '@openvtb/admiral-icons/build/security/LockOutline.svg';

import type { ITableColumn } from '../../interfaces/Column';
import type { RowId, ITableRow } from '../../interfaces/Row';

interface ITableCellCheckboxProps {
  config: ITableColumn,
  row: ITableRow,
  handleCheckboxChange?: (id: RowId) => void;
  isBlocked?: boolean,
}

function TableCellCheckbox({
  config, row, handleCheckboxChange, isBlocked,
}: ITableCellCheckboxProps): JSX.Element {
  const { width, isDisabled } = config;
  const rowId = row?.id;
  return (
    <div
      role="button"
      tabIndex={0}
      className="table-cell table-cell--checkbox"
      style={{ width }}
      onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => e.stopPropagation()}
      onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
    >
      {isBlocked ? (
        <LockOutline className="table-cell--locked-icon" />
      ) : (
        <CheckboxField
          disabled={isDisabled}
          dimension="m"
          checked={!!row.selected}
          onChange={() => handleCheckboxChange?.(rowId)}
        />
      )}
    </div>
  );
}

TableCellCheckbox.defaultProps = {
  handleCheckboxChange: () => {},
  isBlocked: false,
};

export default TableCellCheckbox;
