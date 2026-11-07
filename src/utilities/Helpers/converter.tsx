export const findFraction = (fractions: [number, number]): number => {
  return fractions[0] / (fractions[1] || 1);
};

export const formatOptions = (arr: string[]) => {
  return arr.map((item, index) => ({
    label: item,
    value: index === 0 ? "All" : item.replace("Section ", ""), // Replaces "Section A" with "A", and first item with "All"
  }));
};
