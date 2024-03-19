import React from 'react';
import styled from 'styled-components';
import { Chip } from '../global/Chip.tsx';
import { filterOut } from '../../utils/helpers/spells.ts';
import { DataTableCellProps, dataTableTypeList } from '../../types/DataTableTypes.ts';
import { getRowValueAndHighlight } from '../../utils/dataTableUtils.ts';
import { theme } from '../../assets/themes/index.ts';

export const DataTableCell: React.FC<DataTableCellProps> = ({ 
        row, 
        column, 
        columnWidth, 
        columnMaxWidth, 
        columnIndex, 
        color, 
        searchedValue, 
        arrayLimit = 4, 
        isHovered,
        align }) => {

    const { rowValue, highlight } = getRowValueAndHighlight(searchedValue, row[column.value], arrayLimit);
    return (
        <TableCell 
            key={columnIndex} 
            $columnWidth={columnWidth} 
            $columnMaxWidth={columnMaxWidth}
            $align={align}
            >
            {(column.type === 'rowActions') && (
                <RowActions $isHovered={isHovered}>
                    {column.actions?.map((action, index) => (
                        <RowActionIcon $color={action.color} key={index} onClick={() => action.onClick(row)}>
                            {action.icon}
                        </RowActionIcon>
                    ))}
                </RowActions>
            )}
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

const RowActions = styled.div<{$isHovered: boolean | undefined}>`
    transition: opacity 250ms;
    opacity: ${({ $isHovered }): string => $isHovered ? '1' : '0'};
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 6px;
    align-items: center;
    width: 100%;
    height: 100%;
    color: ${theme.colors.greyDark};
`;

const RowActionIcon = styled.div<{$color: string | undefined}>`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${theme.fonts.size.P1};
    cursor: pointer;
    transition: all 250ms;
    &:hover {
        // transform: scale(1.2);
        color: ${({ $color }): string => $color || theme.colors.greyDark}
    }
`;


const TableCell = styled.td<{ $columnWidth: string | undefined, $columnMaxWidth: string | undefined, $align: string | undefined }>`
    padding: 8px;
    width: ${(props) => props.$columnWidth || 'auto'};
    max-width: ${(props) => props.$columnMaxWidth || 'auto'};
    border-bottom: 1px solid #f9f9f9;
    text-align: ${(props) => props.$align ? props.$align : 'left'};
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
        font-weight: bold;
        color: ${theme.colors.primary};
    }
`;
