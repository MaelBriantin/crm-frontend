import {OrderedProductType} from "../../types/OrderTypes.ts";
import React from "react";
import {getValue} from "../../utils/helpers/spells.ts";
import {theme} from "../../assets/themes";
import styled from "styled-components";

type ProductDetailTableProps = {
    orderedProductsList: OrderedProductType[];
}

export const ProductDetailTable: React.FC<ProductDetailTableProps> = ({orderedProductsList}) => {

    orderedProductsList.map((product) => {
        const vat_total = parseFloat((Number(product.vat_price) * product.ordered_quantity).toFixed(2))
        const no_vat_total =  parseFloat((Number(product.no_vat_price) * product.ordered_quantity).toFixed(2));
        Object.assign(product, {
            unite_price: `${product.no_vat_price}/${product.vat_price} €`,
            total_price: `${no_vat_total}/${vat_total} €`,
        });
        const displayName = product.product_type === "clothes" ? `${product.product_name} - ${product?.product_size?.size}` : product.product.name;
        Object.assign(product, {
            displayName: displayName,
        });
    });

    const columns = [
        {
            label: "Référence",
            value: "product_reference",
        },
        {
            label: "Nom",
            value: "displayName",
        },
        {
            label: "Quantité",
            value: "ordered_quantity",
        },
        {
            label: "Prix HT/TTC",
            value: "unite_price",
        },
        {
            label: "Total HT/TTC",
            value: "total_price",
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
    padding-right: 10px;
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
    outline: 1px solid ${theme.colors.greyLight};
`;

const Header = styled.thead`
    background-color: ${theme.colors.greyLight};
`;

const Body = styled.tbody``;

const Row = styled.tr`
    display: flex;
    justify-content: space-between;
    border-top: 1px solid ${theme.colors.greyLight};
    width: 100%;
    overflow: hidden;
`;

const Col = styled.td`
    display: flex;
    padding: 5px 0;
    justify-content: center;
    align-items: center;
    width: 125px;
    color: ${theme.colors.dark};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;



