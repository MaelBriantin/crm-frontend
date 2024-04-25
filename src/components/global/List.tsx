import React from "react";
import styled from "styled-components";
import { theme } from "../../assets/themes";
import { VscPass } from "react-icons/vsc";

type ListProps<T extends Record<string, unknown>> = {
  data: T[];
  attributeList: { label: string; key: keyof T }[];
  multiple?: boolean;
  onSelect?: (selected: T) => void;
};

export const List = <T extends Record<string, unknown>>({
  data,
  attributeList,
  multiple,
}: ListProps<T>) => {
  const [selected, setSelected] = React.useState<number[]>([]);

  const handleSelection = (event: React.MouseEvent<HTMLDivElement>) => {
    const index = Number(event.currentTarget.dataset.index);
    if (selected.includes(index)) {
      const newSelected = selected.filter(
        (selectedIndex) => selectedIndex !== index
      );
      setSelected(newSelected);
    } else {
      if (!multiple) {
        setSelected([index]);
      } else {
        setSelected((prevSelected) => [...prevSelected, index]);
      }
    }
  };

  return (
    <Container>
      {data.map((element, index) => (
        <ListElement
          key={index}
          data-index={index}
          onClick={handleSelection}
          $selected={selected.includes(index) || false}
        >
          <AttributeList>
            {attributeList.map((attribute, index) => (
              <React.Fragment key={index}>
                <Attribute>{`${String(element[attribute.key])}`}</Attribute>
              </React.Fragment>
            ))}
          </AttributeList>
          {selected.includes(index) && (
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
  width: calc(95% - 40px);
  border-top: 2px solid ${theme.colors.greyUltraLight};
  border-radius: ${theme.materialDesign.borderRadius.default};
  transition: all 0.25s;
  opacity: ${({ $selected }): number => ($selected ? 1 : 0.8)};
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  justify-content: center;
  font-size: ${theme.fonts.size.P1};
`;

const SelectedAttribute = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${theme.fonts.size.P1};
  color: ${theme.colors.primary};
`;

const AttributeList = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 100px;
  width: 100%;
`;

const EmptyListElement = styled.div`
  height: ${theme.materialDesign.height.medium};
  width: calc(95% - 40px);
  border-top: 2px solid ${theme.colors.greyUltraLight};
  border-radius: ${theme.materialDesign.borderRadius.default};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  background: white;
  color: ${theme.colors.greyDark};
`;
