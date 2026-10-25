export const findFraction = (fractions: [number, number]): number => {
    return fractions[0] / (fractions[1] || 1);
};