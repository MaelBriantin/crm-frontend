import React from 'react';
import styled from 'styled-components';
import { Chip } from './Chip.tsx';

type DataTableCellProps = {
    row: any;
    column: any;
    columnIndex: number;
};

type TableCellProps = {
    even?: boolean;
};

export const DataTableCell: React.FC<DataTableCellProps> = ({ row, column, columnIndex }) => {
    return (
        <TableCell key={columnIndex}>
            {Array.isArray(row[column.value]) ? (
                column.type === 'chips'
                    ? (<ChipContainer>
                        {row[column.value].map((item: string, index: number) => (
                            <Chip
                                key={index}
                                text={item}
                                color={{ background: '#DDD', text: 'black' }}
                            />
                        ))}
                    </ChipContainer>
                    )
                    : (row[column.value].join(' / '))
            ) : (
                row[column.value]
            )}
        </TableCell>
    );
}

const TableCell = styled.td<TableCellProps>`
    padding: 8px;
    min-width: 50px;
    border-bottom: 1px solid #f5f5f5;
`;

const ChipContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 5px;
`;
