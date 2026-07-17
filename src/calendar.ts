import MONTHS from "./components/Months";
import type { DateString, ShareUnit } from "./types";

interface CalendarDate {
  day: number;
  month: number;
}

function parseDate(dateString: DateString): CalendarDate {
  const [day, month] = dateString.split(".").map(Number);
  return { day, month: month - 1 };
}

function dayOfYear({ day, month }: CalendarDate): number {
  return MONTHS.slice(0, month).reduce((total, item) => total + item.days, day);
}

function isWithinPeriod(day: number, month: number, start: DateString, end: DateString): boolean {
  const candidate = dayOfYear({ day, month });
  const startDay = dayOfYear(parseDate(start));
  const endDay = dayOfYear(parseDate(end));

  if (startDay <= endDay) {
    return candidate >= startDay && candidate <= endDay;
  }

  // A later start day means the period wraps across New Year.
  return candidate >= startDay || candidate <= endDay;
}

export function getUsageShare(day: number, month: number, shares: ShareUnit): string | null {
  for (const [shareId, periods] of Object.entries(shares)) {
    if (periods.some(([start, end]) => isWithinPeriod(day, month, start, end))) {
      return shareId;
    }
  }

  return null;
}
