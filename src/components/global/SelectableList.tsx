import React from "react";
import styled from "styled-components";
import { theme } from "../../assets/themes";
import { VscPass } from "react-icons/vsc";
import { Loader } from "./Loader";

type SelectableListProps<T extends Record<string, unknown>> = {
  data: T[];
  attributeList: { label: string; key: keyof T; type?: "subtitle" | "title" }[];
  multiple?: boolean;
  selected?: number[];
  selectKey: string;
  setSelected: React.Dispatch<React.SetStateAction<number[]>>;
  loading: boolean;
};

export const SelectableList = <T extends Record<string, unknown>>({
  data,
  attributeList,
  multiple,
  selected = [],
  setSelected,
  selectKey,
  loading,
}: SelectableListProps<T>) => {
  const handleSelection = (index: number) => {
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

  const columnCount = attributeList.length + 1;

  return (
    <>
      {!loading && (
        <ListContainer>
          {data.map((element, index) => (
            <ListElement
              key={index}
              $isLastIndex={index === data.length - 1}
              $reducedData={data.length - 1 === index}
              data-index={index}
              onClick={() => handleSelection(element[selectKey] as number)}
              $selected={
                selected.includes(element[selectKey] as number) || false
              }
            >
              <AttributeList $columnCount={columnCount}>
                {attributeList.map((attribute, index) => (
                  <React.Fragment key={index}>
                    {attribute.type === null ||
                      (attribute.type !== "subtitle" && (
                        <Attribute>{`${
                          String(element[attribute.key]) || ""
                        }`}</Attribute>
                      ))}
                    {attribute.type === "subtitle" && (
                      <Attribute
                        style={{
                          fontSize: theme.fonts.size.P0,
                          color: theme.colors.greyMedium,
                          fontStyle: "italic",
                        }}
                      >
                        {`${String(element[attribute.key]) || ""}`}
                      </Attribute>
                    )}
                  </React.Fragment>
                ))}
              </AttributeList>
              <SelectedAttribute>
                {selected.includes(element[selectKey] as number) && <VscPass />}
              </SelectedAttribute>
            </ListElement>
          ))}
        </ListContainer>
      )}
      {loading && <Loader transparent />}
    </>
  );
};

const ListContainer = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid ${theme.colors.greyLight};
  border-radius: ${theme.materialDesign.borderRadius.rounded};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow: auto;
`;

const ListElement = styled.div<{
  $selected: boolean;
  $isLastIndex: boolean;
  $reducedData: boolean;
}>`
  /* min-height: ${theme.materialDesign.height.medium}; */
  /* max-height: ${theme.materialDesign.height.medium}; */
  width: calc(100% - 38px);
  border-bottom: 1px solid ${theme.colors.greyLight};
  transition: all 0.25s;
  opacity: ${({ $selected }): number => ($selected ? 1 : 0.8)};
  display: flex;
  align-items: center;
  padding: 4px 18px;
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
  height: ${theme.materialDesign.height.medium};
  font-size: ${theme.fonts.size.P1};
`;

const SelectedAttribute = styled.div`
  display: flex;
  align-items: center;
  justify-self: end;
  width: 2%;
  font-size: ${theme.fonts.size.P1};
  color: ${theme.colors.primary};
`;

const AttributeList = styled.div<{ $columnCount: number }>`
  display: grid;
  grid-template-columns: ${({ $columnCount }): string =>
    `repeat(${$columnCount}, 1fr) auto`};
  align-items: center;
  width: 98%;
`;
