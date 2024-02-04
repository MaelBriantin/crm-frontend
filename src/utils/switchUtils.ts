export const getVariantStyle = (variant: 'regular' | 'small', color: string) => {
    const variantStyle = {
        width: '',
        height: '',
        color: '',
        margin: '',
        sliderPosition: '',
        sliderSize: '',
        translate: ''
    };

    switch (variant) {
        default:
        case 'regular':
            variantStyle.width = '36';
            variantStyle.height = '20';
            variantStyle.margin = '8';
            variantStyle.color = color;
            variantStyle.sliderPosition = '2';
            variantStyle.sliderSize = '16';
            variantStyle.translate = '16';
            break;
        case 'small':
            variantStyle.width = '24';
            variantStyle.height = '12';
            variantStyle.margin = '6';
            variantStyle.color = color;
            variantStyle.sliderPosition = '1';
            variantStyle.sliderSize = '10';
            variantStyle.translate = '12';
            break;
    }
    return variantStyle;
};