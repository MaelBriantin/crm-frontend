import React from "react";
import styled from "styled-components";
import { theme } from "../../assets/themes";
import { VscPass } from "react-icons/vsc";

type ListProps<T extends Record<string, unknown>> = {
  data: T[];
  attributeList: { label: string; key: keyof T }[];
  multiple?: boolean;
  selected?: number[];
  selectKey: string;
  setSelected: React.Dispatch<React.SetStateAction<number[]>>;
};

export const List = <T extends Record<string, unknown>>({
  data,
  attributeList,
  multiple,
  selected = [],
  setSelected,
  selectKey,
}: ListProps<T>) => {
    const handleSelection = (index: number) => {
        console.log("index", index);
    if (selected.includes(index)) {
      setSelected(selected.filter((selectedIndex) => selectedIndex !== index));
    } else {
      if (!multiple) {
        setSelected([index]);
      } else {
        setSelected([...selected, index]);
      }
    }
  };

  return (
    <Container>
      {data.map((element, index) => (
        <ListElement
          key={index}
          data-index={index}
          onClick={() => handleSelection(element[selectKey] as number)}
          $selected={selected.includes(element[selectKey] as number) || false}
        >
          <AttributeList>
            {attributeList.map((attribute, index) => (
              <React.Fragment key={index}>
                <Attribute>{`${String(element[attribute.key])}`}</Attribute>
              </React.Fragment>
            ))}
          </AttributeList>
          {selected.includes(element[selectKey] as number) && (
            <SelectedAttribute>
              <VscPass />
            </SelectedAttribute>
          )}
        </ListElement>
      ))}
      <EmptyListElement />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ListElement = styled.div<{ $selected: boolean }>`
  height: ${theme.materialDesign.height.medium};
  width: calc(100% - 40px);
  border-top: 2px solid ${theme.colors.greyUltraLight};
  border-radius: ${theme.materialDesign.borderRadius.default};
  transition: all 0.25s;
  opacity: ${({ $selected }): number => ($selected ? 1 : 0.8)};
  display: grid;
  grid-template-columns: 8fr 2fr;
  align-items: center;
  gap: 5px;
  padding: 0 20px;
  background: ${({ $selected }): string =>
    $selected ? theme.colors.greyUltraLight : "white"};
  color: ${({ $selected }): string =>
    $selected ? theme.colors.primary : "inherit"};
  &:hover {
    background-color: ${theme.colors.greyUltraLight};
    opacity: 1;
    cursor: pointer;
  }
`;

const Attribute = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: ${theme.fonts.size.P1};
`;

const SelectedAttribute = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: ${theme.fonts.size.P1};
  color: ${theme.colors.primary};
`;

const AttributeList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  align-items: center;
  width: 100%;
`;

const EmptyListElement = styled.div`
  height: ${theme.materialDesign.height.medium};
  width: calc(100% - 40px);
  border-top: 2px solid ${theme.colors.greyUltraLight};
  border-radius: ${theme.materialDesign.borderRadius.default};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  background: white;
  color: ${theme.colors.greyDark};
`;
