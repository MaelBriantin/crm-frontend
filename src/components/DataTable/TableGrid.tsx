import React from 'react';
import styled from 'styled-components';

type TableProps = {
    data: { [key: string]: unknown }[];
}


export const TableGrid: React.FC<TableProps> = ({ data }) => {
    const columns = Object.keys(data[0]);

    return (
        <GridTable>
            <GridRow>
                {columns.map((column, index) => (
                    <GridCell key={index}>
                        {column}
                    </GridCell>
                ))}
            </GridRow>

            {data.map((row, rowIndex) => (
                <GridRow key={rowIndex}>
                    {columns.map((column, columnIndex) => (
                        <GridCell key={columnIndex}>
                            {row[column] as React.ReactNode}
                        </GridCell>
                    ))}
                </GridRow>
            ))}
        </GridTable>
    );
};

const GridTable = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
`;

const GridRow = styled.div`
    display: contents;
`;

const GridCell = styled.div`
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
`;