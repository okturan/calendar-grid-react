import MONTHS, { type Month } from "./Months";

import { ShareUnit, DateString } from "../App";

interface CalendarProps {
  isHorizontal: boolean;
  shares: ShareUnit;
}

interface CalendarDate {
  day: number;
  month: number;
}

const Calendar = ({ isHorizontal, shares }: CalendarProps) => {
  // Parse date string "DD.MM" to {day, month} object
  const parseDate = (dateStr: DateString): CalendarDate => {
    const [day, month] = dateStr.split(".").map(Number);
    return { day, month: month - 1 }; // Convert to 0-based month index
  };

  // Check if a day belongs to a usage period and return the share ID if it does
  const getUsagePeriod = (day: number, monthIndex: number): string | null => {
    for (const [shareId, periods] of Object.entries(shares)) {
      for (const [start, end] of periods) {
        const startDate = parseDate(start);
        const endDate = parseDate(end);

        if (monthIndex < startDate.month || monthIndex > endDate.month) {
          continue;
        }

        const startDay = monthIndex === startDate.month ? startDate.day : 1;
        const endDay = monthIndex === endDate.month ? endDate.day : MONTHS[monthIndex].days;

        if (day >= startDay && day <= endDay) {
          return shareId;
        }
      }
    }
    return null;
  };

  return (
    <div className={`calendar ${isHorizontal ? "horizontal" : "vertical"}`}>
      {MONTHS.map((month: Month, monthIndex: number) => (
        <div key={month.name} className="month-container">
          <div className="month">{month.name}</div>
          <div className={`days ${month.name}`}>
            {[...Array(month.days)].map((_, i) => {
              const day = i + 1;
              const shareId = getUsagePeriod(day, monthIndex);
              return (
                <div key={day} className={`day ${shareId ? `${shareId}` : "maintenance-pattern"}`}>
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Calendar;
