import React, { ChangeEvent, useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { Input } from '../global/Input';
import { RowDataType, DataTableSearchProps } from '../../types/DataTableTypes';
import { advancedFilter } from '../../utils/searchUtils';
import { VscSearch } from "react-icons/vsc";
import { theme } from '../../assets/themes';
import { Dropdown } from '../global/Dropdown';
import { Switch } from '../global/Switch';
import { DropdownValueType } from '../global/Dropdown';

export const DataTableSearch = <T extends RowDataType>({ data, onSearch, searchedValue, columns, clearable = true, advancedSearch = false }: DataTableSearchProps<T>): React.ReactElement => {

    const [search, setSearch] = useState<string>('');
    const [activeAdvancedSearch, setActiveAdvancedSearch] = React.useState<boolean>(false);
    const [searchedColumn, setSearchedColumn] = useState<string>('');
    const [searchedOperator, setSearchedOperator] = useState<string>('');
    const [startAnimation, setStartAnimation] = useState<boolean>(false);

    useEffect(() => {
        onSearch(advancedFilter(data, searchedColumn, searchedOperator, search, columns) as T[]);
        searchedValue(searchedOperator === '' ? search : ' ');
    }, [search, data, onSearch, searchedValue, columns, searchedColumn, searchedOperator]);

    const enableAdvancedSearch = () => {
        setSearchedColumn('');
        setSearchedOperator('');
        setStartAnimation(true);
        setTimeout(() => {
            setActiveAdvancedSearch(!activeAdvancedSearch);
            setStartAnimation(false);
        }, 250);
    }

    const operatorFilter = [
        { value: '', label: 'Contenu' },
        { value: '=', label: 'Égal' },
        { value: '<', label: 'Inférieur' },
        { value: '>', label: 'Supérieur' },
    ]
    const columnFilter = columns.map((column) => { return { value: column.value, label: column.text } });
    columnFilter.unshift({ value: '', label: 'Tout' });
    columnFilter.map((column) => {
        column.label = `Dans ${column.label}`;
        return column;
    });

    return (
        <SearchbarContainer>
            <Input
                textColor={`${theme.colors.dark}`}
                placeholder="Rechercher"
                clearable={clearable}
                width={'400px'}
                value={search}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                icon={<VscSearch />}
            />
            {advancedSearch &&
                <Switch
                    vertical
                    variant='small'
                    onChange={enableAdvancedSearch}
                />}
            <AdvancedSearchContainer $activeAdvancedSearch={activeAdvancedSearch} $startAnimation={startAnimation}>
                {/* {activeAdvancedSearch && <span className='label'>Condition :</span>} */}
                {activeAdvancedSearch &&
                    <Dropdown
                        variant='regular'
                        options={operatorFilter}
                        width={125}
                        onChange={(e: DropdownValueType) => setSearchedOperator((String(e.value)))}
                    />}
                {/* {activeAdvancedSearch && <span className='label'>Colonne :</span>} */}
                {activeAdvancedSearch &&
                    <Dropdown
                        variant='regular'
                        options={columnFilter}
                        defaultValue={columnFilter[0]}
                        width={225}
                        onChange={(e: DropdownValueType) => setSearchedColumn((String(e.value)))}
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

const fromDownToUp = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 0;
    position: relative;
    z-index: -99999;
  }
  75% {
    transform: translateY(-15%);
    opacity: 1;
    position: inherit;
    z-index: inherit;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
    position: inherit;
    z-index: inherit;
  }
`;

const fromUpToDown = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
    position: inherit;
    z-index: inherit;
  }
  25% {
    transform: translateY(-15%);
    opacity: 1;
    position: inherit;
    z-index: inherit;
  }
  100% {
    transform: translateY(100%);
    opacity: 0;
    position: relative;
    z-index: -99999;
  }
`;


const AdvancedSearchContainer = styled.div<{ $activeAdvancedSearch: boolean, $startAnimation: boolean }>`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    transition: all 250ms;
    animation: ${({ $activeAdvancedSearch }) => $activeAdvancedSearch && css`${fromDownToUp} 0.4s`};
    animation: ${({ $activeAdvancedSearch, $startAnimation }) => $activeAdvancedSearch && $startAnimation && css`${fromUpToDown} 0.4s`};
    .label {
        color: ${theme.colors.dark};
    }
`;
