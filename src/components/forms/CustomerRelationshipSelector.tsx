import React, { HTMLAttributes } from 'react';
import { CustomerType, RelationshipType } from '../../types/CustomerTypes';
import { WiDaySunny, WiDaySunnyOvercast, WiDayRain, WiThunderstorm } from "react-icons/wi";
import { theme } from '../../assets/themes';
import styled from 'styled-components';

type CustomerRelationshipSelectorProps = {
    relationships: RelationshipType[];
    customer: CustomerType;
    setCustomer: React.Dispatch<React.SetStateAction<CustomerType>>;
}

type RelationshipIcon = {
    icon: JSX.Element;
    value: string;
    label: string;
};

type DivProps = HTMLAttributes<HTMLDivElement> & {
    $enabled?: boolean;
};

export const CustomerRelationshipSelector: React.FC<CustomerRelationshipSelectorProps> = ({ relationships, customer, setCustomer }) => {

    const relationshipIcons: RelationshipIcon[] = [];

    const handleRelationshipChange = (relationshipValue: RelationshipType['value']) => {
        if(customer.relationship?.value === relationshipValue) {
            setCustomer({ ...customer, relationship: null });
            return;
        }
        setCustomer({ ...customer, relationship: relationships.find((relationship) => relationship.value === relationshipValue) || null });
    }

    relationships.map((relationship) => {
        switch (relationship.value) {
            case 'sunny':
                relationshipIcons.push({ icon: <WiDaySunny />, value: relationship.value, label: relationship.label });
                break;
            case 'cloudy':
                relationshipIcons.push({ icon: <WiDaySunnyOvercast />, value: relationship.value, label: relationship.label });
                break;
            case 'rainy':
                relationshipIcons.push({ icon: <WiDayRain />, value: relationship.value, label: relationship.label });
                break;
            case 'stormy':
                relationshipIcons.push({ icon: <WiThunderstorm />, value: relationship.value, label: relationship.label });
                break;
            default:
                break;
        }
    });

    return (
        <RelationshipSelectorContainer>
            {relationshipIcons.map((relationship, index) => {
                return (
                    <RelationshipIcon
                        $enabled={customer.relationship?.value === relationship.value}
                        key={index}
                        onClick={() => handleRelationshipChange(relationship.value as RelationshipType['value'])}
                    >
                        {relationship.icon}
                    </RelationshipIcon>
                );
            })}
        </RelationshipSelectorContainer>
    );
}

const RelationshipSelectorContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 40px;
    width: 300px;
    height: 100%;
    font-size: ${theme.fonts.size.P3};
`;

const RelationshipIcon = styled.div<DivProps>`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    /* width: 40px;
    height: 40px; */
    /* border-radius: 50%; */
    color: ${({ $enabled }) => $enabled ? theme.colors.primary : theme.colors.greyDark};
    transform: ${({ $enabled }) => $enabled ? 'scale(1.5)' : 'scale(1)'};
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    &:hover {
        color: ${theme.colors.primary};
    }
`;