export const setRgbaValue = (rgb, alpha = 1) => {
    const rgbArray = rgb.split(',');

    // filters out non numeric inputs to leave out only number inputs
    const [r, g, b] = rgbArray.map(value =>
        [...value].filter(character => !isNaN(character)).join('')
    );

    const rgbaValue = `rgba(${r},${g},${b},${alpha})`;
    return rgbaValue;
};