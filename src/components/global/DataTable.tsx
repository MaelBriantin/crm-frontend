import React from 'react';
import { styled, css, RuleSet } from 'styled-components';
import { theme } from '../../assets/themes';

type DataTableProps<T> = {
    data: T[];
    columns: ColumnProps[];
    selectable?: boolean;
};

type ColumnProps = {
    text: string;
    value: string;
};

type TableRowProps = {
    even?: boolean;
};

type TableCellProps = {
    even?: boolean;
};

export const DataTable: React.FC<DataTableProps<any>> = ({ data, columns, selectable = false }) => {
    return (
        <Container>
            <Table>
                <thead>
                    <TableRowHeader>
                        {columns.map((column, index) => (
                            <TableHeader key={index}>{column.text}</TableHeader>
                        ))}
                    </TableRowHeader>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <TableRowBody key={rowIndex} $selectable={selectable}>
                            {columns.map((column, columnIndex) => (
                                <TableCell key={columnIndex}>
                                    {Array.isArray(row[column.value])
                                        ? row[column.value].join(", ")
                                        : row[column.value]}
                                </TableCell>
                            ))}
                        </TableRowBody>
                    ))}
                </tbody>
            </Table>
        </Container>

    );
};

const Container = styled.div`
    width: 100%;
    height: 100%;
    overflow: auto;
`;

const Table = styled.table`
    width: 100%;
    margin: auto;
    border-collapse: collapse;
    border-radius: ${theme.materialDesign.borderRadius.rounded};
    overflow: auto;
`;

const TableHeader = styled.th`
    padding: 8px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    text-align: left;
    position: sticky;
    top: 0;
    z-index: 1;
`;

const TableRow = styled.tr<TableRowProps>`
    transition: all 250ms;
    &:nth-child(even) {
        background-color: #f5f5f5;
    }
`;

const TableRowBody = styled(TableRow) <{ $selectable: boolean }>`
    ${({ $selectable }): false | RuleSet<object> =>
        $selectable &&
        css`
            &:hover {
                color: ${theme.colors.white};
                background-color: ${theme.colors.primary};
                cursor: pointer;
            }
        `}
`;

const TableRowHeader = styled(TableRow)`
    font-family: ${theme.fonts.family.dancing};
    font-size: ${theme.fonts.size.P2};
`;

const TableCell = styled.td<TableCellProps>`
    padding: 8px;
    min-width: 50px;
    border-bottom: 1px solid #f5f5f5;
`;
