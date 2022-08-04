import React, { useState } from 'react';
import { MenuButton } from '@admiral-ds/react-ui';

import type { ITableColumn } from '../../interfaces/Column';
import type { IOverflowMenu } from '../../interfaces/shared';

interface ITableDropDownProps {
  config: ITableColumn,
  row: any,
}

function getMenuButtonOptions(options: any) {
  return options.map((button: any) => ({
    display: button.label,
    value: button.value,
    id: button.value,
  }));
}

function getSelectedOption(options: any, option: string) {
  return options.find(({ value }: IOverflowMenu) => value === option);
}

function TableDropDown(props: ITableDropDownProps): JSX.Element {
  const { config, row } = props;
  const { width, overflowMenu, isDisabled } = config;

  const currentOption = getSelectedOption(overflowMenu, row.dropdown);
  const [label, setLabel] = useState<string>(currentOption?.label || '');

  return (
    <div
      role="button"
      tabIndex={0}
      className="table-cell table-cell--dropdown"
      style={{ width }}
      onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => e.stopPropagation()}
      onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
    >
      <MenuButton
        selected={undefined}
        dimension="s"
        appearance="ghost"
        disabled={isDisabled}
        items={getMenuButtonOptions(overflowMenu)}
        onChange={(option: string) => {
          const selectedOption = getSelectedOption(overflowMenu, option);
          setLabel(selectedOption?.label || '');
          selectedOption?.callback(row.id, option);
        }}
      >
        {label}
      </MenuButton>
    </div>
  );
}

export default TableDropDown;
