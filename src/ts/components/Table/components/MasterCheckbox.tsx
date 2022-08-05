import React from 'react';
import { CheckboxField } from '@admiral-ds/react-ui';
import { ITableRow } from '../interfaces/Row';

interface IMasterCheckboxProps {
  disabled: boolean;
  rows: ITableRow[];
  handleHeaderCheckboxChange?: () => void;
}

function TableMasterCheckbox({
  disabled,
  rows,
  handleHeaderCheckboxChange,
}: IMasterCheckboxProps): JSX.Element {
  const isSelected = (row: ITableRow) => row?.selected || false;
  const allRowsChecked = rows.every(isSelected);
  const someRowsChecked = rows.some(isSelected);

  return (
    <CheckboxField
      disabled={disabled}
      dimension="m"
      checked={allRowsChecked || someRowsChecked}
      indeterminate={!allRowsChecked && someRowsChecked}
      onChange={handleHeaderCheckboxChange}
    />
  );
}

TableMasterCheckbox.defaultProps = {
  handleHeaderCheckboxChange: () => {},
};

export default TableMasterCheckbox;
