/**
 * Rounds the given price to two decimal places.
 * 
 * @param price - The price to be rounded.
 * @returns The rounded price.
 */
export const roundPrice = (price: number): number => {
    return Math.round(price * 100) / 100;
};