import React from 'react';
import styled, { css, RuleSet } from 'styled-components';
import { ColumnProps } from '../../types/DataTableTypes';
import { filterOut } from '../../utils/helpers/spells';
import { dataTableTypeList } from '../../types/DataTableTypes';
import { LiaSortAlphaUpSolid, LiaSortAlphaDownSolid, LiaSortNumericUpSolid, LiaSortNumericDownSolid } from "react-icons/lia";
import { VscBlank } from "react-icons/vsc";
import { theme } from '../../assets/themes';


type DataTableHeaderProps = {
    columns: ColumnProps[],
    sort: string | null,
    sortDirection: boolean,
    handleSort: (column: ColumnProps) => void
};

export const DataTableHeader: React.FC<DataTableHeaderProps> = ({ columns, sort, sortDirection, handleSort }) => {
    return (
        <thead>
            <TableRowHeader>
                {columns.map((column, index) => (
                    <TableHeader key={index}
                        onClick={() => handleSort(column)}
                        $sort={sort === column.value}
                        $sortable={column.sortable}
                    >
                        <ColumnTitle $sort={sort === column.value}>
                            <span className={'columnTitle'}>{column.text}</span>
                            {(column.sortable && column.value === sort) &&
                                (column.type && filterOut(['chips', 'link', 'text', 'boolean'], dataTableTypeList).includes(column.type)
                                    ? <span className={'sortIcon'}> {sortDirection ? <LiaSortNumericDownSolid /> : <LiaSortNumericUpSolid />} </span>
                                    : <span className={'sortIcon'}> {sortDirection ? <LiaSortAlphaDownSolid /> : <LiaSortAlphaUpSolid />} </span>)
                            }
                            {(column.sortable && column.value !== sort) &&
                                (column.type && filterOut(['chips', 'link', 'text', 'boolean'], dataTableTypeList).includes(column.type)
                                    ? <span className={'sortIndication'}><LiaSortNumericDownSolid /></span>
                                    : <span className={'sortIndication'}><LiaSortAlphaDownSolid /></span>)
                            }
                            {(!column.sortable && column.value !== sort) &&
                                <span className={'sortIndication'}><VscBlank /></span>
                            }
                        </ColumnTitle>
                    </TableHeader>
                ))}
            </TableRowHeader>
        </thead>
    );
};

const TableRowHeader = styled.tr`
transition: all 250ms;
    background-color: white;
    height: 40px;
    overflow: hidden;
    width: 100%;
    font-family: ${theme.fonts.family.dancing};
    font-size: ${theme.fonts.size.P2};
`;

const ColumnTitle = styled.div<{ $sort: boolean }>`
    display: flex;
    justify-content:flex-start;
    align-items: center;
    gap: 5px;
    min-width: 50px;
    .sortIcon{
        ${({ $sort }): false | RuleSet<object> => $sort && css`color: ${theme.colors.primary};`}
        font-size: ${theme.fonts.size.P1};
        transition: all 250ms;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        margin: 0;
        padding: 0;
    }
    .sortIndication{
        opacity: 0;
        font-size: ${theme.fonts.size.P1};
        transition: all 250ms;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        margin: 0;
        padding: 0;
        color: black;
    }
`;

const TableHeader = styled.th<{ $sort: boolean, $sortable: boolean }>`
    padding: 8px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #f9f9f9;
    text-align: left;
    vertical-align: middle;
    user-select: none;
    cursor: default;
    transition: all 250ms;
    ${({ $sortable }): false | RuleSet<object> => $sortable && css`
        &:hover {
            cursor: pointer;
            background: #f9f9f9;
        }
    `}
    &:hover .sortIndication{ 
        opacity: 0.5;
    }
`;