import React from 'react';
import { ReactComponent as ArrowRightOutline } from '@openvtb/admiral-icons/build/system/ArrowRightOutline.svg';

import type { ITableColumn } from '../interfaces/Column';
import { ColumnTypesEnum } from '../interfaces/Column';

import MasterCheckbox from './MasterCheckbox';
import { ITableRow } from '../interfaces/Row';

interface ITableHeadProps {
  columns: ITableColumn[],
  rows: ITableRow[],
  resizeLine: any,
  sortConfig?: any,
  updateDraggableColumn: (tempColumns: ITableColumn[]) => void,
  updateColumnWidth: (id: number, width: number) => void,
  updateSortConfig?: Function,
  handleHeaderCheckboxChange?: () => void;
}

function requestSort(
  property: string,
  sortConfig: any = {},
  updateSortConfig: Function = () => { },
) {
  const direction = sortConfig?.sort?.direction === 'asc'
    ? 'desc'
    : 'asc';
  updateSortConfig({
    filters: sortConfig.filters ?? [],
    sort: { property, direction },
  });
}

function TableHead(props: ITableHeadProps): JSX.Element {
  const {
    resizeLine,
    rows,
    sortConfig,
    updateSortConfig,
    columns,
    updateColumnWidth,
    updateDraggableColumn,
    handleHeaderCheckboxChange,
  } = props;

  // Drag-and-Drop
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: string) => {
    if (e.target === e.view.document.activeElement) {
      e.dataTransfer.setData('columnIndex', index);
    } else e.preventDefault();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragEnter = (_e: React.DragEvent<HTMLDivElement>, index: number) => {
    const linePosition = columns
      .filter((_config, id: number) => id <= index)
      .reduce((width: number, config: any) => (width + config.width), 0);

    resizeLine.current.style.display = 'block';
    resizeLine.current.style.left = `${linePosition}px`;

    if (!columns[index].isDraggable) {
      resizeLine.current.style.display = 'none';
    }
  };

  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    // запрет DnD в зафиксированные части таблицы
    if (!columns[index].isDraggable) {
      resizeLine.current.style.display = 'none';
      return false;
    }

    const droppedColumnIndex = index;
    const draggedColumnIndex = e.dataTransfer.getData('columnIndex');
    if (!draggedColumnIndex) e.preventDefault();

    const tempColumns = [...columns];

    tempColumns[+draggedColumnIndex] = columns[droppedColumnIndex];
    tempColumns[droppedColumnIndex] = columns[+draggedColumnIndex];

    updateDraggableColumn(tempColumns);
    resizeLine.current.style.display = 'none';
    return true;
  };

  // Column Resizing
  const mouseMoveHandler = (e: MouseEvent) => {
    e.stopPropagation();

    // Get the position of the mouse on the "mousedown" event
    const mouseDownX = +resizeLine.current.dataset.mouseX;

    // Calculate how far the mouse has been moved
    const mouseOffsetX = e.clientX - mouseDownX;
    resizeLine.current.dataset.mouseOffsetX = mouseOffsetX;

    // Get the resize line offset on the "mousedown" event
    const mouseDownLineOffset = +resizeLine.current.dataset.lineOffset;

    // Update the resize line position
    const left = mouseDownLineOffset + mouseOffsetX;
    resizeLine.current.style.left = `${left}px`;
  };

  const mouseUpHandler = () => {
    // Get the mouse offset
    const mouseOffset = +resizeLine.current.dataset.mouseOffsetX;

    // Get the actual width of column
    const columnWidth = +resizeLine.current.dataset.configColumnWidth + mouseOffset;

    // Get the actual id of column
    const activeColumn = +resizeLine.current.dataset.activeColumn;

    if (columnWidth >= 80) {
      updateColumnWidth(activeColumn, columnWidth);
    }

    resizeLine.current.style.display = 'none';

    document.body.removeEventListener('mousemove', mouseMoveHandler);
    document.body.removeEventListener('mouseup', mouseUpHandler);
  };

  const mouseDownHandler = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    // Get the current mouse position
    const mouseX = e.clientX;

    // Get the config width of column
    const configColumnWidth = columns[index].width;

    // Calculate the resize line offset
    const lineOffset = columns
      .filter((_config, id: number) => id <= index)
      .reduce((width: number, config: any) => (width + config.width), 0);

    resizeLine.current.style.display = 'block';
    resizeLine.current.style.left = `${lineOffset}px`;

    // Set the resize line attributes
    resizeLine.current.dataset.activeColumn = index;
    resizeLine.current.dataset.mouseX = mouseX;
    resizeLine.current.dataset.lineOffset = lineOffset;
    resizeLine.current.dataset.configColumnWidth = configColumnWidth;

    document.body.addEventListener('mousemove', mouseMoveHandler);
    document.body.addEventListener('mouseup', mouseUpHandler);
  };

  const renderHeaderCell = (column: ITableColumn, index: number) => {
    const {
      template,
      properties,
      title,
      width,
      isSortable,
      isResizable,
      isDraggable,
      isDisabled,
    } = column;
    const isSimpleColumn = template !== ColumnTypesEnum.CHECKBOX
      && template !== ColumnTypesEnum.MENU
      && template !== ColumnTypesEnum.EXPAND;
    const isCheckbox = template === ColumnTypesEnum.CHECKBOX;
    const isButton = template === ColumnTypesEnum.MENU || ColumnTypesEnum.EXPAND;
    return (
      <div
        key={`head_${index}_${title}`}
        id={properties[0]}
        role="button"
        tabIndex={0}
        title={title ?? properties[0]}
        style={{ width: `${width}px` }}
        className={isCheckbox ? 'table-cell table-cell--checkbox master' : 'table-header-cell'}
        draggable={isDraggable ? 'true' : 'false'} // this attribute is enumerated, not Boolean
        onKeyDown={() => {
          if (isSortable) requestSort(properties[0], sortConfig, updateSortConfig);
        }}
        onClick={() => {
          if (isSortable) requestSort(properties[0], sortConfig, updateSortConfig);
        }}
        onDragOver={handleDragOver}
        onDragStart={(e: React.DragEvent<HTMLDivElement>) => handleDragStart(e, index.toString())}
        onDrop={(e: React.DragEvent<HTMLDivElement>) => handleOnDrop(e, index)}
        onDragEnter={(e: React.DragEvent<HTMLDivElement>) => handleDragEnter(e, index)}
      >
        {isCheckbox && (
          <MasterCheckbox
            disabled={isDisabled || false}
            rows={rows}
            handleHeaderCheckboxChange={handleHeaderCheckboxChange}
          />
        )}

        {isButton && null}

        {isSimpleColumn && (
          <div className="table-header-cell-content">
            <div className="table-header-cell-title">
              <div className="table-header-cell-title-content">
                <div className="table-header-cell-title-text">{title ?? properties[0]}</div>
              </div>
            </div>

            {isDraggable && (
              <div
                id={properties[0]}
                role="button"
                tabIndex={0}
                aria-label="Drag Handler"
                draggable={isDraggable ? 'true' : 'false'}
              />
            )}

            {isSortable && false && <ArrowRightOutline className="table-header-cell-sort-icon" />}
            <div className="table-header-cell-spacer" />
          </div>
        )}

        {isResizable && (
          <div
            role="button"
            tabIndex={0}
            aria-label="Resize Handler"
            className="table-header-resize-wrapper"
            onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
              e.stopPropagation();
              mouseDownHandler(e, index);
            }}
          >
            <div className="table-header-resize-handler" />
          </div>
        )}
      </div>
    );
  };

  const simpleColumns = columns
    .reduce((cols: React.ReactNode[], col: ITableColumn, index: number) => {
      if (col.isShow && !col.isFixed) cols.push(renderHeaderCell(col, index));
      return cols;
    }, []);

  const stickyColumns = columns
    .reduce((cols: React.ReactNode[], col: ITableColumn, index: number) => {
      if (col.isShow && col.isFixed) cols.push(renderHeaderCell(col, index));
      return cols;
    }, []);

  return (
    <div className="table-header">
      <div className="table-header-wrapper">
        <div className="table-sticky-wrapper">{stickyColumns}</div>
        {simpleColumns}
        <div className="table-filler" />
      </div>
    </div>
  );
}

TableHead.defaultProps = {
  sortConfig: {},
  updateSortConfig: () => {},
  handleHeaderCheckboxChange: () => {},
};

export default TableHead;
