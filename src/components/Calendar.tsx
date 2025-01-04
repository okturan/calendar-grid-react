import MONTHS, { type Month } from "./Months";

interface UsagePeriod {
  start: string; // format: "DD.MM"
  end: string; // format: "DD.MM"
  share: number; // 1-6 representing which unit share this usage period belongs to
}

interface CalendarProps {
  isHorizontal: boolean;
  usagePeriods: UsagePeriod[];
}

interface ParsedDate {
  day: number;
  month: number;
}

const Calendar = ({ isHorizontal, usagePeriods }: CalendarProps) => {
  // Parse date string "DD.MM" to {day, month} object
  const parseDate = (dateStr: string): ParsedDate => {
    const [day, month] = dateStr.split(".").map(Number);
    return { day, month: month - 1 }; // Convert to 0-based month index
  };

  // Check if a day belongs to a usage period and return the unit share number if it does
  const getUsagePeriod = (day: number, monthIndex: number): number | null => {
    for (const period of usagePeriods) {
      const startDate = parseDate(period.start);
      const endDate = parseDate(period.end);

      if (monthIndex < startDate.month || monthIndex > endDate.month) {
        continue;
      }

      const startDay = monthIndex === startDate.month ? startDate.day : 1;
      const endDay = monthIndex === endDate.month ? endDate.day : MONTHS[monthIndex].days;

      if (day >= startDay && day <= endDay) {
        return period.share;
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
              const unitShare = getUsagePeriod(day, monthIndex);
              return (
                <div key={day} className={`day ${unitShare ? `highlighted share${unitShare}` : ""}`}>
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
