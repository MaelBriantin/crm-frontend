import { useState } from 'react';
import styled, { RuleSet, css } from 'styled-components';
import { DataTableCell } from './DataTableCell';
import { getColor } from '../../utils/dataTableUtils';
import { ColumnProps, RowType } from '../../types/DataTableTypes';

type DataTableRowProps = {
    row: RowType;
    rowIndex: number;
    columns: ColumnProps[];
    onClickOnRow?: (row: RowType) => void;
    onDoubleClickOnRow?: (row: RowType) => void;
    selectable: boolean;
    hoverable: boolean;
    searchedValue?: string | number;
    disabledRow?: (row: RowType) => boolean;
};

export const DataTableRow = ({ row, rowIndex, columns, onClickOnRow, onDoubleClickOnRow, selectable, hoverable, searchedValue, disabledRow }: DataTableRowProps) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
        <TableRowBody
            $disableRow={disabledRow && disabledRow(row)}
            key={rowIndex}
            $selectable={selectable}
            $hoverable={hoverable}
            onClick={() => onClickOnRow && onClickOnRow(row)}
            onDoubleClick={() => onDoubleClickOnRow && onDoubleClickOnRow(row)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {columns.map((column, columnIndex) => (
                <DataTableCell
                    isHovered={isHovered}
                    searchedValue={searchedValue}
                    key={columnIndex}
                    row={row}
                    column={column}
                    columnWidth={column?.width}
                    columnMaxWidth={column?.maxWidth}
                    columnIndex={columnIndex}
                    align={column?.align}
                    color={getColor(column.color, String(row[column.value]))}
                    arrayLimit={column.limit}
                />
            ))}
        </TableRowBody>
    );
};

const TableRowBody = styled.tr <{ $selectable: boolean, $hoverable: boolean, $disableRow: boolean | undefined }>`
    opacity: ${({ $disableRow }): number => ($disableRow ? 0.5 : 1)};
    transition: all 250ms;
    background-color: white;
    height: 40px;
    overflow: hidden;
    width: 100%;
    &:hover {
        ${({ $hoverable }): false | RuleSet<object> =>
        $hoverable &&
        css`
            background-color: #f9f9f9;
        `}
        ${({ $selectable }): false | RuleSet<object> =>
        $selectable &&
        css`
            cursor: default;
            user-select: none;
            background-color: #f9f9f9;
        `}
    }
`;
