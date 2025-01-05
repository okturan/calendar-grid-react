interface Month {
  name: string;
  days: number;
}

const MONTHS: Month[] = [
  { name: "Jan", days: 31 },
  { name: "Feb", days: 28 }, // No leap-year handling
  { name: "Mar", days: 31 },
  { name: "Apr", days: 30 },
  { name: "May", days: 31 },
  { name: "Jun", days: 30 },
  { name: "Jul", days: 31 },
  { name: "Aug", days: 31 },
  { name: "Sep", days: 30 },
  { name: "Oct", days: 31 },
  { name: "Nov", days: 30 },
  { name: "Dec", days: 31 },
];

export type { Month };
export default MONTHS;
