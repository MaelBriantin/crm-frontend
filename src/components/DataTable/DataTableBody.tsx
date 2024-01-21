import styled, { css, RuleSet } from 'styled-components';
import { DataTableCell } from './DataTableCell';
import { ColumnProps, ColumnType, RowType } from '../../types/DataTableTypes';
import { getColor } from '../../utils/dataTableUtils';

type DataTableBodyProps = {
    data: RowType[];
    columns: ColumnProps[];
    selectable: boolean;
};

export const DataTableBody = ({ data, columns, selectable }: DataTableBodyProps) => {
    return (
        <tbody>
            {data.map((row, rowIndex) => (
                <TableRowBody
                    key={rowIndex}
                    $selectable={selectable}
                >
                    {columns.map((column, columnIndex) => (
                        <DataTableCell
                            key={columnIndex}
                            row={row as RowType}
                            column={column as ColumnType}
                            columnIndex={columnIndex}
                            color={getColor(column.color, String(row[column.value]))}
                            onClick={() => { }}
                        />
                    ))}
                </TableRowBody>
            ))}
        </tbody>
    );
};

const TableRowBody = styled.tr <{ $selectable: boolean }>`
    transition: all 250ms;
    background-color: white;
    height: 40px;
    overflow: hidden;
    width: 100%;
    ${({ $selectable }): false | RuleSet<object> =>
        $selectable &&
        css`
            &:hover {
                cursor: pointer;
                background-color: #f9f9f9;
            }
        `}
`;

