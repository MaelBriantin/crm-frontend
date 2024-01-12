import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../assets/themes/index.ts';
import { isEmpty } from '../utils/helpers/spells.ts';
import { Loader } from '../components/global/Loader.tsx';

type Sector = {
    id: number;
    name: string;
    postcodes: string[];
};

export const SectorPage: React.FC = () => {
    const [sectors, setSectors] = useState<Sector[]>([]);

    return (
        <Container>
            {isEmpty(sectors) && <Loader />}
            {!isEmpty(sectors) &&
                <div>
                    <Welcome>Secteurs</Welcome>
                </div>
            }
        </Container>
    );
};

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
`

const Welcome = styled.div`
    font-size: ${theme.fonts.size.P4};
    font-family: ${theme.fonts.family.dancing};
`

