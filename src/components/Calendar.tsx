import MONTHS, { type Month } from "./Months";
import { ShareUnit, DateString } from "../App";

interface CalendarProps {
  isHorizontal: boolean;
  shares: ShareUnit;
  selectedShares: Set<string>;
}
interface CalendarDate {
  day: number;
  month: number;
}

const Calendar = ({ isHorizontal, shares, selectedShares }: CalendarProps) => {
  // Converts a date string like "DD.MM" into a CalendarDate object
  const parseDate = (dateStr: DateString): CalendarDate => {
    const [day, month] = dateStr.split(".").map(Number);
    return { day, month: month - 1 }; // Convert to 0-based month index
  };

  // Checks if a given day/month belongs to any share's usage period
  // Returns the shareId if found, null otherwise
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

  // Render the calendar grid with all months and their days
  // Apply appropriate styling based on usage periods and selections
  return (
    <div className={`calendar ${isHorizontal ? "horizontal" : "vertical"}`}>
      {MONTHS.map((month: Month, monthIndex: number) => (
        <div key={month.name} className="month-container">
          <div className="month">{month.name}</div>
          <div className={`days ${month.name}`}>
            {[...Array(month.days)].map((_, i) => {
              const day = i + 1;
              const shareId = getUsagePeriod(day, monthIndex);
              const opacity = shareId && selectedShares.size > 0 ? (selectedShares.has(shareId) ? "" : "dimmed") : "";
              return (
                <div key={day} className={`day ${shareId ? `${shareId}` : "maintenance-pattern"} ${opacity}`}>
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
