export const findFraction = (fractions: [number, number]): number => {
  return fractions[0] / (fractions[1] || 1);
};

export const formatOptions = (arr: string[]) => {
  return arr.map((item) => ({
    label: item,
    value: item, // Replaces "Section A" with "A", and first item with "All"
  }));
};

export const getCurrentAge = (dob: string): string => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
    throw new Error("Date of birth must be in YYYY-MM-DD format.");
  }

  const birthDate = new Date(`${dob}T00:00:00Z`);

  if (
    Number.isNaN(birthDate.getTime()) ||
    birthDate.toISOString().slice(0, 10) !== dob
  ) {
    throw new Error("Invalid date of birth.");
  }

  const now = new Date();
  const today = new Date(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()),
  );

  if (birthDate > today) {
    throw new Error("Date of birth cannot be in the future.");
  }

  let years = today.getUTCFullYear() - birthDate.getUTCFullYear();

  const anniversary = new Date(birthDate);
  anniversary.setUTCFullYear(birthDate.getUTCFullYear() + years);

  if (anniversary > today) {
    years--;
    anniversary.setTime(birthDate.getTime());
    anniversary.setUTCFullYear(birthDate.getUTCFullYear() + years);
  }

  let months =
    (today.getUTCFullYear() - anniversary.getUTCFullYear()) * 12 +
    today.getUTCMonth() -
    anniversary.getUTCMonth();

  const addMonths = (date: Date, count: number): Date => {
    const result = new Date(date);
    const day = result.getUTCDate();

    result.setUTCDate(1);
    result.setUTCMonth(result.getUTCMonth() + count + 1);
    result.setUTCDate(0);
    result.setUTCDate(Math.min(day, result.getUTCDate()));

    return result;
  };

  let monthAnniversary = addMonths(anniversary, months);

  if (monthAnniversary > today) {
    months--;
    monthAnniversary = addMonths(anniversary, months);
  }

  const days = Math.floor(
    (today.getTime() - monthAnniversary.getTime()) / (1000 * 60 * 60 * 24),
  );

  return (
    `${years} ${years === 1 ? "year" : "years"} ` +
    `${months} ${months === 1 ? "month" : "months"} ` +
    `${days} ${days === 1 ? "day" : "days"}`
  );
};

export const formatAmount = (value: string) => {
  if (!value) return "";
  const [whole, decimal] = value.split(".");
  const formattedWhole = whole.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");

  return decimal === undefined
    ? formattedWhole
    : `${formattedWhole}.${decimal}`;
};
export const formatCurrency = (amount: number): string => {
  return `₹${amount.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;
};
