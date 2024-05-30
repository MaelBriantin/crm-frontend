import {OrderedProductType} from "../../types/OrderTypes.ts";
import React from "react";
import {getValue} from "../../utils/helpers/spells.ts";
import {theme} from "../../assets/themes";
import styled from "styled-components";

type ProductDetailTableProps = {
    orderedProductsList: OrderedProductType[];
}

export const ProductDetailTable: React.FC<ProductDetailTableProps> = ({orderedProductsList}) => {

    const columns = [
        {
            label: "Référence",
            value: "product_reference",
        },
        {
            label: "Nom",
            value: "product.name",
        },
        {
            label: "Taille",
            value: "product_size.size",
        },
        {
            label: "Quantité",
            value: "ordered_quantity",
        },
        {
            label: "Prix HT",
            value: "no_vat_price",
        },
        {
            label: "Prix TTC",
            value: "vat_price",
        },
    ];

    return (
        <Container>
            <Label>
                Liste des produits
            </Label>
            <SimpleTable>
                <Header>
                    <Row>
                        {columns.map((column, index) => (
                            <Col key={index}>{column.label}</Col>
                        ))}
                    </Row>
                </Header>
                <Body>
                    {orderedProductsList.map((product, index) => (
                        <Row key={index}>
                            {columns.map((column, index) => {
                                return (
                                    <Col key={index}>{getValue(product, column.value)}</Col>
                                )
                            })}
                        </Row>
                    ))}
                </Body>
            </SimpleTable>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 10px;
    padding: 20px;
`;

const Label = styled.div`
    color: ${theme.colors.greyMedium};
    font-weight: ${theme.fonts.weights.bold};
    font-size: ${theme.fonts.size.P0};
`;

const SimpleTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    border-radius: ${theme.materialDesign.borderRadius.rounded};
`;

const Header = styled.thead`
    background-color: ${theme.colors.greyLight};
`;

const Body = styled.tbody``;

const Row = styled.tr`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid ${theme.colors.greyLight};
`;

const Col = styled.td`
    display: flex;
    padding: 5px 0;
    justify-content: center;
    align-items: center;
    width: 100px;
    color: ${theme.colors.greyDark};
`;



