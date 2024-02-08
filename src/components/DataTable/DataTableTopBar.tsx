import styled from "styled-components";
import { DataTableSearch } from "./DataTableSearch";
import { ColumnProps, RowDataType } from "../../types/DataTableTypes";
import { SetStateAction } from "react";
import { Dispatch } from "react";
import { Button } from "../global/Button";
import { LiaMapMarkedAltSolid } from "react-icons/lia";

type DataTableTopBarProps<T> = {
    withSearch?: boolean;
    withAdvancedSearch?: boolean;
    setSearchedValue: Dispatch<SetStateAction<string | number>>;
    data: T[];
    columns: ColumnProps[];
    onSearch: Dispatch<SetStateAction<T[]>>;
    onClick: () => void;
};

export const DataTableTopBar = <T extends RowDataType>({ withSearch = false, withAdvancedSearch = false, setSearchedValue, data, columns, onSearch, onClick }: DataTableTopBarProps<T>): React.ReactElement => {
    return (
        <Container $withSearch={withSearch}>
            {(withSearch || withAdvancedSearch) &&
                <DataTableSearch
                    advancedSearch={withAdvancedSearch}
                    searchedValue={setSearchedValue}
                    data={data as T[]}
                    columns={columns}
                    onSearch={onSearch}
                />}
            <Button
                variant='regular'
                onClick={onClick}
                icon={<LiaMapMarkedAltSolid />}
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