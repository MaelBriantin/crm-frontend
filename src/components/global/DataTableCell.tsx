import React from 'react';
import styled from 'styled-components';
import { Chip } from './Chip.tsx';
import { limit } from '../../utils/helpers/spells.ts';

type DataTableCellProps = {
    row: any;
    column: any;
    columnIndex: number;
    color?: { background: string | undefined, text: string | undefined} | undefined;
};

type TableCellProps = {
    even?: boolean;
};

export const DataTableCell: React.FC<DataTableCellProps> = ({ row, column, columnIndex, color }) => {
    if (Array.isArray(row[column.value])) {
        row[column.value] = limit(row[column.value], 5);
    }
    return (
        <TableCell key={columnIndex}>
            {(column.type === 'chips' && !Array.isArray(row[column.value])) && (
                <Chip
                    text={row[column.value]}
                    color={color}
                />
            )}
            {(column.type === 'chips' && Array.isArray(row[column.value])) && (
                <ChipContainer>
                    {row[column.value].map((item: string, index: number) => (
                        <Chip
                            key={index}
                            text={item}
                            color={color}
                        />
                    ))}
                </ChipContainer>
            )}
            {(!column.type || column.type === 'text') && (
                <TableCellValue $color={{ background: color?.background || '', color: color?.text || '' }}>{row[column.value]}</TableCellValue>
            )}
        </TableCell>
    );
}

const TableCell = styled.td<TableCellProps>`
    padding: 8px;
    min-width: 50px;
    border-bottom: 1px solid #f9f9f9;
    vertical-align: middle;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const ChipContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    flex-wrap: wrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
    gap: 5px;
`;

const TableCellValue = styled.span<{$color: {background: string, color: string}}>`
    color: ${({$color}): string => $color.color};
`;
