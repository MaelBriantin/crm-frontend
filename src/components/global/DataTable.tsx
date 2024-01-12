import React from 'react';
import { styled, css, RuleSet } from 'styled-components';
import { theme } from '../../assets/themes';
import { sortBy } from '../../utils/helpers/spells';
import { VscChevronDown, VscBlank } from "react-icons/vsc";
import { Chip } from './Chip';

type DataTableProps<T> = {
    data: T[];
    columns: ColumnProps[];
    selectable?: boolean;
    chips?: boolean;
};

type ColumnProps = {
    text: string;
    value: string;
    sortable: boolean;
};

type TableRowProps = {
    even?: boolean;
};

type TableCellProps = {
    even?: boolean;
};

export const DataTable: React.FC<DataTableProps<any>> = ({ data, columns, selectable = false }) => {

    const [sort, setSort] = React.useState<string | null>(null);
    const [sortDirection, setSortDirection] = React.useState<boolean>(true);
    const [hoveredRow, setHoveredRow] = React.useState<number | null>(null);

    const sortedData = sortBy(data, sort, sortDirection);

    const handleSort = (column: ColumnProps) => {
        if (column.sortable) {
            if (sort === column.value) {
                setSortDirection(!sortDirection);
            } else {
                setSortDirection(true);
                setSort(column.value);
            }
        }
    };
    return (
        <Container>
            <Table>
                <thead>
                    <TableRowHeader>
                        {columns.map((column, index) => (
                            <TableHeader key={index}
                                onClick={() => handleSort(column)}
                                $sort={sort === column.value}
                                $sortable={column.sortable}
                            >
                                <ColumnTitle $sort={sort === column.value} $sortDirection={sortDirection}>
                                    <span className={'columnTitle'}>{column.text}</span>
                                    <span className={'sortIcon'}>
                                        {(column.sortable && column.value) === sort
                                            ? <VscChevronDown />
                                            : <VscBlank />}
                                    </span>
                                </ColumnTitle>
                            </TableHeader>
                        ))}
                    </TableRowHeader>
                </thead>
                <tbody>
                    {sortedData.map((row, rowIndex) => (
                        <TableRowBody key={rowIndex} $selectable={selectable} onMouseEnter={() => setHoveredRow(rowIndex)} onMouseLeave={() => setHoveredRow(null)} >
                            {columns.map((column, columnIndex) => (
                                <TableCell key={columnIndex}>
                                    {
                                        Array.isArray(row[column.value])
                                            ?
                                            <ChipContainer>
                                                {row[column.value].map((item: string, index: number) => (
                                                    <Chip
                                                        key={index} text={item}
                                                        color={rowIndex === hoveredRow 
                                                            ? { background: theme.colors.white, text: theme.colors.primary } 
                                                            : { background: theme.colors.primary, text: theme.colors.white }
                                                        }
                                                        // color={{ background: theme.colors.greyLight, text: 'black'}}
                                                    />
                                                ))}
                                            </ChipContainer>
                                            : row[column.value]
                                    }
                                </TableCell>
                            ))}
                        </TableRowBody>
                    ))}
                </tbody>
            </Table>
        </Container>

    );
};

const ChipContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 5px;
`;

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

const TableHeader = styled.th<{ $sort: boolean, $sortable: boolean }>`
    padding: 8px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    text-align: left;
    position: sticky;
    top: 0;
    z-index: 1;
    user-select: none;
    cursor: default;
    ${({ $sortable }): false | RuleSet<object> => $sortable && css`
        &:hover {
            background-color: ${theme.colors.white};
            cursor: pointer;
            box-shadow: inset ${theme.shadows.default};
        }
    `}
`;

const ColumnTitle = styled.div<{ $sort: boolean, $sortDirection: boolean }>`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;
    .sortIcon{
        ${({ $sort }): false | RuleSet<object> => $sort && css`color: ${theme.colors.primary};`}
        font-size: ${theme.fonts.size.P0};
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        margin: 0;
        padding: 0;
        ${({ $sortDirection }): false | RuleSet<object> => $sortDirection && css`transform: rotate(180deg);`}
    }
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
