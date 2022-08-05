import React from 'react';
import { OverflowMenu, DropDownItem } from '@admiral-ds/react-ui';

import type { ITableColumn } from '../../interfaces/Column';
import { IOverflowMenu } from '../../interfaces/shared';

interface ITableCellOverflowMenuProps {
  config: ITableColumn,
  row: any,
}

function TableCellOverflowMenu(props: ITableCellOverflowMenuProps): JSX.Element {
  const { config, row } = props;
  const {
    width,
    overflowMenu = [],
    isDisabled,
  } = config;

  return (
    <div
      role="button"
      tabIndex={0}
      className="table-cell table-cell--menu"
      style={{ width }}
      onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => e.stopPropagation()}
      onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
    >
      <OverflowMenu
        disabled={isDisabled}
        selected={undefined}
        aria-label="Overflow Menu"
        title="Меню"
        items={[]}
        onChange={(value: string) => {
          overflowMenu
            .find(({ value: action }: any) => value === action)
            ?.callback(row.id, value);
        }}
      >
        {overflowMenu
          ?.map(({ value, label }: IOverflowMenu) => (
            <DropDownItem
              key={value}
              role="option"
              id={value}
            >
              {label}
            </DropDownItem>
          ))}
      </OverflowMenu>
    </div>
  );
}

export default TableCellOverflowMenu;
