import React from 'react';
import styled from 'styled-components';
import { Chip } from '../global/Chip.tsx';
import { filterOut, limit } from '../../utils/helpers/spells.ts';
import { DataTableCellProps, TableCellProps, dataTableTypeList } from '../../types/DataTableTypes.ts';

export const DataTableCell: React.FC<DataTableCellProps> = ({ row, column, columnIndex, color, onClick }) => {
    if (Array.isArray(row[column.value])) {
        row[column.value] = limit(Array.from([String(row[column.value])]), 5);
    }
    return (
        <TableCell key={columnIndex} onClick={onClick}>
            {(column.type === 'chips' && !Array.isArray(row[column.value])) && (
                <Chip
                    text={String(row[column.value])}
                    color={color}
                />
            )}
            {(column.type === 'chips' && Array.isArray(row[column.value])) && (
                <ChipContainer>
                    {Array.isArray(row[column.value]) && (row[column.value] as string[]).map((item: string, index: number) => (
                        <Chip
                            key={index}
                            text={item}
                            color={color}
                        />
                    ))}
                </ChipContainer>
            )}
            {(!column.type || filterOut(['chips', 'link'], dataTableTypeList).includes(column.type)) && (
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
