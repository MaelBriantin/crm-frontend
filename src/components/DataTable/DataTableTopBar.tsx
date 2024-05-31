import styled from "styled-components";
import { DataTableSearch } from "./DataTableSearch";
import { ColumnProps, RowDataType } from "../../types/DataTableTypes";
import React, { SetStateAction } from "react";
import { Dispatch } from "react";
import { Button } from "../global";

type DataTableTopBarProps<T> = {
    withSearch?: boolean;
    withAdvancedSearch?: boolean;
    setSearchedValue: Dispatch<SetStateAction<string | number>>;
    data: T[];
    columns: ColumnProps[];
    onSearch: Dispatch<SetStateAction<T[]>>;
    onClick: () => void;
    icon?: React.ReactElement | null;
    buttonValue?: string;
    isAdvancedSearchEnabled: Dispatch<SetStateAction<boolean>>;
};

export const DataTableTopBar = <T extends RowDataType>({ withSearch = false, withAdvancedSearch = false, setSearchedValue, data, columns, onSearch, onClick, icon, buttonValue, isAdvancedSearchEnabled }: DataTableTopBarProps<T>): React.ReactElement => {
    return (
        <Container $withSearch={withSearch}>
            {(withSearch || withAdvancedSearch) &&
                <DataTableSearch
                    isAdvancedSearchEnabled={isAdvancedSearchEnabled}
                    advancedSearch={withAdvancedSearch}
                    searchedValue={setSearchedValue}
                    data={data as T[]}
                    columns={columns}
                    onSearch={onSearch}
                />}
            <Button
                variant='regular'
                onClick={onClick}
                bigIcon
                icon={icon || null}
                value={buttonValue || ''}
            />
        </Container>
    );
};

const Container = styled.div<{ $withSearch: boolean }>`
    display: flex;
    justify-content: ${({ $withSearch }) => $withSearch ? 'space-between' : 'flex-end'};
    align-items: center;
    padding: 10px 0;
    margin-bottom: 10px;
`;