import styled, { css, RuleSet } from 'styled-components';
import { DataTableCell } from './DataTableCell';
import { ColumnProps, ColumnType, RowType } from '../../types/DataTableTypes';
import { getColor } from '../../utils/dataTableUtils';

type DataTableBodyProps = {
    data: RowType[];
    columns: ColumnProps[];
    onClickOnRow?: (row: RowType) => void;
    onDoubleClickOnRow?: (row: RowType) => void;
    selectable: boolean;
    hoverable: boolean;
    searchedValue?: string | number;
};

export const DataTableBody = ({ data, columns, onClickOnRow, onDoubleClickOnRow, selectable, hoverable, searchedValue }: DataTableBodyProps) => {
    return (
        <tbody>
            {data.map((row, rowIndex) => (
                <TableRowBody
                    key={rowIndex}
                    $selectable={selectable}
                    $hoverable={hoverable}
                    onClick={() => onClickOnRow && onClickOnRow(row)}
                    onDoubleClick={() => onDoubleClickOnRow && onDoubleClickOnRow(row)}
                >
                    {columns.map((column, columnIndex) => (
                        <DataTableCell
                            searchedValue={searchedValue}
                            key={columnIndex}
                            row={row as RowType}
                            column={column as ColumnType}
                            columnIndex={columnIndex}
                            color={getColor(column.color, String(row[column.value]))}
                        />
                    ))}
                </TableRowBody>
            ))}
        </tbody>
    );
};

const TableRowBody = styled.tr <{ $selectable: boolean, $hoverable: boolean }>`
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
            cursor: pointer;
            user-select: none;
            background-color: #f9f9f9;
        `}
    }
`;

