import React, { ChangeEvent, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Input } from '../global/Input';
import { RowDataType, DataTableSearchProps, RowDataValueTypes } from '../../types/DataTableTypes';
import { wildcardSearch } from '../../utils/searchUtils';
import { VscSearch } from "react-icons/vsc";
import { theme } from '../../assets/themes';

export const DataTableSearch = <T extends RowDataType>({ data, onSearch, searchedValue, columns, clearable = true }: DataTableSearchProps<T>): React.ReactElement => {

    const [search, setSearch] = useState<string | number>('');
    const isWildcardSearch = String(search).charAt(0) === '*';

    useEffect(() => {
        const searchMethod: T[] = data.filter((row: RowDataType) => {
            return Object.entries(row).some(([key, value]: [string, RowDataValueTypes]) => {
                const column = columns && columns.find((column) => column.value === key);
                const columnText = column ? column.text : '';
                return wildcardSearch(search, value, columnText);
            });
        });
    
        onSearch(searchMethod as T[]);
        searchedValue(search);
    }, [search, data, onSearch, searchedValue, columns]);

    return (
        <SearchbarContainer>
            <Input
                textColor='black'
                placeholder="Rechercher"
                clearable={clearable}
                width={400}
                value={search}
                onInput={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                icon={<VscSearch />}
            />
            {/* {(search && clearable) && <ClearButton onClick={() => setSearch('')}><VscChromeClose /></ClearButton>} */}
            {isWildcardSearch && <AdvancedSearch>Recherche avancée</AdvancedSearch>}
        </SearchbarContainer>
    );

};

const SearchbarContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    width: 100%;
    span {
        color: ${theme.colors.primary};
    }
`;

// const ClearButton = styled.div`
//     cursor: pointer;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     width: 20px;
//     height: 20px;
//     border-radius: 50%;
//     background-color: ${theme.colors.greyLight};
//     transition: all 250ms;
//     &:hover {
//         background-color: ${theme.colors.error};
//         color: ${theme.colors.white};
//     }
// `;

const AdvancedSearch = styled.span`
    color: ${theme.colors.primary};
    font-size: ${theme.fonts.size.P0};
    font-weight: bold;
`;