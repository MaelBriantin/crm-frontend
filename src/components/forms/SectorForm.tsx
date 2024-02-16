import styled from 'styled-components';
import { Input } from '../global';
import { useState, ChangeEvent } from 'react';
import { Button, Chip } from '../global';
import { useModal } from '../../contexts';
import { VscAdd, VscClose } from "react-icons/vsc";
import { theme } from '../../assets/themes';
import { createSector } from '../../services/api/sectors';
import { PostcodeType, SectorType } from '../../types/SectorTypes';

export const SectorForm = () => {
    const [sectorName, setSectorName] = useState('');
    const [postcode, setPostcode] = useState({ postcode: '', city: '' });
    const [allPostcodes, setAllPostcodes] = useState<PostcodeType[]>([]);
    const [loading, setLoading] = useState(false);

    const { closeModal } = useModal();

    const handleSave = () => {
        if (sectorName !== '' && allPostcodes.length > 0) {
            setLoading(true);
            closeModal();
            createSector({name: sectorName, postcodes: allPostcodes} as SectorType);
            setLoading(false);
        }
    }

    
    const handleAddPostcode = (e: React.FormEvent) => {
        e.preventDefault();
        if(postcode.postcode !== '' && postcode.city !== '') {
            const newPostcode: PostcodeType = {postcode: postcode.postcode, city: postcode.city};
            if (allPostcodes.find(e => e.postcode === newPostcode.postcode)) {
                return;
            }
            setAllPostcodes(prevPostcodes => [...prevPostcodes, newPostcode]);
            setPostcode({postcode: '', city: ''});
        }   
    }
    
    const removeFromPostcodes = (postcode: string) => {
        setAllPostcodes(prevPostcodes => prevPostcodes.filter(e => e.postcode !== postcode));
    }
    
    const disableSave = sectorName === '' || allPostcodes.length === 0;

    return (
        <Form>
            <InputSection>
                <Input
                    type='text'
                    placeholder='Nom du secteur'
                    width='300px'
                    value={sectorName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSectorName(e.target.value)}
                />
                <CityForm noValidate onSubmit={handleAddPostcode}>
                    <Input
                        type='number'
                        noNegativeNumber
                        maxLength={5}
                        placeholder='Code postal'
                        width='125px'
                        value={postcode.postcode}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPostcode({ ...postcode, postcode: e.target.value })}
                    />
                    <Input
                        type='text'
                        placeholder='Ville'
                        width='225px'
                        value={postcode.city}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPostcode({ ...postcode, city: e.target.value })}
                    />  
                    <Button onClick={handleAddPostcode} icon={<VscAdd />} />
                </CityForm>
                <ChipContainer>
                    {allPostcodes.map((e) => (
                        <Chip 
                            key={e.postcode} 
                            endIcon={<VscClose />} 
                            iconColor={theme.colors.error} 
                            text={`${e.postcode} - ${e.city}`}
                            onClickOnIcon={() => removeFromPostcodes(e.postcode)}
                        />
                    ))}
                </ChipContainer>
                {/* <PostcodesDisplay>

                </PostcodesDisplay> */}
            </InputSection>
            <SaveAction>
                <Button disabled={disableSave} loading={loading} value='enregistrer' onClick={handleSave} />
            </SaveAction>
        </Form >
    );
};

const Form = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    /* height: 400px;
    width: 400px; */
    gap: 20px;
`;

const InputSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 20px;
    height: 100%;
    width: 100%;
`;

const CityForm = styled.form`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    width: 100%;
`;

const SaveAction = styled.div`
    width: 100%;
    height: 10%;
    display: flex;
    // margin-top: 10px;
    justify-content: flex-end;
    align-items: flex-end;
`;

const ChipContainer = styled.div`
    border: 2px solid ${theme.colors.greyLight};
    border-radius: ${theme.materialDesign.borderRadius.rounded};
    padding: 10px;
    min-height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 10px;
    width: 480px;
`;