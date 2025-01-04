import MONTHS, { type Month } from "./Months";

interface DateRange {
  start: string; // format: "DD.MM"
  end: string; // format: "DD.MM"
}

interface CalendarProps {
  isHorizontal: boolean;
  highlights: DateRange[];
}

interface ParsedDate {
  day: number;
  month: number;
}

const Calendar = ({ isHorizontal, highlights }: CalendarProps) => {
  // Parse date string "DD.MM" to {day, month} object
  const parseDate = (dateStr: string): ParsedDate => {
    const [day, month] = dateStr.split(".").map(Number);
    return { day, month: month - 1 }; // Convert to 0-based month index
  };

  // Check if a day should be highlighted
  const isHighlighted = (day: number, monthIndex: number): boolean => {
    return highlights.some((highlight) => {
      const startDate = parseDate(highlight.start);
      const endDate = parseDate(highlight.end);

      if (monthIndex < startDate.month || monthIndex > endDate.month) {
        return false;
      }

      const startDay = monthIndex === startDate.month ? startDate.day : 1;
      const endDay = monthIndex === endDate.month ? endDate.day : MONTHS[monthIndex].days;

      return day >= startDay && day <= endDay;
    });
  };

  return (
    <div className={`calendar ${isHorizontal ? "horizontal" : "vertical"}`}>
      {MONTHS.map((month: Month, monthIndex: number) => (
        <div key={month.name} className="month-container">
          <div className="month">{month.name}</div>
          <div className={`days ${month.name}`}>
            {[...Array(month.days)].map((_, i) => {
              const day = i + 1;
              return (
                <div key={day} className={`day ${isHighlighted(day, monthIndex) ? "highlighted" : ""}`}>
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
