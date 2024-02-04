import React, { ChangeEvent, useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Input } from '../global/Input';
import { RowDataType, DataTableSearchProps, RowDataValueTypes } from '../../types/DataTableTypes';
import { wildcardSearch } from '../../utils/searchUtils';
import { VscSearch } from "react-icons/vsc";
import { theme } from '../../assets/themes';
import { Dropdown } from '../global/Dropdown';
import { Switch } from '../global/Switch';

export const DataTableSearch = <T extends RowDataType>({ data, onSearch, searchedValue, columns, clearable = true, advancedSearch = false }: DataTableSearchProps<T>): React.ReactElement => {

    const [search, setSearch] = useState<string | number>('');
    const [activeAdvancedSearch, setActiveAdvancedSearch] = React.useState<boolean>(false);

    // const isWildcardSearch = String(search).charAt(0) === '*';

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

    const columnFilter = columns.map((column) => { return { value: column.value, label: column.text } });
    columnFilter.unshift({ value: '', label: 'Tout' });

    return (
        <SearchbarContainer>
            {advancedSearch &&
                <Switch
                    vertical
                    variant='small'
                    onChange={() => setActiveAdvancedSearch(!activeAdvancedSearch)}
                />}
            <AdvancedSearchContainer $activeAdvancedSearch={activeAdvancedSearch}>
                {activeAdvancedSearch &&
                    <Dropdown
                        variant='regular'
                        options={[
                            { value: '', label: 'Contient' },
                            { value: '=', label: 'Égal à' },
                            { value: '<', label: 'Supérieur à' },
                            { value: '>', label: 'Inférieur à' },
                        ]}
                        width={100}
                        handleSelectChange={() => { }}
                        label='Opérateur'
                    />}
                <Input
                    textColor='black'
                    placeholder="Rechercher"
                    clearable={clearable}
                    width={400}
                    value={search}
                    onInput={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                    icon={<VscSearch />}
                />
                {/* {activeAdvancedSearch && <div>dans :</div>} */}
                {activeAdvancedSearch &&
                    <Dropdown
                        variant='regular'
                        options={columnFilter}
                        defaultValue={columnFilter[0]}
                        width={200}
                        handleSelectChange={() => { }}
                    />}
            </AdvancedSearchContainer>
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

const SlideDownAndUp = keyframes`
  0%, 100% {
    transform: translateY(0);
    opacity: 1;
    position: inherit;
    z-index: inherit;
  }
  25%, 75% {
    transform: translateY(75%);
    opacity: 0;
    position: relative;
    z-index: -99999;
  }
  50% {
    transform: translateY(100%);
    opacity: 0;
    position: relative;
    z-index: -99999;
  }
`;


const AdvancedSearchContainer = styled.div<{ $activeAdvancedSearch: boolean }>`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    width: 100%;
    transition: all 250ms;
    /* animation-delay: 0.5s;
    animation: ${({$activeAdvancedSearch}) => $activeAdvancedSearch ? css`${SlideDownAndUp} 0.5s` : 'none'}; */
`;