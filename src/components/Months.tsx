interface Month {
  name: string;
  days: number;
}

const MONTHS: Month[] = [
  { name: "January", days: 31 },
  { name: "February", days: 28 }, // No leap-year handling
  { name: "March", days: 31 },
  { name: "April", days: 30 },
  { name: "May", days: 31 },
  { name: "June", days: 30 },
  { name: "July", days: 31 },
  { name: "August", days: 31 },
  { name: "September", days: 30 },
  { name: "October", days: 31 },
  { name: "November", days: 30 },
  { name: "December", days: 31 },
];

export type { Month };
export default MONTHS;
