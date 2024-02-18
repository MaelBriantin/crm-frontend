import React from 'react';
import styled from 'styled-components';
import { Chip } from '../global/Chip.tsx';
import { filterOut } from '../../utils/helpers/spells.ts';
import { DataTableCellProps, dataTableTypeList } from '../../types/DataTableTypes.ts';
import { getRowValueAndHighlight } from '../../utils/dataTableUtils.ts';
import { theme } from '../../assets/themes/index.ts';

export const DataTableCell: React.FC<DataTableCellProps> = ({ row, column, columnWidth, columnIndex, color, searchedValue, arrayLimit = 4 }) => {

    const { rowValue, highlight } = getRowValueAndHighlight(searchedValue, row[column.value], arrayLimit);
    return (
        <TableCell key={columnIndex} $columnWidth={columnWidth}>
            {(column.type === 'chips' && !Array.isArray(rowValue)) && (
                <Chip
                    variant='small'
                    highlight={highlight}
                    text={String(rowValue)}
                    color={color}
                />
            )}
            {(column.type === 'chips' && Array.isArray(rowValue)) && (
                <ChipContainer>
                    {Array.isArray(rowValue) && (rowValue as string[]).map((item: string, index: number) => (
                        <Chip
                            variant='small'
                            highlight={highlight}
                            key={index}
                            text={item}
                            color={color}
                        />
                    ))}
                </ChipContainer>
            )}
            {(column.type !== 'chips' && Array.isArray(rowValue)) && (
                rowValue.map((item: string, index: number) => (
                    item !== '...' ?
                        <TableCellValue
                            key={index}
                            $color={{ background: color?.background || '', color: color?.text || '' }}
                            dangerouslySetInnerHTML={{ __html: item + ' / ' }}
                        />
                        : <TableCellValue
                            key={index}
                            $color={{ background: color?.background || '', color: color?.text || '' }}
                            dangerouslySetInnerHTML={{ __html: item }}
                        />
                ))
            )}
            {(!column.type || filterOut(['chips', 'link'], dataTableTypeList).includes(column.type) && !Array.isArray(rowValue)) && (
                <TableCellValue
                    $color={{ background: color?.background || '', color: color?.text || '' }}
                    dangerouslySetInnerHTML={{ __html: rowValue }}
                />
            )}
        </TableCell>
    );
}

const TableCell = styled.td<{ $columnWidth: string | undefined }>`
    padding: 8px;
    width: ${(props) => props.$columnWidth || 'auto'};
    border-bottom: 1px solid #f9f9f9;
    vertical-align: middle;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const ChipContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    flex-wrap: wrap;
    /* overflow-x: hidden; */
    gap: 5px;
    `;

const TableCellValue = styled.span<{ $color: { background: string, color: string } }>`
    color: ${({ $color }): string => $color.color};
    .highlight {
        background-color: ${theme.colors.primary};
        color: white;
    }
    span{
        color: ${theme.colors.primary};
    }
`;
